import { AllCalculate } from "../helpers/index.js"

const GetCalculates = async (req: any, res: any) => {
    try {
        const data = AllCalculate(req.query)
        res.status(200).json(data)
    } catch (error) {
        res.json({ message: `Error ${error}` })
    }
}

export { GetCalculates }