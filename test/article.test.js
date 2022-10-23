import supertest from "supertest";
import server from "../server";
import mongoose from "mongoose";
import { article, credentials, user } from "./cases.js";

const req = supertest(server);

afterAll((done) => {
  mongoose.connection.dropDatabase();
  mongoose.connection.close();
  done();
});

let token;
describe("Article action", () => {
  it("Should return 201 status code with user data", async () => {
    const res = await req.post("/signup").send(user);
    expect(res.status).toBe(201);
    expect(res.body.email).toBe(user.email);
    expect(res.body.name).toBe(user.name);
    expect(res.body.password).toBe(undefined);
  });
  it("Should return 200 status code with user data & JWT", async () => {
    const res = await req.post("/signin").send(credentials);
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(user.email);
    expect(res.body.user.name).toBe(user.name);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("Should return 201 status code with article data", async () => {
    const res = await req
      .post("/articles")
      .send(article)
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(201);
    expect(res.body.keyword).toBe(article.keyword);
    expect(res.body.title).toBe(article.title);
    expect(res.body.text).toBe(article.text);
    expect(res.body.link).toBe(article.link);
    expect(res.body.image).toBe(article.image);
    expect(res.body.date).toBe(article.date);
    expect(res.body.source).toBe(article.source);
  });
});
