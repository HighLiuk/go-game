import { PrismaClient } from "@prisma/client"
import request from "supertest"
import app from "./app"

const prisma = new PrismaClient()

describe("Routes", () => {
  const client = request(app)

  describe("POST /matches", () => {
    it("should create a new match", async () => {
      const res = await client.post("/matches")
      const { id } = res.body as { id: string }

      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty("id")
      expect(id).toHaveLength(36)

      const match = await prisma.match.findFirst({ where: { id } })

      expect(match).not.toBeNull()
      expect(match?.id).toBe(id)
    })
  })
})
