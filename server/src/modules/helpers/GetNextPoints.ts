import { getNearestPointsToNearestLine, getNearestPointsToStartPoint } from "./GetDataForPoints/GetNearestPoints.js"
import { getValidPoints } from "./GetDataForPoints/GetValidPoints.js"

export const getNextPoints = (prop: any) => {
    if (prop.extremalDistance > 1) {
        return []
    }
    const nearestPointsToStartPoint = getNearestPointsToStartPoint(prop)
    const nearestPointsToNearestLine = getNearestPointsToNearestLine(prop)

    let nextPointsWithoutIntersections: number[][] = []

    const generalsPoints = nearestPointsToStartPoint.filter((point: number[]) => nearestPointsToNearestLine.includes(point))
    const nextPoints: number[][] = prop.polylinePoints.length > 8 ? generalsPoints : generalsPoints.filter((point: number[]) => !point.includes(prop.startPlace[0]) && !point.includes(prop.startPlace[1]))
    // проверка на пересечение уже существующих линий
    if (prop.polylinePoints.length) {
        nextPointsWithoutIntersections = getValidPoints({
            inputPoints: nextPoints, thisPoint: prop.nextStartPlace, ...prop
        })
    }

    if (!nextPointsWithoutIntersections.length || !nextPoints.length) {
        const newExtremalDistance = prop.extremalDistance + 0.05
        const points: number[][] = getNextPoints({ ...prop, extremalDistance: newExtremalDistance })
        return points
    }

    const chusenNextPoints: number[][] = nextPointsWithoutIntersections || nextPoints
    return chusenNextPoints
}