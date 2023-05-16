// @ts-ignore
import * as turf from "@turf/turf"

export const checkDictanceToFarLine = (farLine: number[][], thisPoint: number[]) => {
    const pt = turf.point(thisPoint)
    return turf.pointToLineDistance(pt, farLine, { units: 'kilometers' })
}

export const checkFirstFarLine = (farLine: number[][], firstFarLine: number[][]) => {
    return (farLine.includes(firstFarLine[0]) && farLine.includes(firstFarLine[1]))
}