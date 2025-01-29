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
  describe("GET all events", () => {
    it("should return an array of all events", async () => {
      const response = await request(app).get("/api/events");

      expect(response.status).toBe(200);
      expect(response.body.events).toBeInstanceOf(Array);

      response.body.events.forEach((event: any) => {
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
          price: expect.any(Number),
          photo_1_url: expect.any(String),
        });
        expect(event.region).toBeDefined(); // Ensures region is defined
        expect(event.city).toBeDefined(); // Ensures region is defined
        expect(event.region).toBeDefined(); // Ensures region is defined
        expect(event.photo_2_url).toBeDefined(); // Ensures region is defined
        expect(event.photo_3_url).toBeDefined(); // Ensures region is defined
        expect(event.google_event_id).toBeDefined(); // Ensures region is defined
        expect(event.visibility).toBeDefined(); // Ensures region is defined
        expect(event.recurrence_rule).toBeDefined(); // Ensures region is defined
      });
    });
  });
});

describe("GET /events/:id", () => {
  describe("GET /events/:id", () => {
    it("should return a single event", async () => {
      const response = await request(app).get("/api/events/2");
      expect(response.status).toBe(200);
      expect(response.body.event).toBeInstanceOf(Object);
      expect(response.body.event).toMatchObject({
        owner_id: expect.any(Number),
        title: expect.any(String),
        tickets_remaining: expect.any(Number),
        capacity: expect.any(Number),
        description: expect.any(String),
        category: expect.any(String),
        start_datetime: expect.any(String),
        end_datetime: expect.any(String),
        location_type: expect.any(String),
        price: expect.any(Number),
        photo_1_url: expect.any(String),
      });
      expect(response.body.event.region).toBeDefined(); // Ensures region is defined
        expect(response.body.event.city).toBeDefined(); // Ensures region is defined
        expect(response.body.event.region).toBeDefined(); // Ensures region is defined
        expect(response.body.event.photo_2_url).toBeDefined(); // Ensures region is defined
        expect(response.body.event.photo_3_url).toBeDefined(); // Ensures region is defined
        expect(response.body.event.google_event_id).toBeDefined(); // Ensures region is defined
        expect(response.body.event.visibility).toBeDefined(); // Ensures region is defined
        expect(response.body.event.recurrence_rule).toBeDefined()

    });
    it("should return a single event", async () => {
      const response = await request(app).get("/api/events/6");
      expect(response.status).toBe(200);
      expect(response.body.event).toBeInstanceOf(Object);
      expect(response.body.event).toMatchObject({
        owner_id: expect.any(Number),
        title: expect.any(String),
        tickets_remaining: expect.any(Number),
        capacity: expect.any(Number),
        description: expect.any(String),
        category: expect.any(String),
        start_datetime: expect.any(String),
        end_datetime: expect.any(String),
        location_type: expect.any(String),
        price: expect.any(Number),
        photo_1_url: expect.any(String),
      });
      expect(response.body.event.region).toBeDefined(); // Ensures region is defined
        expect(response.body.event.city).toBeDefined(); // Ensures region is defined
        expect(response.body.event.region).toBeDefined(); // Ensures region is defined
        expect(response.body.event.photo_2_url).toBeDefined(); // Ensures region is defined
        expect(response.body.event.photo_3_url).toBeDefined(); // Ensures region is defined
        expect(response.body.event.google_event_id).toBeDefined(); // Ensures region is defined
        expect(response.body.event.visibility).toBeDefined(); // Ensures region is defined
        expect(response.body.event.recurrence_rule).toBeDefined()

    });
  });
  describe("GET /events/:id error handling", () => {
    it("should return 400 for an invalid event ID format", async () => {
        const response = await request(app).get("/api/events/invalid_id");

        
    
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("PSQL error(22P02)");
      });
    
      it("should return 404 if the event does not exist", async () => {
        const response = await request(app).get("/api/events/999999"); // Assuming this ID does not exist
    
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Event not found");
      });



  });
});

describe("POST api/events", () => {
  describe("POST api/events", () => {
    const response = await request(app)
      .post("/api/events")
      .send({
        title: "Test Event",
        description: "Test Description",
        category: "Test Category",
        start_datetime: "2023-06-01T10:00:00Z",
        end_datetime: "2023-06-01T11:00:00Z",
        location_type: "Test Location Type",
        price: 10.99,
        photo_1_url: "https://example.com/test-image.jpg",  
        photo_2_url: "https://example.com/test-image2.jpg",
        photo_3_url: "https://example.com/test-image3.jpg",
        region: "Test Region",
        city: "Test City",
        country: "Test Country",
        address: "Test Address",
        zip_code: "12345",
        
      })


  });

  describe("POST events error handling", () => {});
});

describe("POST api/events", () => {
  describe("POST api/events", () => {});

  describe("POST events error handling", () => {});
});

describe("POST api/events", () => {
  describe("POST api/events", () => {});

  describe("POST events error handling", () => {});
});

// describe("POST api/events", () => {
//   describe("POST api/events", () => {});