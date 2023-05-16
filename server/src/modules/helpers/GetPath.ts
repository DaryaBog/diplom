// @ts-ignore
import * as turf from "@turf/turf"
import { getNextFarLine } from "./GetLine.js"
import { checkDictanceToFarLine, checkFirstFarLine } from "./checkForPath/CheckForPath.js"
import { getNextPoints } from "./GetNextPoints.js"

export const getPath = (prop: any) => {
    const { polygon, intersections, firstFarLine, startPlace, nextStartPlace, polylinePoints, lines, oldFarLine, oldNearestLine, dataStreets, maxDistance } = prop
    let farLine: number[][] = oldFarLine
    let nearestLine = oldNearestLine
    let isEnd: boolean = false
    let nextPoint: number[]

    const distanceToFarLine: number = checkDictanceToFarLine(farLine, nextStartPlace)
    let newDistanceToFarLine: number = distanceToFarLine

    if (distanceToFarLine <= maxDistance) {
        farLine = getNextFarLine(lines, oldNearestLine, oldFarLine)
        nearestLine = oldFarLine
        newDistanceToFarLine = checkDictanceToFarLine(farLine, nextStartPlace)

        const isFirstFarLine: boolean = checkFirstFarLine(farLine, firstFarLine)
        if (isFirstFarLine) isEnd = true
    }

    if (!farLine.length) {
        console.log("Нет границ!!!!!")
        return
    }

    if (isEnd) {
        nextPoint = startPlace
    } else {
        const nextPoints: number[][] = getNextPoints({
            polylinePoints,
            intersections,
            dataStreets,
            nearestLine,
            nextStartPlace,
            startPlace,
            extremalDistance: maxDistance,
            extremalDistanceToLine: maxDistance,
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
        const newIntersections = intersections.filter((point: number[]) => point[0] !== nextPoint[0] && point[1] !== nextPoint[1])
        getPath({ polygon, intersections: newIntersections, firstFarLine, startPlace, nextStartPlace: nextPoint, polylinePoints, lines, oldFarLine: farLine, oldNearestLine: nearestLine, dataStreets, maxDistance })
    }
    return polylinePoints
}