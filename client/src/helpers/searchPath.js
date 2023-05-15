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
    const index = lines.findIndex((line) => ((line.geometry.coordinates.includes(farLine[0]) && !line.geometry.coordinates.includes(farLine[1]))
        || (!line.geometry.coordinates.includes(farLine[0]) && line.geometry.coordinates.includes(farLine[1])))
        && (!line.geometry.coordinates.includes(nearestLine[0]) && !line.geometry.coordinates.includes(nearestLine[1])))
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
        if (distanceToPoint < extremalDistance) {
            streetsOfThisPoint = dataStreets.filter(street => street.geometry.coordinates.find(anyPoint => anyPoint.includes(nextStartPlace[0]) && anyPoint.includes(nextStartPlace[1])))
            streetsOfNextPoint = dataStreets.filter(street => street.geometry.coordinates.find(anyPoint => anyPoint.includes(point[0]) && anyPoint.includes(point[1])))

            for (let i = 0; i < streetsOfThisPoint.length; i++) {
                for (let j = 0; j < streetsOfNextPoint.length; j++) {
                    isPath = streetsOfThisPoint[i].properties.name === streetsOfNextPoint[j].properties.name
                    if (isPath) break
                }
                if (isPath) break
            }
            return isPath
        }
        return false
    })

    return nearestPoints
}

const getNearestPointsToNearestLine = ({ intersections, nearestLine, extremalDistanceToLine }) => {
    const nearestPoints = intersections.filter(point => {
        const pt = turf.point(point)
        const options = { units: 'kilometers' }
        const distanceToLine = turf.pointToLineDistance(pt, nearestLine, options);

        return distanceToLine < extremalDistanceToLine && distanceToLine > MIN_DICTANCE
    })

    return nearestPoints
}

const getValidPoints = ({ inputPoints, polylinePoints, thisPoint, farLine, lastDistance }) => {
    const nearestToFarLinePoints = inputPoints.filter(point => {
        return checkDictanceToFarLine(farLine, point) < lastDistance + 0.05
    })
    const newPoints = nearestToFarLinePoints.filter(point => {
        const line1 = turf.lineString([thisPoint, point])
        let intersectCount = 0
        for (let i = 0; i < polylinePoints.length; i++) {
            const line2 = i + 1 === polylinePoints.length ? turf.lineString([polylinePoints[i], polylinePoints[0]]) : turf.lineString([polylinePoints[i], polylinePoints[i + 1]])
            const intersects = turf.booleanIntersects(line1, line2)
            const isLastLine = i + 1 === polylinePoints.length
                ? (polylinePoints[i].includes(thisPoint[0])
                    && polylinePoints[i].includes(thisPoint[1]))
                || (polylinePoints[0].includes(thisPoint[0])
                    && polylinePoints[0].includes(thisPoint[1]))
                : (polylinePoints[i].includes(thisPoint[0])
                    && polylinePoints[i].includes(thisPoint[1]))
                || (polylinePoints[i + 1].includes(thisPoint[0])
                    && polylinePoints[i + 1].includes(thisPoint[1]))

            if (intersects && !isLastLine) intersectCount++
        }
        return !intersectCount
    })
    return newPoints
}

const checkFirstFarLine = (farLine, firstFarLine) => {
    return (farLine.includes(firstFarLine[0]) && farLine.includes(firstFarLine[1]))
}

const getNextPoints = (prop) => {
    if (prop.extremalDistance > 1) {
        console.log('Путь зашел в тупик, переместите стартовую точку!')
        return []
    }
    const nearestPointsToStartPoint = getNearestPointsToStartPoint(prop)
    const nearestPointsToNearestLine = getNearestPointsToNearestLine(prop)

    let nextPointsWithoutIntersections = []

    const generalsPoints = nearestPointsToStartPoint.filter(point => nearestPointsToNearestLine.includes(point))
    const nextPoints = prop.polylinePoints.length > 8 ? generalsPoints : generalsPoints.filter(point => !point.includes(prop.startPlace[0]) && !point.includes(prop.startPlace[1]))
    // проверка на пересечение уже существующих линий
    if (prop.polylinePoints.length) {
        nextPointsWithoutIntersections = getValidPoints({
            inputPoints: nextPoints, thisPoint: prop.nextStartPlace, ...prop
        })
    }

    if (!nextPointsWithoutIntersections.length || !nextPoints.length) {
        const newExtremalDistance = prop.extremalDistance + 0.05
        return getNextPoints({ ...prop, extremalDistance: newExtremalDistance })
    }
    return nextPointsWithoutIntersections || nextPoints
}

export const getPath = (polygon, intersections, firstFarLine, startPlace, nextStartPlace, polylinePoints, lines, oldFarLine, oldNearestLine, dataStreets) => {
    let farLine = oldFarLine
    let nearestLine = oldNearestLine
    let isEnd = false
    let nextPoint

    const distanceToFarLine = checkDictanceToFarLine(farLine, nextStartPlace)
    let newDistanceToFarLine = distanceToFarLine

    if (distanceToFarLine <= MAX_DICTANCE) {
        farLine = getNextFarLine(lines, oldNearestLine, oldFarLine)
        nearestLine = oldFarLine
        newDistanceToFarLine = checkDictanceToFarLine(farLine, nextStartPlace)

        const isFirstFarLine = checkFirstFarLine(farLine, firstFarLine)
        if (isFirstFarLine) isEnd = true
    }

    if (!farLine.length) {
        console.log("Нет границ!!!!!")
        return
    }

    if (isEnd) {
        nextPoint = startPlace
    } else {
        const nextPoints = getNextPoints({
            polylinePoints,
            intersections,
            dataStreets,
            nearestLine,
            nextStartPlace,
            startPlace,
            extremalDistance: MAX_DICTANCE,
            extremalDistanceToLine: MAX_DICTANCE,
            farLine,
            lastDistance: newDistanceToFarLine,
        })

        if (!nextPoints.length) {
            return polylinePoints
        }

        const distanceToNextPoints = nextPoints.map(point => {
            const pt = turf.point(point)
            const options = { units: 'kilometers' }
            const distanceToFarLine = turf.pointToLineDistance(pt, farLine, options);
            return distanceToFarLine
        })

        const indexMaxNextPoint = distanceToNextPoints.indexOf(Math.min(...distanceToNextPoints))
        nextPoint = nextPoints[indexMaxNextPoint]
    }

    polylinePoints.push(nextPoint)

    if (!nextPoint.includes(startPlace[0]) && !nextPoint.includes(startPlace[1])) {
        const newIntersections = intersections.filter(point => point[0] !== nextPoint[0] && point[1] !== nextPoint[1])
        getPath(polygon, newIntersections, firstFarLine, startPlace, nextPoint, polylinePoints, lines, farLine, nearestLine, dataStreets)
    }
    return polylinePoints
}