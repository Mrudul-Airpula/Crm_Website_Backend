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
    test("Request with username and without password", async () => {
        const event = {
           body: {
                username: "abc@123",
                password: "",
            },
        };
        const res = await handler.login(event);
       expect(res.body).toBe('{"status":"error","Message":"password missing"}');
    });
   //test("Request with username and  password", async () => {
    //const event = {
       // body: {
        //    username: "aaa@123",
        //    password: "aaa@12",
       // },
    //};
   // const res = await handler.login(event);
   // expect(res.body).toBe('{"status":"error","Message":"Not exist in db"}');
//});
    test("Request with username and  password", async () => {
        const event = {
            body: {
                username: "abc@123",
                password: "test@123",
            },
        };
        const res = await handler.login(event);
        expect(res.body).toBe('{"status":"success","Message":"Successfully Done!"}');
    });
    
});
describe("signup api test", () => {
    test("Request without firstname,password,email,repassword", async () => {
        const event = {
            body: {
                firstname: "",
                password: "",
                email: "",
                repassword: "",
            },
        };
        const res = await handler.signup(event);
        expect(res.body).toBe('{"status":"error","Message":"firstname or password or email or repassword are missing"}');
    });
    test("Request with password and without repassword", async () => {
        const event = {
            body: {
                password: "aaa12345",
                repassword: "",
            },
        };
        const res = await handler.signup(event);
        expect(res.body).toBe('{"status":"error","Message":"password not matching"}');
    });
    test("Request with firstname,password,email,repassword", async () => {
        const event = {
            body: {
                firstname: "aaaa",
                password: "aaa12345",
                email: "aaa@xy.com",
                repassword: "aa12345",
            },
        };
        const res = await handler.signup(event);
        expect(res.body).toBe('{"status":"success","Message":"Successfully Done!"}');
    });
});
describe("inserttask api test", () => {
    test("Request without subject,comments,createdon,assignedto,leademailid,status", async () => {
        const event = {
            body: {
                subject: "",
                comments: "",
                createdon: "",
                assignedto: "",
                leademailid: "",
                status: "",
            },
        };
        const res = await handler.inserttask(event);
        expect(res.body).toBe('{"status":"error","Message":"some fields are missing"}');
    });
    test("Request with subject and without comments,createdon,assignedto,leademailid,status", async () => {
        const event = {
            body: {
                subject: "sai",
                comments: "",
                createdon: "",
                assignedto: "",
                leademailid: "",
                status: "",
            },
        };
        const res = await handler.inserttask(event);
        expect(res.body).toBe('{"status":"error","Message":"task already exist"}');
    });
    test("Request with subject,comments,createdon,assignedto,leademailid,status", async () => {
        const event = {
            body: {
                subject: "sai",
                comments: "exist",
                createdon: "2000-05-05",
                assignedto: "larry",
                leademailid: "larry@12.com",
                status: "2000-05-05",
            },
        };
        const res = await handler.inserttask(event);
        expect(res.body).toBe('{"status":"success","Message":"Successfully inserted!"}');
    });
});
describe("updatetask api test", () => {
    test("Request without tasktitle, comments,createdon,owner,lead,status", async () => {
        const event = {
            body: {
                tasktitle: "",
                comments: "",
                createdon: "",
                owner: "",
                lead: "",
                status: "",
            },
        };
        const res = await handler.updatetask(event);
        expect(res.body).toBe('{"status":"error","Message":"some fields are empty"}');
    });
    
    test("Request  with tasktitle,owner,status and without comments,createdon,lead", async () => {
        const event = {
            body: {
                tasktitle: "raj",
                comments: "",
                createdon: "",
                owner: "loin",
                lead: "",
                status: "2000-03-04",
            },
        };
        const res = await handler.updatetask(event);
        expect(res.body).toBe('{"status":"success","Message":"task updated"}');
    });
    
    test("Request with tasktitle,comments,createdon,owner,lead,status", async () => {
        const event = {
            body: {
                tasktitle: "sai",
                comments: "exist",
                createdon: "2000-05-05",
                owner: "larry",
                lead: "larry@12.com",
                status: "2000-05-05",
            },
        };
        const res = await handler.updatetask(event);
        expect(res.body).toBe('{"status":"error","Message":"task already exist!"}');
    });
});

