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



xdescribe("GET /api/attendances", () => {
  it("should return a list of all attendance records", async () => {
    const response = await request(app).get("/api/attendances");
    expect(response.status).toBe(200);
    expect(response.body.attendances).toBeInstanceOf(Array);
    expect(response.body.attendances.length).toBe(2);
    response.body.attendances.forEach((attendance: any) => {
      expect(attendance).toMatchObject({
        event_id: expect.any(Number),
        user_id: expect.any(Number),
        status: expect.any(String),
        registered_at: expect.any(String),
      });
    });
  });
});



describe("GET /api/events/:eventId/attendees", () => {
  test("should return a list of attendees for a specific event", async () => {
    const response = await request(app).get("/api/events/2/attendances");
    expect(response.status).toBe(200);
    expect(response.body.attendees).toBeInstanceOf(Object);
    
    expect(response.body.attendees.length).toBe(2);
    expect(response.body.attendees[0]).toBeInstanceOf(Object);
  });
  test("should return a list of attendees for a specific event", async () => {
    const response = await request(app).get("/api/events/5/attendances");
    
    
    expect(response.status).toBe(200);
    expect(response.body.attendees).toBeInstanceOf(Object);

    expect(response.body.attendees.length).toBe(2);
    expect(response.body.attendees[0]).toBeInstanceOf(Object);
  });

  describe("Error Handling", () => {
    test("status: 400 should respond with an error message", async () => {
      const response = await request(app).get("/api/events/abc/attendances");
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Bad Request: id must be a number");
    });
    test("status: 404 should respond with an error message, non existant event", async () => {
      const response = await request(app).get("/api/events/999999/attendances");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Bad Request: Event not found");
    });
  });
});


xdescribe("GET /api/attendances/:id", () => {
  it("should return a single attendance record by ID", async () => {
    const response = await request(app).get("/api/attendances/1");
    expect(response.status).toBe(200);
    expect(response.body.attendance).toBeInstanceOf(Object);
    expect(response.body.attendance).toMatchObject({
      event_id: expect.any(Number),
      user_id: expect.any(Number),
      status: expect.any(String),
      registered_at: expect.any(String),
    });
  });

  describe("GET /api/attendances/:id Error Handling", () => {
    it("status: 404 should respond with an error message", async () => {
      const response = await request(app).get("/api/attendances/100");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Attendance not found");
    });
    it("status: 400 should respond with an error message", async () => {
      const response = await request(app).get("/api/attendances/abc");
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Bad Request");
    });
  });
});


describe.only("POST /api/events/:id/attendances", () => {
  describe("Should create a new attendance record", () => {
    it("should create a new attendance record", async () => {
      const response = await request(app)
        .post("/api/events/1/attendances")
        .send({ event_id: 1, user_id: 4, status: "Attended" });
      expect(response.status).toBe(201);
      expect(response.body.attendance).toBeInstanceOf(Object);
      expect(response.body.attendance).toMatchObject({
        event_id: expect.any(Number),
        user_id: expect.any(Number),
        status: expect.any(String),
        registered_at: expect.any(String),
      });
    });
  });
});