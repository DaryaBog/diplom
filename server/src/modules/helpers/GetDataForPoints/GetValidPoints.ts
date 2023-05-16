// @ts-ignore
import * as turf from "@turf/turf"
import { checkDictanceToFarLine } from "../checkForPath/CheckForPath.js"

export const getValidPoints = (prop: any) => {
    const { inputPoints, polylinePoints, thisPoint, farLine, lastDistance } = prop
    const nearestToFarLinePoints = inputPoints.filter((point: number[]) => {
        return checkDictanceToFarLine(farLine, point) < lastDistance + 0.05
    })
    const newPoints: number[][] = nearestToFarLinePoints.filter((point: number[]) => {
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