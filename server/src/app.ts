import express, { Request, Response } from "express"
import cors from "cors"
import { config } from "dotenv"
import { PrismaClient } from "@prisma/client"

config()

const app = express()
const prisma = new PrismaClient()

app.use(cors({ origin: process.env.CLIENT_URL }))

app.post("/matches", async (req: Request, res: Response) => {
  const match = await prisma.match.create({ data: { size: 9 } })

  res.status(201).json({ id: match.id })
})

export default app
