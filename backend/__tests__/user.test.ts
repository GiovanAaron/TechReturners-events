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

describe("Get Users", () => {
  describe("GET /api/users", () => {
    it("status: 200 responds with an array of all Users", async () => {
      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(response.body.users).toBeInstanceOf(Array);
      expect(response.body.users.length).toBe(userData.length);
      response.body.users.forEach((user : any) => {
        expect(user).toMatchObject({
          username: expect.any(String),
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
  describe("GET /api/users password security", () => {
    it("status: 200 responds with an array of all Users without password", async () => {
      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(response.body.users).toBeInstanceOf(Array);
      expect(response.body.users.length).toBe(userData.length);
      response.body.users.forEach((user : any) => {
        expect(user.password).toBe(undefined);
      });
    });
  });
  describe("GET /api/users/:id", () => {
    it("status: 200 should respond with a single user", async () => {
      const response = await request(app).get("/api/users/2");
      expect(response.status).toBe(200);
      expect(response.body.user).toBeInstanceOf(Object);
      expect(response.body.user).toMatchObject({
        username: expect.any(String),
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
      expect(response.body.user.password).toBe(undefined);
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
      const response = await request(app)
      .post("/api/users")
      .send({
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
      })
      
    });
  })
  
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
        username: "febiBuffay"
      });
      expect(response.status).toBe(201);
      
      const { password_hash } = response.body.newUser;  
      const isMatch = await bcrypt.compare(test_password, password_hash);
      expect(isMatch).toBe(true)
      ;
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
  describe("Should patch user details", () => {
    it("status: 200 should respond with patched user details", async () => {
      const response = await request(app)
        .patch("/api/users/2")
        .send({ first_name: "Dereck" });

      expect(response.status).toBe(200);
      expect(response.body.updatedUser).toMatchObject({
        first_name: "Dereck",
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
    it("Should patch multiple details in one query", async () => {
      const response = await request(app).patch("/api/users/3").send({
        last_name: "Hannah",
        avatar: "new_updated_avatar.png",
      });
      expect(response.status).toBe(200);
      expect(response.body.updatedUser).toMatchObject({
        first_name: expect.any(String),
        last_name: "Hannah",
        email: expect.any(String),
        age: expect.any(Number),
        gender: expect.any(String),
        access_type: expect.any(String),
        avatar: "new_updated_avatar.png",
        created_at: expect.any(String),
        updated_at: expect.any(String),
        id: expect.any(Number),
      });
    });
  });

  describe("PATCH /api/users Error Handling", () => {
    it("status: 500 should respond with an PSQL error message (invalid column name)", async () => {
      const response = await request(app)
        .patch("/api/users/3")
        .send({ last_name: "Anthony", profile_Pic: "new_updated_avatar.png" });
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("PSQL error: 42703");
    });
  });
  describe("PATCH /api/users Error Handling", () => {
    it("status: 500 should respond with an PSQL error message (2 invalid column names)", async () => {
      const response = await request(app)
        .patch("/api/users/5")
        .send({
          middle_name: "Anthony",
          profile_Pic: "new_updated_avatar.png",
        });
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("PSQL error: 42703");
    });
  });
  describe("PATCH /api/users Error Handling", () => {
    it("status: 500 should respond with an PSQL error message (invalid value for column)", async () => {
      const response = await request(app)
        .patch("/api/users/5")
        .send({ first_name: "Boris", access_type: "Godmother" });
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("PSQL error: 23514");
    });
  });
});

describe("DELETE /api/users/:id", () => {
  describe("Should delete user by User ID", () => {
    it("status: 200 should respond with a deleted user", async () => {
      const response = await request(app).delete("/api/users/2");
      expect(response.status).toBe(200);
      expect(response.body.erasedUser).toBeInstanceOf(Object);
      expect(response.body.erasedUser).toMatchObject({
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
    describe("DELETE /api/users/:id Error Handling", () => {
      it("status: 404 should respond with an error message", async () => {
        const response = await request(app).delete("/api/users/100");
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("User not found");
      });
      test("status: 400 should respond with an error message", async () => {
        const response = await request(app).delete("/api/users/a2c");
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Bad Request");
      });
    });
  });
});
