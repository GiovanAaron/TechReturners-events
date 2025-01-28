import client from "../db/connection";
import app from "../src/app";
import seed from "../db/seeds/seed";
import request from "supertest";
import bcrypt from "bcrypt";
import {
    attendanceData,
    userData,
    eventsData,
  } from "../db/data/test-data/index";

beforeEach(async () => {
    try {
      await seed(userData, eventsData, attendanceData);
    } catch (error: any) {
      console.error(error);
    }
  });
  
  afterAll(async () => {
    await client.end();
  });



  describe("POST /api/login", () => {
    it("status: 200 should respond with a token", async () => {
        // const password = await bcrypt.hash("isaacSecure", 10);


      const response = await request(app)
        .post("/api/users/login")
        .send({ email: "isaac.hernandez@example.com", password: "{isaacSecure}" });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      
    });
  });