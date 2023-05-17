// @ts-ignore
import * as turf from "@turf/turf"

export const getNearestPointsToStartPoint = (prop: any) => {
    const { intersections, dataStreets, nextStartPlace, startPlace, extremalDistance } = prop
    const nearestPoints = intersections.filter((point: number[]) => {
        let streetsOfThisPoint = []
        let streetsOfNextPoint = []
        const from = turf.point(nextStartPlace)
        const to = turf.point(point)
        const options = { units: 'kilometers' }
        const distanceToPoint = turf.distance(from, to, options);
        let isPath = false
        if (distanceToPoint < extremalDistance) {
            streetsOfThisPoint = dataStreets.filter((street: any) => street.geometry.coordinates.find((anyPoint: number[]) => anyPoint.includes(nextStartPlace[0]) && anyPoint.includes(nextStartPlace[1])))
            streetsOfNextPoint = dataStreets.filter((street: any) => street.geometry.coordinates.find((anyPoint: number[]) => anyPoint.includes(point[0]) && anyPoint.includes(point[1])))

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

export const getNearestPointsToNearestLine = (prop: any) => {
    const { intersections, nearestLine, extremalDistanceToLine, minDistance } = prop
    const nearestPoints = intersections.filter((point: number[]) => {
        const pt = turf.point(point)
        const options = { units: 'kilometers' }
        const distanceToLine = turf.pointToLineDistance(pt, nearestLine, options);

        return distanceToLine < extremalDistanceToLine && distanceToLine > minDistance
    })

    return nearestPoints
}