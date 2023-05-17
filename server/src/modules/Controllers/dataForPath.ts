import { getStartData } from "../helpers/index.js"

const GetDataForStartDrow = async (req: any, res: any) => {
    try {
        const data = getStartData(req.body)
        res.status(200).json(data)
    } catch (error) {
        res.json({ message: `Error ${error}` })
    }
}

export { GetDataForStartDrow }