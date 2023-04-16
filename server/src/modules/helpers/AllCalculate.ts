const AllCalculate = (requestQuery: any) => {
    const SPEED_OF_WATER_MOVEMENT: number = 0.8
    const D_0: number = 0.23
    const FOR_REYNOLDS: number = 1000000
    const TWO_ACCELERATION_OF_GRAVITY: number = 19.62

    const { lengthPath, population, waterFlow, quotient, length, hours, min } = requestQuery

    //for diametr
    const pipeSection: number = (waterFlow * Math.pow(10, -4)) / SPEED_OF_WATER_MOVEMENT
    const diametr: number = Math.ceil(Math.sqrt(((pipeSection * 4) / Math.PI)) * 1000) + 1

    //for depth
    const depth: number = Number((diametr * Math.pow(10, -3) + 0.3 + D_0 * Math.sqrt(quotient)).toFixed(2))

    //-------------------------------
    const volumeInOneMetre: number = Math.PI * Math.pow(diametr * Math.pow(10, -3) / 2, 2)
    const volumeInPipe: number = Number((lengthPath * volumeInOneMetre).toFixed(1))

    //for pressue
    const Reynolds: number = FOR_REYNOLDS * (diametr + 1.4) * Math.pow(10, -3) * SPEED_OF_WATER_MOVEMENT
    const resistanceCoefficient: number = Number((0.316 / Math.pow(Reynolds, 0.25)).toFixed(3))
    const lossOnViscousFriction: number = Math.round(resistanceCoefficient * (lengthPath / (diametr * Math.pow(10, -3))) * (Math.pow(SPEED_OF_WATER_MOVEMENT, 2) / TWO_ACCELERATION_OF_GRAVITY))

    const numberOfJoints: number = lengthPath / length
    const lossOnWeldedJoints: number = 0.1 * (Math.pow(SPEED_OF_WATER_MOVEMENT, 2) / TWO_ACCELERATION_OF_GRAVITY) * numberOfJoints

    const totalLosses: number = (lossOnViscousFriction + lossOnWeldedJoints) * 1.05
    const pressure: number = Number((totalLosses + 10).toFixed(2))

    //for expense
    const expense: number = Math.round((waterFlow * Math.pow(10, -4)) * 3600)

    //for volumeTank
    const volumeTank: number = (population * 5 * 0.001) + Number(volumeInPipe)

    //for powerOOU
    const powerOOU: number = (population * 5 * 0.001) / hours

    //for fluidVolume //WHAY?
    const volumeFluid17: number = volumeTank / 2
    const fluidVolume: number = Number((volumeFluid17 + volumeTank).toFixed(0))

    //for maximumFlow
    const maximumFlow: number = (population * 5 * 0.001) / hours

    //for compressorPower
    const powerCompressor: number = Number((volumeInPipe / (min)).toFixed(2))

    return { diametr, depth, pressure, expense, volumeTank, powerOOU, fluidVolume, maximumFlow, powerCompressor }
}

export default AllCalculate