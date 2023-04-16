export const getQueryCalculate = ({ lengthPath, population, waterFlow, quotient, length, hours, min }) => {
    return `lengthPath=${lengthPath}&population=${population}&waterFlow=${waterFlow}&quotient=${quotient}&length=${length}&hours=${hours}&min=${min}`
}