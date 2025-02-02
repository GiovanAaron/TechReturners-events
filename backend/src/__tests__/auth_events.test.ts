import client from "../db/connection";
import app from "../app";
import seed from "../db/seeds/seed";
import request from "supertest";

import {
  attendanceData,
  userData,
  eventsData,
} from "../db/data/test-data/index";

import {
    getUserByRole,
    generateToken,
    getEventIdByUserId
  } from "../utils/test_utils";

  let unorderedUsers: any[] | undefined = []
  let unorderedEvents: any[] | undefined = [] 

  beforeEach(async () => {
    try {
      const result = await seed(userData, eventsData, attendanceData);
    
      unorderedUsers = result?.seededUsers
      unorderedEvents = result?.seededEvents
 
    } catch (error: any) {
      console.error(error);
    }
  });

afterAll(async () => {
  await client.end();
});

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

describe("POST api/events", () => {
  describe("POST api/events", () => {
    test("Moderator can create an event", async () => {
      const moderator = getUserByRole(unorderedUsers, "Moderator")
      const user = getUserByRole(unorderedUsers, "User")
      const token = generateToken(moderator.id, JWT_SECRET);

      const response = await request(app)
      .post("/api/events")
      .send({
        owner_id: moderator.id,
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
      })
      .set("Authorization", `Bearer ${token}`);

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
    test("Admin can create an event", async () => {
      const admin = getUserByRole(unorderedUsers, "Admin")
      const user = getUserByRole(unorderedUsers, "User")
      const token = generateToken(admin.id, JWT_SECRET);
      const response = await request(app).post("/api/events").send({
        owner_id: admin.id,
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
      })
      .set("Authorization", `Bearer ${token}`);

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
      const admin = getUserByRole(unorderedUsers, "Admin")
      
      const response = await request(app).post("/api/events").send({
        invalid: "invalid",
      }).set('Authorization', `Bearer ${generateToken(admin.id, JWT_SECRET)}`);


      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "PSQL error(23502) found in 'owner_id' column"
      );
    });

    test("should return 400 for invalid category", async () => {

      const moderator = getUserByRole(unorderedUsers, "Moderator")
      const response = await request(app).post("/api/events").send({
        owner_id: moderator.id,
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
      }).set('Authorization', `Bearer ${generateToken(moderator.id, JWT_SECRET)}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "PSQL error(23514) found in constraint 'event_category_check'"
      );
    });
    test("should return 400 for missing title", async () => {
      const moderator = getUserByRole(unorderedUsers, "Moderator")
      const response = await request(app).post("/api/events").send({
        owner_id: moderator.id,

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
      }).set('Authorization', `Bearer ${generateToken(moderator.id, JWT_SECRET)}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "PSQL error(23502) found in 'title' column"
      );
    });
    test("should return 400 for invalid location_type", async () => {
      const admin = getUserByRole(unorderedUsers, "Admin")
      const response = await request(app).post("/api/events").send({
        owner_id: admin.id,
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
      }).set('Authorization', `Bearer ${generateToken(admin.id, JWT_SECRET)}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "PSQL error(23514) found in constraint 'event_location_type_check'"
      );
    });
  });
});

describe("PATCH api/events", () => {
  describe("Patch api/events", () => {
    test("should respond with 200 for a valid patch request by moderator", async () => {
      const moderator = getUserByRole(unorderedUsers, "Moderator")
      const testEvent = getEventIdByUserId(unorderedUsers, unorderedEvents, "Moderator")
      const response = await request(app)
        .patch(`/api/events/${testEvent.id}`)
        .send({
          title: "AI & Machine Learning Summit 2024",
          description:
            "Join us for the most exciting AI summit where experts from around the world share their latest research and developments in AI and ML.",
          
        })
        .set("Authorization", `Bearer ${generateToken(testEvent.owner_id, JWT_SECRET)}`);
        
      expect(response.status).toBe(200);
      expect(response.body.updatedEvent.title).toBe("AI & Machine Learning Summit 2024");
    });
    test("Admin can patch any event", async () => {
      const admin = getUserByRole(unorderedUsers, "Admin")
      const moderator = getUserByRole(unorderedUsers, "Moderator")
      const testEvent = getEventIdByUserId(unorderedUsers, unorderedEvents, "Admin")
      const response = await request(app)
        .patch(`/api/events/${testEvent.id}`)
        .send({
          title: "AI & Machine Learning Summit 2024",
          description:
            "Join us for the most exciting AI summit where experts from around the world share their latest research and developments in AI and ML.",
          
        })
        .set("Authorization", `Bearer ${generateToken(testEvent.owner_id, JWT_SECRET)}`);

      expect(response.status).toBe(200);
      expect(response.body.updatedEvent.title).toBe("AI & Machine Learning Summit 2024");
    });
    test("should respond with 200 for a valid patch request", async () => {
      const testEvent = getEventIdByUserId(unorderedUsers, unorderedEvents, "Admin")
      const response = await request(app)
        .patch(`/api/events/${testEvent.id}`)
        .send({
         
          end_datetime: "20250610T120000Z",
          
        })
        .set("Authorization", `Bearer ${generateToken(testEvent.owner_id, JWT_SECRET)}`);

      expect(response.status).toBe(200);
      expect(response.body.updatedEvent.end_datetime).toBe("20250610T120000Z");
    });


  });

  describe("Patch events error handling", () => {
    test("should respond with 400 for an invalid event format", async () => {
      const testEvent = getEventIdByUserId(unorderedUsers, unorderedEvents, "Admin")
      const response = await request(app).patch(`/api/events/${testEvent.id}`).send({
        invalid: "invalid",
      })
        .set("Authorization", `Bearer ${generateToken(testEvent.owner_id, JWT_SECRET)}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "PSQL error(42703)"
      );
    });

    test("should respond with 400 for invalid category", async () => {
      const testEvent = getEventIdByUserId(unorderedUsers, unorderedEvents, "Admin")
      const response = await request(app).patch(`/api/events/${testEvent.id}`).send({
        category: "MACHINE",
      }).set('Authorization', `Bearer ${generateToken(testEvent.owner_id, JWT_SECRET)}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "PSQL error(23514) found in constraint 'event_category_check'"
      );
    });

    test("should respond with 404 for an invalid event ID", async () => {
      const testEvent = getEventIdByUserId(unorderedUsers, unorderedEvents, "Admin")
      const response = await request(app).patch(`/api/events/9999999`).send({
        title: "AI & Machine Learning Summit 2024",
      }).set('Authorization', `Bearer ${generateToken(testEvent.owner_id, JWT_SECRET)}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Event not found");
    });

  });
});

describe("Delete api/events", () => {
  describe("Delete Event by ID", () => {});

    test("Admin can delete any event ", async () => {
      const testEvent = getEventIdByUserId(unorderedUsers, unorderedEvents, "Admin")
      const anyEvent = getEventIdByUserId(unorderedUsers, unorderedEvents, "Moderator")
      const response = await request(app).delete(`/api/events/${anyEvent.id}`)
      .set('Authorization', `Bearer ${generateToken(testEvent.owner_id, JWT_SECRET)}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({})
    })
    test("Mod can delete any event ", async () => {
      const testEvent = getEventIdByUserId(unorderedUsers, unorderedEvents, "Admin")
      const anyEvent = getEventIdByUserId(unorderedUsers, unorderedEvents, "Moderator")
      const response = await request(app).delete(`/api/events/${testEvent.id}`)
      .set('Authorization', `Bearer ${generateToken(anyEvent.owner_id, JWT_SECRET)}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({})
    })


  describe("Delete events error handling", () => {

    test("should respond with 404 for an invalid event ID (Number)", async () => {
      const testEvent = getEventIdByUserId(unorderedUsers, unorderedEvents, "Admin")
      const response = await request(app).delete("/api/events/999999")
      .set('Authorization', `Bearer ${generateToken(testEvent.owner_id, JWT_SECRET)}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Event not found");
    });
    test("should respond with 404 for an invalid event ID (text)", async () => {
      const testEvent = getEventIdByUserId(unorderedUsers, unorderedEvents, "Admin")
      const response = await request(app).delete("/api/events/askd")
      .set('Authorization', `Bearer ${generateToken(testEvent.owner_id, JWT_SECRET)}`)

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Bad Request: id must be a number");
    });

  });
});

describe("User making event requests", () => {
  describe("POST /events", () => {
    test("User cannot create an event", async () => {
      const testUser = getUserByRole(unorderedUsers, "User")
      const response = await request(app).post("/api/events").send({
        owner_id: testUser.id,
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
      })
      .set("Authorization", `Bearer ${generateToken(testUser.id, JWT_SECRET)}`);

      expect(response.status).toBe(403);
      expect(response.body.error).toBe("Access denied");
    });
  });

  describe("PATCH /events/:id", () => {
    test("User cannot update an event", async () => {
      const testUser = getUserByRole(unorderedUsers, "User")
      const anyEvent = getEventIdByUserId(unorderedUsers, unorderedEvents, "Moderator")
      const response = await request(app).patch(`/api/events/${anyEvent.id}`)
      .send({
        title: "Test Event Updated",
      })
      .set('Authorization', `Bearer ${generateToken(testUser.id, JWT_SECRET)}`);

      expect(response.status).toBe(403);
      expect(response.body.error).toBe("Access denied");
    });
  });

  describe("DELETE /events/:id", () => {
    test("User cannot delete an event", async () => {
      const testUser = getUserByRole(unorderedUsers, "User")
      const anyEvent = getEventIdByUserId(unorderedUsers, unorderedEvents, "Moderator")
      const response = await request(app).delete(`/api/events/${anyEvent.id}`)
      .set('Authorization', `Bearer ${generateToken(testUser.id, JWT_SECRET)}`);

      expect(response.status).toBe(403);
      expect(response.body.error).toBe("Access denied");
    });
  });
});
