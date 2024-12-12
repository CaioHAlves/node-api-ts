import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '../swagger/swagger.json'

import UserRoutes from './routes/UserRoutes'

const whitelist: Array<string | undefined> = []
const port = Number(process.env.PORT!)

const app = express()

app.use(express.json())
app.use(cors({
  origin: process.env.AMBIENT !== "production" ? "*" : (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  credentials: true
}))

app.use("/users", UserRoutes)

// Block swagger in production 
if (process.env.AMBIENT !== "production") {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
}

app.listen(port, "0.0.0.0", () => {
  console.log(`Server started on port ${port}`);
});