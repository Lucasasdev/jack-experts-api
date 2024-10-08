import request from "supertest";
import app from "../../src/app";

describe("Login", () => {
  it("Should return a token for valid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Should return status 401 for invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "wrongpassword" });

    expect(response.status).toBe(401);
  });

  it("Verify body values returned as response", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "testjwt@email.com", password: "testingjwt" });

    expect(response.body).toMatchObject({
      token: expect.any(String),
      auth: expect.any(Boolean),
      user: expect.any(Object),
    });
  });
});
