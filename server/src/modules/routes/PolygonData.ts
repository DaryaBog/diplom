import { Router } from 'express'
import { GetDataInPolygon } from '../Controllers/dataInPolygon.js'

const PolygoneRouter = Router()

PolygoneRouter.get('/polygon', GetDataInPolygon)

export default PolygoneRouter