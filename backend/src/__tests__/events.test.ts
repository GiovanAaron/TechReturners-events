import client from "../db/connection";
import app from "../app";
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
      expect(response.body.event.recurrence_rule).toBeDefined();
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
      expect(response.body.event.recurrence_rule).toBeDefined();
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
    test("should create a new event", async () => {
      const response = await request(app).post("/api/events").send({
        owner_id: 1,
        title: "Test Event",
        description: "Test Description",
        category: "Job Fair",
        start_datetime: "2023-06-01T10:00:00Z",
        end_datetime: "2023-06-01T11:00:00Z",
        location_type: "In-Person",
        price: 10.99,
        photo_1_url: "https://example.com/test-image.jpg",
        photo_2_url: "https://example.com/test-image2.jpg",
        photo_3_url: "https://example.com/test-image3.jpg",
        region: "England",
        city: "London",
        address: "Test Address",
        tickets_remaining: 100,
        capacity: 100,
      });

      expect(response.status).toBe(201);
      expect(response.body.newEvent).toBeInstanceOf(Object);
      expect(response.body.newEvent).toMatchObject({
        owner_id: expect.any(Number),
        title: "Test Event",
        description: "Test Description",
        category: "Job Fair",
        start_datetime: "20230601T100000Z",
        end_datetime: "20230601T110000Z",
        location_type: "In-Person",
        price: 10.99,
        photo_1_url: "https://example.com/test-image.jpg",
        photo_2_url: "https://example.com/test-image2.jpg",
        photo_3_url: "https://example.com/test-image3.jpg",
        region: "England",
        city: "London",
        address: "Test Address",
      });
    });
    test("should create a new event", async () => {
      const response = await request(app).post("/api/events").send({
        owner_id: 3,
        title: "Test Event2",
        description: "Second Test Description",
        category: "Hackathon",
        start_datetime: "20240601T110000Z",
        end_datetime: "20240601T100000Z",
        location_type: "Remote",
        price: 0,
        photo_1_url: "https://example.com/test-image.jpg",
        photo_2_url: "https://example.com/test-image2.jpg",
        photo_3_url: "https://example.com/test-image3.jpg",
        region: "Wales",
        city: "London",
        address: "Test Address",
        tickets_remaining: 500,
        capacity: 500,
      });

      expect(response.status).toBe(201);
      expect(response.body.newEvent).toBeInstanceOf(Object);
      expect(response.body.newEvent).toMatchObject({
        owner_id: expect.any(Number),
        title: "Test Event2",
        description: "Second Test Description",
        category: "Hackathon",
        start_datetime: "20240601T110000Z",
        end_datetime: "20240601T100000Z",
        location_type: "Remote",
        price: 0,
        photo_1_url: "https://example.com/test-image.jpg",
        photo_2_url: "https://example.com/test-image2.jpg",
        photo_3_url: "https://example.com/test-image3.jpg",
        region: "Wales",
        city: "London",
        address: "Test Address",
        tickets_remaining: 500,
        capacity: 500,
      });
    });
  });
  describe("POST events error handling", () => {
    test("should return 400 for an invalid event format", async () => {
      const response = await request(app).post("/api/events").send({
        invalid: "invalid",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "PSQL error(23502) found in 'owner_id' column"
      );
    });

    test("should return 400 for invalid category", async () => {
      const response = await request(app).post("/api/events").send({
        owner_id: 5,
        title: "AI & Machine Learning Summit 2024",
        description:
          "Join us for the most exciting AI summit where experts from around the world share their latest research and developments in AI and ML.",
        category: "MACHINE",
        start_datetime: "2024-06-10T09:00:00Z",
        end_datetime: "2024-06-10T12:00:00Z",
        location_type: "Remote",
        price: 29.99,
        photo_1_url: "https://example.com/ai-summit-image.jpg",
        photo_2_url: "https://example.com/ai-summit-image2.jpg",
        photo_3_url: "https://example.com/ai-summit-image3.jpg",
        region: "Wales",
        city: "Cardiff",
        address: "Online event (link to be provided)",
        tickets_remaining: 500,
        capacity: 1000,
        google_event_id: "123abc456def7890xyz",
        visibility: "public",
        recurrence_rule: "FREQ=DAILY;COUNT=5",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "PSQL error(23514) found in constraint 'event_category_check'"
      );
    });
    test("should return 400 for missing title", async () => {
      const response = await request(app).post("/api/events").send({
        owner_id: 3,

        description:
          "Join us for the most exciting AI summit where experts from around the world share their latest research and developments in AI and ML.",
        category: "Webinar",
        start_datetime: "2024-06-10T09:00:00Z",
        end_datetime: "2024-06-10T12:00:00Z",
        location_type: "Remote",
        price: 29.99,
        photo_1_url: "https://example.com/ai-summit-image.jpg",

        region: "Wales",
        city: "Cardiff",
        address: "Online event (link to be provided)",
        tickets_remaining: 500,
        capacity: 1000,
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "PSQL error(23502) found in 'title' column"
      );
    });
    test("should return 400 for invalid location_type", async () => {
      const response = await request(app).post("/api/events").send({
        owner_id: 3,
        title: "AI & Machine Learning Summit 2024",
        description:
          "Join us for the most exciting AI summit where experts from around the world share their latest research and developments in AI and ML.",
        category: "Webinar",
        start_datetime: "2024-06-10T09:00:00Z",
        end_datetime: "2024-06-10T12:00:00Z",
        location_type: "Hybrid",
        price: 29.99,
        photo_1_url: "https://example.com/ai-summit-image.jpg",

        region: "Wales",
        city: "Cardiff",
        address: "Online event (link to be provided)",
        tickets_remaining: 500,
        capacity: 1000,
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "PSQL error(23514) found in constraint 'event_location_type_check'"
      );
    });
  });
});

describe.only("PATCH api/events", () => {
  describe("Patch api/events", () => {
    test("should respond with 200 for a valid patch request", async () => {
      const response = await request(app)
        .patch("/api/events/4")
        .send({
          title: "AI & Machine Learning Summit 2024",
          description:
            "Join us for the most exciting AI summit where experts from around the world share their latest research and developments in AI and ML.",
          
        });

      expect(response.status).toBe(200);
      expect(response.body.updatedEvent.title).toBe("AI & Machine Learning Summit 2024");
    });
    test("should respond with 200 for a valid patch request", async () => {
      const response = await request(app)
        .patch("/api/events/6")
        .send({
         
          end_datetime: "20250610T120000Z",
          
        });

      expect(response.status).toBe(200);
      expect(response.body.updatedEvent.end_datetime).toBe("20250610T120000Z");
    });


  });

  describe("Patch events error handling", () => {
    test("should respond with 400 for an invalid event format", async () => {
      const response = await request(app).patch("/api/events/4").send({
        invalid: "invalid",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "PSQL error(42703)"
      );
    });

    test("should respond with 400 for invalid category", async () => {
      const response = await request(app).patch("/api/events/6").send({
        category: "MACHINE",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "PSQL error(23514) found in constraint 'event_category_check'"
      );
    });

    test("should respond with 404 for an invalid event ID", async () => {
      const response = await request(app).patch("/api/events/999999").send({
        title: "AI & Machine Learning Summit 2024",
      });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Event not found");
    });

  });
});

describe("Delete api/events", () => {
  describe("Delete Event by ID", () => {});

    test("should respond with 204 for a valid delete request", async () => {
      const response = await request(app).delete("/api/events/3");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });


  describe("Delete events error handling", () => {

    test("should respond with 404 for an invalid event ID (Number)", async () => {
      const response = await request(app).delete("/api/events/999999");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Event not found");
    });
    test("should respond with 404 for an invalid event ID (text)", async () => {
      const response = await request(app).delete("/api/events/askd");

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Bad Request: id must be a number");
    });

  });
});

