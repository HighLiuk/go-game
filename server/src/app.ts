import express, { Request, Response } from "express"
import cors from "cors"
import { config } from "dotenv"

config()

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL }))

app.get("/", (req: Request, res: Response) => {
  const matchId = "1"

  res.json({ matchId })
})

export default app
