import { AllCalculate } from "../helpers/index.js"

import { OverpassQuery } from 'overpass.js'

const GetDataInPolygon = async (req, res) => {
    try {
        const data = new OverpassQuery()
            .setFormat('json')
        res.status(200).json(data)
    } catch (error) {
        res.json({ message: `Error ${error}` })
    }
}

export { GetDataInPolygon }