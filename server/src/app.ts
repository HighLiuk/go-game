import express, { Request, Response } from "express"
import { config } from "dotenv"

config()

const app = express()
const port = process.env.PORT

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
