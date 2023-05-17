import { Router } from 'express'
import { GetDataForStartDrow } from '../Controllers/dataForPath.js'

const StartRouter = Router()

StartRouter.post('/polygon', GetDataForStartDrow)

export default StartRouter