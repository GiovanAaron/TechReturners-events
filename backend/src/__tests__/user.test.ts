import client from "../db/connection";
import app from "../app";
import seed from "../db/seeds/seed";
import request from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  getUserByRole,
  generateToken,
} from "../utils/test_utils";
import {
  attendanceData,
  userData,
  eventsData,
} from "../db/data/test-data/index";
import { JWT } from "google-auth-library";

/*getUserByRole is used to get user information by their role,
in order to find their user_id, as the order in which PSQL seeds users is random*/
// const getUserByRole = (users: any, role: string) => {
//   return users.find((user: any)  => user.access_type === role);
// };

let unorderedUsers: any[] | undefined = []

beforeEach(async () => {
  try {
    const result = await seed(userData, eventsData, attendanceData);
  
    unorderedUsers = result?.seededUsers
   
    // await new Promise(resolve => setTimeout(resolve, 500))
  } catch (error: any) {
    console.error(error);
  }
});

afterAll(async () => {
  await client.end();
});

// Fake JWT secret
const JWT_SECRET = 'your-secret-key';




describe("POST /api/users", () => {
  describe("Should create new user", () => {
    it("status: 201 should respond with new user [returning details]", async () => {
      const response = await request(app).post("/api/users").send({
        username: "febiBuffay",
        first_name: "Febi",
        last_name: "Buffay",
        email: "friends@gmail.com",
        age: 28,
        gender: "Female",
        access_type: "Admin",
        avatar: "febi_avataer.img",
        password: "febiPass123",
      });

      expect(response.status).toBe(201);
      expect(response.body.newUser).toMatchObject({
        first_name: expect.any(String),
        last_name: expect.any(String),
        email: expect.any(String),
        age: expect.any(Number),
        gender: expect.any(String),
        access_type: expect.any(String),
        avatar: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        id: expect.any(Number),
        username: expect.any(String),
        password_hash: expect.any(String),
      });
    });
  });

  describe("POST /api/users password security", () => {
    it("status: 400 should respond with a bcrypt matched password", async () => {
      const test_password = "febiPass123";
      const response = await request(app).post("/api/users").send({
        first_name: "Adams",
        last_name: "amy",
        email: "amy",
        age: 28,
        gender: "Female",
        access_type: "Admin",
        avatar: "febi_avataer.img",
        password: test_password,
        username: "febiBuffay",
      });
      expect(response.status).toBe(201);

      const { password_hash } = response.body.newUser;
      const isMatch = await bcrypt.compare(test_password, password_hash);
      expect(isMatch).toBe(true);
    });
  });

  describe("POST /api/users Error Handling", () => {
    it("status: 400 should respond with an error message (Invalid Gender)", async () => {
      const response = await request(app).post("/api/users").send({
        username: "AmyBuffay",
        first_name: "Adams",
        last_name: "amy",
        email: "amy@gmail.com",
        age: 28,
        gender: "Dog",
        access_type: "Admin",
        avatar: "febi_avataer.img",
        password: "febiPass123",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "PSQL error(23514) found in constraint 'users_gender_check'"
      );
    });
    it("status: 400 should respond with an error message (Invalid Age)", async () => {
      const response = await request(app).post("/api/users").send({
        username: "DerekJohnson",
        first_name: "derek",
        last_name: "Johnson",
        email: "dude@yahoo.com",
        age: "feet",
        gender: "Male",
        access_type: "Admin",
        avatar: "febi_avataer.img",
        password: "febiPass123",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("PSQL error(22P02)");
    });
    it("status: 400 should respond with an error message (Invalid Access Type)", async () => {
      const response = await request(app).post("/api/users").send({
        first_name: "Adams",
        last_name: "amy",
        email: "amy@gmail.com",
        age: 28,
        gender: "Male",
        access_type: "Doctor",
        avatar: "febi_avataer.img",
        password: "febiPass123",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "PSQL error(23502) found in 'username' column"
      );
    });
  });
});



  describe("POST /api/users Error Handling", () => {
    it("status: 400 should respond with an error message (username already exists)", async () => {
      const existingUser = unorderedUsers?.find(
        (user) => user.access_type === "Admin"
      );

      const response = await request(app).post("/api/users").send({
        username: existingUser?.username,
        first_name: "Adams",
        last_name: "amy",
        email: existingUser?.email,
        age: 28,
        gender: "Male",
        access_type: "Admin",
        avatar: "febi_avataer.img",
        password: "febiPass123",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Email is already in use"
      );
    });
  });
