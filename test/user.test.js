import supertest from "supertest";
import server from "../server";
import mongoose from "mongoose";
const req = supertest(server);

import {
  user,
  invalidEmail,
  invalidName,
  invalidPassword,
  credentials,
  invalidEmailCredential,
  invalidPasswordCredential,
} from "./cases.js";

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

  describe("User /signup", () => {
    it("Should return 201 status code with user data", async () => {
      const res = await req.post("/signup").send(user);
      expect(res.status).toBe(201);
      expect(res.body.email).toBe(user.email);
      expect(res.body.name).toBe(user.name);
      expect(res.body.password).toBe(undefined);
    });
    it("Should return 400 status code with error message for invalid email", async () => {
      const res = await req.post("/signup").send(invalidEmail);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Validation failed");
    });
    it("Should return 400 status code with error message for invalid name", async () => {
      const res = await req.post("/signup").send(invalidName);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Validation failed");
    });
    it("Should return 400 status code with error message for invalid password", async () => {
      const res = await req.post("/signup").send(invalidPassword);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Validation failed");
    });
    it("Should return 409 status code with error message for existing email", async () => {
      const res = await req.post("/signup").send(user);
      expect(res.status).toBe(409);
      expect(res.body.message).toBe("Data already exist in the database");
    });
  });

  describe("User /signin", () => {
    it("Should return 200 status code with user data & JWT", async () => {
      const res = await req.post("/signin").send(credentials);
      expect(res.status).toBe(200);
      expect(res.body.user.email).toBe(user.email);
      expect(res.body.user.name).toBe(user.name);
      expect(res.body.token).toBeDefined();
    });
    it("Should return 401 status code with error message for invalid email credential", async () => {
      const res = await req.post("/signin").send(invalidEmailCredential);
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Incorrect email or password");
    });
    it("Should return 401 status code with error message for invalid password credential", async () => {
      const res = await req.post("/signin").send(invalidPasswordCredential);
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Incorrect email or password");
    });
  });
});