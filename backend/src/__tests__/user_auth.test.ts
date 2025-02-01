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


let unorderedUsers: any[] | undefined = []

beforeEach(async () => {
  try {
    const result = await seed(userData, eventsData, attendanceData);
  
    unorderedUsers = result
   
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



describe("Get Users", () => {
  describe("GET /api/users", () => {
    it("status: 200 responds with an array of all Users", async () => {
      
     
      const admin = getUserByRole(unorderedUsers,'Admin');

      const token = generateToken(admin.id, JWT_SECRET);
      const response = await request(app)
      .get("/api/users")
      .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200);
      expect(response.body.users).toBeInstanceOf(Array);
      expect(response.body.users.length).toBe(userData.length);
      response.body.users.forEach((user: any) => {
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
      const admin = getUserByRole(unorderedUsers,'Admin');

      const token = generateToken(admin.id, JWT_SECRET);

      const response = await request(app)
      .get("/api/users")
      .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200);
      expect(response.body.users).toBeInstanceOf(Array);
      expect(response.body.users.length).toBe(userData.length);
      response.body.users.forEach((user: any) => {
        expect(user.password).toBe(undefined);
      });
    });
  });

  describe("GET /api/users Error Handling", () => {
    it("status: 401 should respond with an error message (No Token)", async () => {
      const response = await request(app).get("/api/users");
      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Token missing");
    });
  })
});
describe("GET /api/users/:id", () => {



  test("status: 200 basic user can access own page", async () => {
    const basicUser = getUserByRole(unorderedUsers,'User');

    const response = await request(app)
    .get(`/api/users/${basicUser.id}`)
    .set('Authorization', `Bearer ${generateToken(basicUser.id, JWT_SECRET)}`)
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
  test("status: 200 Admin can access any page", async () => {
    const basicUser = getUserByRole(unorderedUsers,'User');
    const admin = getUserByRole(unorderedUsers,'Admin');
    
    const response = await request(app)
    .get(`/api/users/${basicUser.id}`)
    .set('Authorization', `Bearer ${generateToken(admin.id, JWT_SECRET)}`)
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
        const admin = getUserByRole(unorderedUsers,'Admin');
      const response = await request(app)
      .get("/api/users/100")
      .set('Authorization', `Bearer ${generateToken(admin.id, JWT_SECRET)}`)
      
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("User not found");
    });
    it("status: 400 should respond with an error message", async () => {
        const admin = getUserByRole(unorderedUsers,'Admin');
      const response = await request(app)
      .get("/api/users/abc")
      .set('Authorization', `Bearer ${generateToken(admin.id, JWT_SECRET)}`)
      expect(response.status).toBe(400);
      
      expect(response.body.error).toBe("Bad Request");
    });
  });
});


describe("PATCH /api/users ", () => {
  describe("Should patch user details", () => {
    test("User can only patch their own details|| status: 200 should respond with patched user details", async () => {
        const user = getUserByRole(unorderedUsers,'User');
        const admin = getUserByRole(unorderedUsers,'Admin');
      const response = await request(app)
        .patch(`/api/users/${user.id}`)
        .send({ first_name: "Dereck" })
        .set('Authorization', `Bearer ${generateToken(user.id, JWT_SECRET)}`)
      expect(response.status).toBe(200);
      expect(response.body.updatedUser).toMatchObject({
        username: expect.any(String),
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
    test("Should patch multiple details in one query", async () => {
        const user = getUserByRole(unorderedUsers,'User');
        const admin = getUserByRole(unorderedUsers,'Admin');

      const response = await request(app)
      .patch(`/api/users/${user.id}`)
      .send({
        last_name: "Hannah",
        avatar: "new_updated_avatar.png",
      })
      .set('Authorization', `Bearer ${generateToken(user.id, JWT_SECRET)}`)
      expect(response.status).toBe(200);
      expect(response.body.updatedUser).toMatchObject({
        username: expect.any(String),
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
        const user = getUserByRole(unorderedUsers,'User');
      const response = await request(app)
      .patch(`/api/users/${user.id}`)
        .send({ last_name: "Anthony", profile_Pic: "new_updated_avatar.png" })
        .set('Authorization', `Bearer ${generateToken(user.id, JWT_SECRET)}`)
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("PSQL error: 42703");
    });
  });
  describe("PATCH /api/users Error Handling", () => {
    it("status: 500 should respond with an PSQL error message (2 invalid column names)", async () => {
        const user = getUserByRole(unorderedUsers,'User');
      const response = await request(app)
      .patch(`/api/users/${user.id}`)
      .send({
        middle_name: "Anthony",
        profile_Pic: "new_updated_avatar.png",
      })
      .set('Authorization', `Bearer ${generateToken(user.id, JWT_SECRET)}`)
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("PSQL error: 42703");
    });
  });
  describe("PATCH /api/users Error Handling", () => {
      it("status: 500 should respond with an PSQL error message (invalid value for column)", async () => {
        const user = getUserByRole(unorderedUsers,'User');
      const response = await request(app)
      .patch(`/api/users/${user.id}`)
        .send({ first_name: "Boris", access_type: "Godmother" })
        .set('Authorization', `Bearer ${generateToken(user.id, JWT_SECRET)}`)
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("PSQL error: 23514");
    });
  });
});

describe("DELETE /api/users/:id", () => {

  describe("Should delete user by User ID", () => {
    it("status: 200 should respond with a deleted user", async () => {
        const user = getUserByRole(unorderedUsers,'User');
        
      const response = await request(app)
      .delete(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${generateToken(user.id, JWT_SECRET)}`)
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
        
      test(`status: 404 should respond with an error message,
        admin access to non existing user`, async () => {
        const admin = getUserByRole(unorderedUsers,'Admin');
        const response = await request(app)
        .delete(`/api/users/100`)
        .set('Authorization', `Bearer ${generateToken(admin.id, JWT_SECRET)}`)
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("User not found");
      });
      test("status: 400 should respond with an error message", async () => {

          const admin = getUserByRole(unorderedUsers,'Admin');
        const response = await request(app)
        .delete("/api/users/a2c")
        .set('Authorization', `Bearer ${generateToken(admin.id, JWT_SECRET)}`)
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Bad Request");
      });
    });
  });
});
