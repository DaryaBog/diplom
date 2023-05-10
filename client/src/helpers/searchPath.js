import * as turf from "@turf/turf"
import { MAX_DICTANCE, MIN_DICTANCE } from "../constants"

export const getLine = (polygon) => {
    const lines = []
    for (let i = 0; i < polygon.length; i++) {
        if (i !== polygon.length - 1) {
            lines.push(turf.lineString([polygon[i], polygon[i + 1]]))
        } else {
            lines.push(turf.lineString([polygon[0], polygon[i]]))
        }
    }
    return lines
}

export const getFarLine = (lines, startPlace) => {
    const pt = turf.point(startPlace)
    const distance = []
    for (let i = 0; i < lines.length; i++) {
        distance.push(turf.pointToLineDistance(pt, lines[i], { units: 'kilometers' }))
    }
    if (Math.max(...distance) < MAX_DICTANCE) {
        console.log('Границы расположены слишком близко!')
        return
    }
    const indexFarLine = distance.indexOf(Math.max(...distance))
    const farLine = lines[indexFarLine]
    return farLine.geometry.coordinates
}

const getNextFarLine = (lines, nearestLine, farLine) => {
    console.log('lines', lines, 'farLine', farLine)
    const index = lines.findIndex((line) => ((line.geometry.coordinates.includes(farLine[0]) && !line.geometry.coordinates.includes(farLine[1]))
        || (!line.geometry.coordinates.includes(farLine[0]) && line.geometry.coordinates.includes(farLine[1])))
        && (!line.geometry.coordinates.includes(nearestLine[0]) && !line.geometry.coordinates.includes(nearestLine[1])))
    console.log('lines.indexOf(farLine)', index)
    return lines[index].geometry.coordinates
}

const lineFilter = ({ lines, farLine }) => {
    return lines.filter(line => (line.geometry.coordinates.includes(farLine[0]) && !line.geometry.coordinates.includes(farLine[1]))
        || (!line.geometry.coordinates.includes(farLine[0]) && line.geometry.coordinates.includes(farLine[1])))
}

export const getNearestLine = (lines, startPlace, farLine) => {
    const pt = turf.point(startPlace)
    const distance = []

    const someLines = lineFilter({ lines, farLine })

    for (let i = 0; i < someLines.length; i++) {
        distance.push(turf.pointToLineDistance(pt, someLines[i], { units: 'kilometers' }))
    }

    const indexNearestLine = distance.indexOf(Math.min(...distance))
    const nearestLine = someLines[indexNearestLine]
    return nearestLine.geometry.coordinates
}

const checkDictanceToFarLine = (farLine, thisPoint) => {
    const pt = turf.point(thisPoint)
    return turf.pointToLineDistance(pt, farLine, { units: 'kilometers' })
}

const getNearestPointsToStartPoint = ({ intersections, dataStreets, nextStartPlace, startPlace, extremalDistance }) => {
    const nearestPoints = intersections.filter(point => {
        let streetsOfThisPoint = []
        let streetsOfNextPoint = []
        const from = turf.point(nextStartPlace)
        const to = turf.point(point)
        const options = { units: 'kilometers' }
        const distanceToPoint = turf.distance(from, to, options);
        let isPath = false
        const hasStartPoint = (nextStartPlace[0] === startPlace[0] && nextStartPlace[1] === startPlace[1]) || (point[0] === startPlace[0] && point[1] === startPlace[1])

        streetsOfThisPoint = dataStreets.filter(street => street.geometry.coordinates.find(anyPoint => anyPoint.includes(nextStartPlace[0]) && anyPoint.includes(nextStartPlace[1])))
        streetsOfNextPoint = dataStreets.filter(street => street.geometry.coordinates.find(anyPoint => anyPoint.includes(point[0]) && anyPoint.includes(point[1])))

        for (let i = 0; i < streetsOfThisPoint.length; i++) {
            for (let j = 0; j < streetsOfNextPoint.length; j++) {
                isPath = streetsOfThisPoint[i].properties.name === streetsOfNextPoint[j].properties.name
                if (isPath) break
            }
            if (isPath) break
        }

        return (isPath || hasStartPoint) && (distanceToPoint < extremalDistance)
    })

    return nearestPoints
}

const getNearestPointsToNearestLine = ({ intersections, nearestLine, extremalDistanceToLine }) => {
    const nearestPoints = intersections.filter(point => {
        const pt = turf.point(point)
        const options = { units: 'kilometers' }
        const distanceToLine = turf.pointToLineDistance(pt, nearestLine, options);

        return distanceToLine < extremalDistanceToLine
    })

    return nearestPoints
}

const getNextPoints = (prop) => {
    if (prop.extremalDistanceToLine > 1) {
        console.log('Путь зашел в тупик, переместите стартовую точку!')
        return []
    }
    const nearestPointsToStartPoint = getNearestPointsToStartPoint(prop)
    const nearestPointsToNearestLine = getNearestPointsToNearestLine(prop)

    const generalsPoints = nearestPointsToNearestLine.filter(point => nearestPointsToStartPoint.includes(point))
    const nextPoints = generalsPoints.filter(point => !point.includes(prop.startPlace[0]) && !point.includes(prop.startPlace[1]))

    // if (!nextPoints.length) {
    //     const newExtremalDistance = prop.extremalDistanceToLine + 0.1
    //     return getNextPoints({ ...prop, extremalDistanceToLine: newExtremalDistance })
    // }
    return nextPoints
}

export const getPath = (polygon, intersections, startPlace, nextStartPlace, polylinePoints, lines, oldFarLine, oldNearestLine, dataStreets) => {
    let farLine = oldFarLine
    let nearestLine = oldNearestLine

    const distanceToFarLine = checkDictanceToFarLine(farLine, nextStartPlace)
    console.log('distanceToFarLine', distanceToFarLine)

    if (distanceToFarLine <= MAX_DICTANCE) {
        farLine = getNextFarLine(lines, oldNearestLine, oldFarLine)
        nearestLine = oldFarLine
    }

    if (!farLine.length) {
        console.log("Нет границ!!!!!")
        return
    }

    const nextPoints = getNextPoints({
        intersections,
        dataStreets,
        nearestLine,
        nextStartPlace,
        startPlace,
        extremalDistance: MAX_DICTANCE + 0.1,
        extremalDistanceToLine: MAX_DICTANCE
    })

    if (!nextPoints.length) return polylinePoints

    const distanceToNextPoints = nextPoints.map(point => {
        const pt = turf.point(point)
        const options = { units: 'kilometers' }
        const distanceToFarLine = turf.pointToLineDistance(pt, farLine, options);
        return distanceToFarLine
    })

    const indexMaxNextPoint = distanceToNextPoints.indexOf(Math.min(...distanceToNextPoints))
    const nextNextPoint = nextPoints[indexMaxNextPoint]
    console.log('nextNextPoint && startPlace', nextNextPoint, startPlace)
    let nextPoint
    if (nextPoints.includes(startPlace) && polylinePoints.length > 10) {
        nextPoint = startPlace
    } else {
        nextPoint = nextNextPoint
    }
    polylinePoints.push(nextPoint)

    if (!nextPoint.includes(startPlace[0]) && !nextPoint.includes(startPlace[1])) {
        console.log('build')
        const newIntersections = intersections.filter(point => point[0] !== nextPoint[0] && point[1] !== nextPoint[1])
        getPath(polygon, newIntersections, startPlace, nextPoint, polylinePoints, lines, farLine, nearestLine, dataStreets)
    }
    console.log('done', polylinePoints)
    return polylinePoints
}