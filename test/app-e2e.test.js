import supertest from "supertest";
import server from "../server";
const req = supertest(server);

afterAll((done) => {
  done();
});

describe("Initial app settings", () => {
  it("Should response with 404 status code for undefined route", async () => {
    const res = await req.get("/some-non-exist-route");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Requested resource not found");
  });
});
