import { Router } from 'express'
import { GetCalculates } from '../Controllers/calculate.js'

const CalculateRouter = Router()

CalculateRouter.get('/calculates', GetCalculates)

export default CalculateRouter