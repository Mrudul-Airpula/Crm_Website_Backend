const handler = require("./handler");

describe("login api test", () => {
    test("Request without username and with password", async () => {
        const event = {
            body: {
                username: "",
                password: "test@123",

            },
        };
        const res = await handler.login(event);
        expect(res.body).toBe('{"status":"error","Message":"username missing"}');
    });
    test("Request without username and with password", async () => {
        const event = {
            body: {
                username: "abc@123",
                password: "",
            },
        };
        const res = await handler.login(event);
        expect(res.body).toBe('{"status":"error","Message":"password missing"}');
    });
});



describe("getsingleprofile api test", () => {
    test("Request profile without id", async () => {
        const event = {
            body: {
                id: ""
            },
        };
        const res = await handler.getsingleprofile(event);
        expect(res.body).toBe('{"status":"error","Message":"id missing"}')
    });
});





describe("insertsingleprofile api test", () => {
    test("Insert with firstname empty", async () => {
        const event = {
            body: {
                firstname: "",
                lastname: "abc",
                email: "abc@xyz.com",
                dob: "1999-09-09",
                address: "Hydcity",
                password: "xxxxx",
                repassword: "xxxxx"
            },
        };
        const res = await handler.insertsingleprofile(event);
        expect(res.body).toBe('{"status":"error","Message":"Firstname is Mandatory"}')
    });
    test("Insert with lasttname empty", async () => {
        const event = {
            body: {
                firstname: "abc",
                lastname: "",
                email: "abc@xyz.com",
                dob: "1999-09-09",
                address: "Hydcity",
                password: "xxxxx",
                repassword: "xxxxx"
            },
        };
        const res = await handler.insertsingleprofile(event);
        expect(res.body).toBe('{"status":"error","Message":"Lastname is Mandatory"}')
    });
    test("Insert with email empty", async () => {
        const event = {
            body: {
                firstname: "def",
                lastname: "abc",
                email: "",
                dob: "1999-09-09",
                address: "Hydcity",
                password: "xxxxx",
                repassword: "xxxxx"
            },
        };
        const res = await handler.insertsingleprofile(event);
        expect(res.body).toBe('{"status":"error","Message":"Email is Mandatory"}')
    });
    test("Insert with dob empty", async () => {
        const event = {
            body: {
                firstname: "xxx",
                lastname: "abc",
                email: "abc@xyz.com",
                dob: "",
                address: "Hydcity",
                password: "xxxxx",
                repassword: "xxxxx"
            },
        };
        const res = await handler.insertsingleprofile(event);
        expect(res.body).toBe('{"status":"error","Message":"Date of Birth is Mandatory"}')
    });
    test("Insert with address empty", async () => {
        const event = {
            body: {
                firstname: "xxx",
                lastname: "abc",
                email: "abc@xyz.com",
                dob: "1999-09-09",
                address: "",
                password: "xxxxx",
                repassword: "xxxxx"
            },
        };
        const res = await handler.insertsingleprofile(event);
        expect(res.body).toBe('{"status":"error","Message":"Address is Mandatory"}')
    });
    test("Insert with Password empty", async () => {
        const event = {
            body: {
                firstname: "xxx",
                lastname: "abc",
                email: "abc@xyz.com",
                dob: "1999-09-09",
                address: "Hydcity",
                password: "",
                repassword: "xxxxx"
            },
        };
        const res = await handler.insertsingleprofile(event);
        expect(res.body).toBe('{"status":"error","Message":"Password is Mandatory"}')
    });
    test("Insert with repassword empty", async () => {
        const event = {
            body: {
                firstname: "xxx",
                lastname: "abc",
                email: "abc@xyz.com",
                dob: "1999-09-09",
                address: "Hydcity",
                password: "xxxxx",
                repassword: ""
            },
        };
        const res = await handler.insertsingleprofile(event);
        expect(res.body).toBe('{"status":"error","Message":"Repassword is Mandatory"}')
    });
});