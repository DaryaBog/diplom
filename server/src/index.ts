import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import bodyParser from 'body-parser'
import CalculateRouter from './modules/routes/Calculate.js'
import StartRouter from './modules/routes/StartData.js'

const app = express()
const PORT = process.env.PORT || 8081

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(CalculateRouter)
app.use(StartRouter)

async function startServer() {
    try {
        app.listen(PORT, () => {
            console.log('Server started on PORT: ', PORT)
        })
    } catch (error) {
        return console.log(`Server have some errors: ${error}`)
    }
}

startServer()

export default app
