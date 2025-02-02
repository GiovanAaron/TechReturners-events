import client from "../db/connection";
import app from "../app";
import seed from "../db/seeds/seed";
import request from "supertest";

import {
  attendanceData,
  userData,
  eventsData,
} from "../db/data/test-data/index";
import { getUserByRole, generateToken} from "../utils/test_utils";


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



describe("GET /api/events/:eventId/attendees", () => {
  test("Admin can get list of attendees for a specific event", async () => {
    const admin = getUserByRole(unorderedUsers, "Admin")

    const response = await request(app)
    .get("/api/events/2/attendances")
    .set('Authorization', `Bearer ${generateToken(admin.id, JWT_SECRET)}`);
    
    expect(response.status).toBe(200);
    expect(response.body.attendees).toBeInstanceOf(Object);
    
    expect(response.body.attendees.length).toBe(2);
    expect(response.body.attendees[0]).toBeInstanceOf(Object);
  });
  test("should return a list of attendees for a specific event", async () => {
    const admin = getUserByRole(unorderedUsers, "Admin")
    const response = await request(app)
    .get("/api/events/5/attendances")
    .set('Authorization', `Bearer ${generateToken(admin.id, JWT_SECRET)}`);
    
    expect(response.status).toBe(200);
    expect(response.body.attendees).toBeInstanceOf(Object);

    expect(response.body.attendees.length).toBe(2);
    expect(response.body.attendees[0]).toBeInstanceOf(Object);
  });

  describe("Error Handling", () => {
    test("status: 400 should respond with an error message", async () => {
        const admin = getUserByRole(unorderedUsers, "Admin")
      const response = await request(app)
      .get("/api/events/abc/attendances")
        .set('Authorization', `Bearer ${generateToken(admin.id, JWT_SECRET)}`);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Bad Request: id must be a number");
    });
    test("status: 404 should respond with an error message, non existant event", async () => {
      const admin = getUserByRole(unorderedUsers, "Admin")
      const response = await request(app)
      .get("/api/events/999999/attendances")
      .set('Authorization', `Bearer ${generateToken(admin.id, JWT_SECRET)}`);
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Bad Request: Event not found");
    });
  });
});


describe.only("POST /api/events/:id/attendances", () => {
    describe("Should create a new attendance record", () => {
      it("should create a new attendance record", async () => {
        const response = await request(app)
          .post("/api/events/1/attendances")
          .send({ event_id: 1, user_id: 3, status: "Interested" });
        expect(response.status).toBe(201);
        expect(response.body.newAttendee).toBeInstanceOf(Object);
        expect(response.body.newAttendee).toMatchObject({
          event_id: expect.any(Number),
          user_id: expect.any(Number),
          status: expect.any(String),
          registered_at: expect.any(String),
        });
      });
    });
    describe("Error Handling: POST /api/events/:id/attendances", () => {
      test("Should respond with an error message, for duplicating attendance", async () => {
        const response = await request(app)
          .post("/api/events/1/attendances")
          .send({ event_id: 1, user_id: 1, status: "Interested" });
        expect(response.status).toBe(400);
        expect(response.body.newAttendee).toBeUndefined()
        expect(response.body.error).toBe("User has already registered for this event");
      })
      it("Should respond with an error message, for non existant event", async () => {
        const response = await request(app)
          .post("/api/events/999999/attendances")
          .send({ event_id: 999999, user_id: 1, status: "Interested" });
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Bad Request: Event not found");
      });
      it("Should respond with an error message for invalid status value", async () => {
        const response = await request(app)
          .post("/api/events/1/attendances")
          .send({ event_id: 1, user_id: 6, status: "InvalidStatus" });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("PSQL error(23514) found in constraint 'attendance_status_check'");
      })
      it("Should respond with an error message, for non existant user", async () => {
        const response = await request(app)
          .post("/api/events/1/attendances")
          .send({ event_id: 1, user_id: 999999, status: "Interested" });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("PSQL error(23503) found in constraint 'fk_user'");
      });
      ;
    });
  
  });



describe("PATCH /api/events/:id/attendance", () => {
    describe("Valid Attendance Update", () => {
    test("should respond with 200 for a valid attendance update", async () => {
      const response = await request(app)
        .patch("/api/events/1/attendances")
        .send({
            user_id: 1,
          status: "Registered",
        });
  
      expect(response.status).toBe(200);
      expect(response.body.updatedAttendance).toBeInstanceOf(Object);
      expect(response.body.updatedAttendance.status).toBe("Registered");
    });
  });
  
    describe("Error Handling", () => {
      test("should respond with 400 for invalid status", async () => {
        const response = await request(app)
          .patch("/api/events/1/attendances")
          .send({
            user_id: 1,
            status: "InvalidStatus",
          });
  
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Bad Request: status must be 'Interested', 'Registered' or 'Cancelled'");
      });
  
      test("should respond with 404 for non-existent event", async () => {
        const response = await request(app)
          .patch("/api/events/999999/attendances")
          .send({
            user_id: 1,
            status: 'Registered',
          });
  
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("No record of Attendance between the user and event provided");
      });
  
      test("should respond with 404 for non-existent user", async () => {
        const response = await request(app)
          .patch("/api/events/1/attendances")
          .send({
            user_id: 999999,
            status: 'Registered',
          });
  
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("No record of Attendance between the user and event provided");
      });

    });
  });
  

describe("DELETE /api/events/:id/attendances/", () => {
  describe("DELETE /api/events/:id/attendances/", () => {
    it("should delete an attendance record by ID", async () => {
      const response = await request(app)
      .delete("/api/events/1/attendances/")
      .send({
        user_id: 1
      });
      expect(response.status).toBe(200);
      expect(response.body.msg).toBe("Attendance Deleted");
      
    });
  });

  describe("Error Handling", () => {
    test("should respond with 400 for non-existent event", async () => {
      const response = await request(app)
      .delete("/api/events/999999/attendances/")
      .send({
        user_id: 1
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("No record of Attendance between the user and event provided");
    });
    test("should respond with 400 for non-existent user", async () => {
      const response = await request(app)
      .delete("/api/events/1/attendances/")
      .send({
        user_id: 999999
      })
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("No record of Attendance between the user and event provided");
    });

    test("should respond with 400 if user_id hasn't been provided", async () => {
      const response = await request(app)
      .delete("/api/events/1/attendances/")
      .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Bad Request: user_id must be provided");
    });
    
  });

});


//These EndPoints will be restricted Access to Admins

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
  