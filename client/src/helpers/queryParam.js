export const getQueryCalculate = ({ lengthPath, population, waterFlow, quotient, length, hours, min }) => {
    return `lengthPath=${lengthPath}&population=${population}&waterFlow=${waterFlow}&quotient=${quotient}&length=${length}&hours=${hours}&min=${min}`
}

export const getQueryPath = ({ polygon, startPlace, nextStartPlace, polylinePoints, dataStreets, maxDistance, minDistance }) => {
    return `polygon=${polygon}&startPlace=${startPlace}&maxDistance=${maxDistance}&minDistance=${minDistance}&startPlace=${startPlace}&nextStartPlace=${nextStartPlace}&polylinePoints=${polylinePoints}&dataStreets=${dataStreets}`
}