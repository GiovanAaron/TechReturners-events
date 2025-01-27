import client from "../db/connection";
import app from "../src/app";
import seed from "../db/seeds/seed";
import request from "supertest";
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

describe("Get Users", () => {
  describe("GET /api/users", () => {
    it("status: 200 responds with an array of all Users", async () => {
      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(response.body.users).toBeInstanceOf(Array);
      expect(response.body.users.length).toBe(userData.length);
      userData.forEach((user) => {
        expect(user).toMatchObject({
          first_name: expect.any(String),
          last_name: expect.any(String),
          email: expect.any(String),
          age: expect.any(Number),
          gender: expect.any(String),
          access_type: expect.any(String),
          avatar: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
        });
      });
    });
  });
  describe("GET /api/users/:id", () => {
    it("status: 200 should respond with a single user", async () => {
      const response = await request(app).get("/api/users/2");
      expect(response.status).toBe(200);
      expect(response.body.user).toBeInstanceOf(Object);
      expect(response.body.user).toMatchObject({
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
      });
    });
    describe("GET /api/users/:id Error Handling", () => {
      it("status: 404 should respond with an error message", async () => {
        const response = await request(app).get("/api/users/100");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("User not found");
      });
      it("status: 400 should respond with an error message", async () => {
        const response = await request(app).get("/api/users/abc");
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Bad Request");
      });
    });
  });
});

describe("POST /api/users", () => {
  describe("Should create new user", () => {
    it("status: 201 should respond with new user [returning details]", async () => {
      const response = await request(app).post("/api/users").send({
        first_name: "Febi",
        last_name: "Buffay",
        email: "friends@gmail.com",
        age: 28,
        gender: "Female",
        access_type: "Admin",
        avatar: "febi_avataer.img",
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
      });
    });
  });

  describe("POST /api/users Error Handling", () => {
    it("status: 400 should respond with an error message (Invalid Gender)", async () => {
      const response = await request(app).post("/api/users").send({
        first_name: "Adams",
        last_name: "amy",
        email: "amy@gmail.com",
        age: 28,
        gender: "Dog",
        access_type: "Admin",
        avatar: "febi_avataer.img",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Bad Request");
    });
    it("status: 400 should respond with an error message (Invalid Age)", async () => {
      const response = await request(app).post("/api/users").send({
        first_name: "derek",
        last_name: "Johnson",
        email: "dude@yahoo.com",
        age: "feet",
        gender: "Male",
        access_type: "Admin",
        avatar: "febi_avataer.img",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Bad Request");
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
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Bad Request");
    });
  });
});
describe("PATCH /api/users ", () => {
  describe("Should patch user details", () => {});
});
