const request = require("supertest");
const app = require("../app");

describe("Express App Tests",() => {
  it("should return REACT_PORT from /api", async () => {
    const response = await request(app).get("/api");
    expect(response.statusCode).toBe(200);
    expect(response.body.aa).toBe(process.env.REACT_PORT);
  });

//   it("should return 200 OK from /api/health with valid token", async () => {
//     const validToken = "mock_valid_token"; // テスト用の有効なトークンをモック
//     const response = await request(app)
//       .get("/api/health")
//       .set("Authorization", `Bearer ${validToken}`);

//     expect(response.statusCode).toBe(200);
//     expect(response.body.state).toBe("OK");
//   });

//   it("should return 401 Unauthorized from /api/health without token", async () => {
//     const response = await request(app).get("/api/health");
//     expect(response.statusCode).toBe(401);
//   });
});