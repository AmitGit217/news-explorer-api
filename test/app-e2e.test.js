import supertest from "supertest";
import server from "../server";
import mongoose from "mongoose";
const req = supertest(server);

afterAll((done) => {
  mongoose.connection.dropDatabase();
  mongoose.connection.close();
  done();
});

describe("Initial app settings", () => {
  it("Should response with 404 status code for undefined route", async () => {
    const res = await req.get("/some-non-exist-route");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Requested resource not found");
  });

  describe("User", () => {
    const user = {
      email: "valid@email.com",
      name: "name",
      password: "password",
    };
    const invalidEmail = {
      email: "invalidEmail",
      name: "name",
      password: "password",
    };
    it("Should return 201 status code with user data", async () => {
      const res = await req.post("/signup").send(user);
      expect(res.status).toBe(201);
      expect(res.body.email).toBe(user.email);
      expect(res.body.name).toBe(user.name);
      expect(res.body.password).toBe(undefined);
    });
    it("Should return 400 status code with error message", async () => {
      const res = await req.post("/signup").send(invalidEmail);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Input invalid");
    });
    it("Should return 409 status code with error message", async () => {
      const res = await req.post("/signup").send(user);
      expect(res.status).toBe(409);
      expect(res.body.message).toBe("Resource need to be unique");
    });
  });
});
