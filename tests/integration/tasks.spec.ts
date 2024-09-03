import request from "supertest";
import app from "../../src/app";

describe("Tasks", () => {
  let token: string;

  beforeAll(async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" });

    token = response.body.token;
  });

  it("Should create a task", async () => {
    const response = await request(app)
      .post("/api/task")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test task", description: "This is a test task" });

    expect(response.status).toBe(201);
  });

  it("Should list tasks for the authenticated user", async () => {
    const response = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
