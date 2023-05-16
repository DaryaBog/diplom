// @ts-ignore
import * as turf from "@turf/turf"

export const getLine = (polygon: any) => {
    const lines: number[][] = []
    for (let i = 0; i < polygon.length; i++) {
        if (i !== polygon.length - 1) {
            lines.push(turf.lineString([polygon[i], polygon[i + 1]]))
        } else {
            lines.push(turf.lineString([polygon[0], polygon[i]]))
        }
    }
    return lines
}

export const getFarLine = (lines: number[][], startPlace: number[][], maxDistance: number) => {
    const pt: any = turf.point(startPlace)
    const distance: number[] = []
    for (let i = 0; i < lines.length; i++) {
        distance.push(turf.pointToLineDistance(pt, lines[i], { units: 'kilometers' }))
    }
    if (Math.max(...distance) < maxDistance) {
        return
    }
    const indexFarLine = distance.indexOf(Math.max(...distance))
    const farLine: any = lines[indexFarLine]
    return farLine.geometry.coordinates
}

export const getNearestLine = (lines: any[][], farLine: number[][], nearestLine: number[][]) => {
    const index: any = lines.findIndex((line: any) => ((line.geometry.coordinates.includes(farLine[0]) && !line.geometry.coordinates.includes(farLine[1]))
        || (!line.geometry.coordinates.includes(farLine[0]) && line.geometry.coordinates.includes(farLine[1])))
        && (!line.geometry.coordinates.includes(nearestLine[0]) && !line.geometry.coordinates.includes(nearestLine[1])))
    const newNerestLine: any = lines[index]
    return newNerestLine.geometry.coordinates
}

export const getNextFarLine = (lines: any[][], nearestLine: number[][], farLine: number[][]) => {
    const index: any = lines.findIndex((line: any) => ((line.geometry.coordinates.includes(farLine[0]) && !line.geometry.coordinates.includes(farLine[1]))
        || (!line.geometry.coordinates.includes(farLine[0]) && line.geometry.coordinates.includes(farLine[1])))
        && (!line.geometry.coordinates.includes(nearestLine[0]) && !line.geometry.coordinates.includes(nearestLine[1])))
    const nextFarLine: any = lines[index]
    return nextFarLine.geometry.coordinates
}
