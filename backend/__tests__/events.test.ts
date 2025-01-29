import client from "../db/connection";
import app from "../src/app";
import seed from "../db/seeds/seed";
import request from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

describe("GET /events", () => {

  describe("GET /events", () => {
    it("should return an array of events", async () => {
      const response = await request(app).get("/events");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      response.body.forEach((event: any) => {
        expect(event).toMatchObject({
          owner_id: expect.any(Number),
          title: expect.any(String),
          tickets_remaining: expect.any(Number),
          capacity: expect.any(Number),
          description: expect.any(String),
          category: expect.any(String),
          start_datetime: expect.any(String),
          end_datetime: expect.any(String),
          location_type: expect.any(String),
          address: expect.any(String),
        });
      });
    });
  })
  
  describe('GET /events/:id', () => {
    describe('GET /events/:id', () => {
        
    });
    describe('GET /events/:id error handling', () => {
        
    })
  });
  
  
});

describe("POST /events", () => {
    describe('POST /events', () => {
        
    });

    describe('POST events error handling', () => {
        
    });
  
});
