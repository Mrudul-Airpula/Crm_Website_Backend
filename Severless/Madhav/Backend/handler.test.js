const handler = require("./handler");
describe("Login api test", () => {
  test("Request without username and with password", async () => {
      const event = {
          body: {
              username: "",
              password: "a12345",

          },
      };
      const res = await handler.Login(event);
      expect(res.body).toBe('{"status":"error","Message":"username missing"}');
  });
  test("Request without username and with password", async () => {
      const event = {
          body: {
              username: "aaa@xyz.com",
              password: "",
          },
      };
      const res = await handler.Login(event);
      expect(res.body).toBe('{"status":"error","Message":"password missing"}');
  });
});