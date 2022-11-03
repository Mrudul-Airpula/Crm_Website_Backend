const handler = require("./handler");
describe("Loginn", () => {
    test("Request without username and with password", async () => {
        const event = {
            body: {
                username: "",
                password: "a12345",
            },
        };
        const res = await handler.Loginn(event);
        expect(res.body).toBe('{"status":"error","Message":"username missing"}');
    });
    test("Request with username and without password", async () => {
        const event = {
            body: {
                username: "AAAA",
                password: "",
            },
        };
        const res = await handler.Loginn(event);
        expect(res.body).toBe('{"status":"error","Message":"password missing"}');
    });
});





describe("getleadfilter", () => {
    test("Request without filtername and with value_filter", async () => {
        const event = {
            body: {
                value_filter: "txtFirstName",
                filtername: "",
            },
        };
        const res = await handler.getleadfilter(event);
        expect(res.body).toBe('{"status":"error","Message":"filtername missing"}');
    });
    test("Request with value_filter and without filtername", async () => {
        const event = {
            body: {
                value_filter: "",
                filtername: "sam",
            },
        };
        const res = await handler.getleadfilter(event);
        expect(res.body).toBe('{"status":"error","Message":"value_filter missing"}');
    });
});



describe("getsinglelead", () => {
    test("Request with id", async () => {
        const event = {
            body: {
                id: "",
            },
        };
        const res = await handler.getsinglelead(event);
        expect(res.body).toBe('{"status":"error","Message":"id missing"}');
    });

});


describe("salespersoncount", () => {
    test("Request with Prospect", async () => {
        const event = {
            body: {
                Prospect: "",
            },
        };
        const res = await handler.salespersoncount(event);
        expect(res.body).toBe('{"status":"error","Message":"Prospect missing"}');
    });

});