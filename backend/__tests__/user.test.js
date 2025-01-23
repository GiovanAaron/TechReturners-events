const client = require("../db/connection");
const app = require("../app.ts");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const { attendanceData, userData, eventsData } = require("../db/data/test-data/index.js");



beforeEach(async () => {

    await seed(userData, eventsData, attendanceData)

})


afterAll( () => {
     client.end();
});


describe("Get Users", () => {

    describe("GET /api/users", () => {
        it("should respond with a 200 status code", () => {
            return request(app)
                .get("/api/users")
                .expect(200)
        })
    })
})