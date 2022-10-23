import supertest from "supertest";
import server from "../server";
import mongoose from "mongoose";
import {
  article,
  credentials,
  missingDate,
  missingImage,
  missingKeyword,
  missingLink,
  missingSource,
  missingText,
  missingTitle,
  user,
} from "./cases.js";

const req = supertest(server);

afterAll((done) => {
  mongoose.connection.dropDatabase();
  mongoose.connection.close();
  done();
});

let token;
describe("Article action", () => {
  it("Creating user...", async () => {
    const res = await req.post("/signup").send(user);
    return res;
  });
  it("Getting token...", async () => {
    const res = await req.post("/signin").send(credentials);
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
    expect(res.body.owner).toBe(undefined);
  });

  it("Should return 400 status code for missing keyword", async () => {
    const res = await req
      .post("/articles")
      .send(missingKeyword)
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
  });
  it("Should return 400 status code for missing title", async () => {
    const res = await req
      .post("/articles")
      .send(missingTitle)
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
  });

  it("Should return 400 status code for missing text", async () => {
    const res = await req
      .post("/articles")
      .send(missingText)
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
  });

  it("Should return 400 status code for missing date", async () => {
    const res = await req
      .post("/articles")
      .send(missingDate)
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
  });

  it("Should return 400 status code for missing source", async () => {
    const res = await req
      .post("/articles")
      .send(missingSource)
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
  });

  it("Should return 400 status code for missing link", async () => {
    const res = await req
      .post("/articles")
      .send(missingLink)
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
  });

  it("Should return 400 status code for missing image", async () => {
    const res = await req
      .post("/articles")
      .send(missingImage)
      .set("Authorization", "Bearer " + token);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
  });
});
