import request from "supertest"
import app from "./app"

describe("Routes", () => {
  const client = request(app)

  describe("POST /matches", () => {
    it("should create a new match", async () => {
      const res = await client.get("/").send()

      expect(res.statusCode).toEqual(200)
    })
  })
})
