import { AllCalculate } from "../helpers/index.js"

const GetDataInPolygon = async (req, res) => {
    try {
        res.status(200).json(data)
    } catch (error) {
        res.json({ message: `Error ${error}` })
    }
}

export { GetDataInPolygon }