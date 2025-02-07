import client from "../db/connection";
import app from "../app";
import seed from "../db/seeds/seed";
import request from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  attendanceData,
  userData,
  eventsData,
} from "../db/data/test-data/index";
import { findUserByEmail } from "../utils/test_utils";


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
let unorderedUsers: any[] | undefined = [];

beforeEach(async () => {
  try {
    const result = await seed(userData, eventsData, attendanceData);

    unorderedUsers = result?.seededUsers;
    
  } catch (error: any) {
    console.error(error);
  }
});

afterAll(async () => {
  await client.end();
});

describe("POST /api/users/login", () => {
  describe("POST /api/users/login", () => {
    it("status: 200 should respond with a token", async () => {

      console.log("unorderedUsers: ", unorderedUsers)

      const response = await request(app).post("/api/users/login").send({
        email: "isaac.hernandez@example.com",
        password: "isaacSecure",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body.token).toBeDefined();
    });
    describe("POST /api/login error handling", () => {
      test("status: 401, wrong password", async () => {
        const response = await request(app).post("/api/users/login").send({
          email: "isaac.hernandez@example.com",
          password: "wrongPassword",
        });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("Invalid password");
      });
    });
    describe("POST /api/login error handling", () => {
      test("status: 404, wrong email", async () => {
        const response = await request(app)
          .post("/api/users/login")
          .send({ email: "wrongemail@example.com", password: "wrongPassword" });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe("User not found");
      });
    });
    describe("POST /api/login error handling", () => {
      test("status: 400 should respond with an error when email or password is missing", async () => {
        const response = await request(app).post("/api/users/login").send({
          email: "julia.martinez@example.com",
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Email and password are required");
      });
    });
  });

  describe.only("POST /api/login JWT Session Verification", () => {

    test("should return a valid JWT for valid credentials", async () => {
      
   
      const userId = findUserByEmail(unorderedUsers, "julia.martinez@example.com").id


      const response = await request(app)
        .post("/api/users/login")
        .send({ email: "julia.martinez@example.com", password: "juliaPW456" });

      expect(response.status).toBe(200);
      const decoded = jwt.verify(response.body.token, JWT_SECRET);
      expect(decoded).toMatchObject({
        user_id: expect.any(Number),
        exp: expect.any(Number),
        iat: expect.any(Number),

      });
      const decodedObj = decoded as { user_id: number };
      console.log("deconded obj: ", decodedObj)
      expect(decodedObj.user_id).toBe(userId);


      // expect(decoded).toEqual(generateToken(decoded.id, JWT_SECRET));
    });
  });
});
