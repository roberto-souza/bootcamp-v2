import express from 'express'
import cors from 'cors'

import { helloWorld } from './routes'
 
const app = express()

app.use(cors())

app.get('/', helloWorld)

app.listen(3333)