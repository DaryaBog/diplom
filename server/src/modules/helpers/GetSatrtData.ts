import { getFarLine, getLine, getNearestLine } from "./GetLine.js"
import { getPath } from "./GetPath.js"

const getStartData = (requestQuery: any) => {
    const { polygon, startPlace, maxDistance, intersections, polylinePoints, nextStartPlace, dataStreets } = requestQuery
    const lines: any[] = getLine(polygon)

    const farLine: number[][] = getFarLine(lines, startPlace, maxDistance)
    const nearestLine: number[][] = getNearestLine(lines, startPlace, farLine)
    const line = getPath({ polygon, intersections, firstFarLine: farLine, startPlace, nextStartPlace, polylinePoints, lines, oldFarLine: farLine, oldNearestLine: nearestLine, dataStreets, maxDistance })

    return line
}

export default getStartData