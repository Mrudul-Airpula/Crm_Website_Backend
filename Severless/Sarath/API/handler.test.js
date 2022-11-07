const handler = require("./handler");
describe("Login", () => {
    test("Request without email and with password", async () => {
        const event = {
            body: {
                email: "",
                password: "a12345"
            },
        };
        const res = await handler.Login(event);
        expect(res.body).toBe('{"status":"error","Message":"email missing"}');
    });
    test("Request with email and without password", async () => {
        const event = {
            body: {
                email: "abc@xyz.com",
                password: "",
            },
        };
        const res = await handler.Login(event);
        expect(res.body).toBe('{"status":"error","Message":"password missing"}');
    });
});


describe("getProspectlistwithfilter", () => {
    test("Request without value_filter and with filtername", async () => {
        const event = {
            body: {
                value_filter: "",
                filtername: "Samuel"
            },
        };
        const res = await handler.getProspectlistwithfilter(event);
        expect(res.body).toBe('{"status":"error","Message":"value_filter missing"}');
    });
    test("Request with value_filter and without filtername", async () => {
        const event = {
            body: {
                value_filter: "txtFirstname",
                filtername: "",
            },
        };
        const res = await handler.getProspectlistwithfilter(event);
        expect(res.body).toBe('{"status":"error","Message":"filtername missing"}');
    });
});