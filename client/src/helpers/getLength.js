import * as turf from "@turf/turf"

export const getLineLength = (line) => {
    const geoLine = turf.lineString(line)
    const length = turf.length(geoLine)
    return length
}