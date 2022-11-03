"use strict";

// var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password"
// });

const jwt = require("jsonwebtoken");
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "crm.ciozo2gsp2ag.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "SAZ",
  password: "password",
});

con.connect(async function (err) {
  if (err) throw err;
  console.log("connected!");
});

module.exports.login1 = async (event) => {
  let req = event.body;
  if (req.username == "") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "error",
        Message: "username missing",
      }),
    };
  } else if (req.password == "") {
    return {
      statusCode: 404,
      body: JSON.stringify({
        status: "error",
        Message: "password missing",
      }),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "success",
        Message: "Successfully Done!",
      }),
    };
  }
};

const joi = require("joi");

const loginval = joi.object({
  username: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports.login = async (event) => {
  // const { error, value } = loginval.validate(event.body);
  // if (error) {
  //   console.log("invalid fields");
  // }

  let request = JSON.parse(event.body);
  let username = request.username;
  let password = request.password;
  // let sql =
  //   "SELECT id, txtFirstName, txtPhonenumber FROM crm.tblusers where txtEmail='" +
  //   username +
  //   "' and txtPassword='" +
  //   password +
  //   "';";
  let sql =
    "SELECT A.id, A.txtFirstName, A.txtApprovalstatus, B.txtRole FROM crm2.tblusers A join crm2.tblroles B on A.refJobRole = B.id where txtEmail = '" +
    username +
    "' and txtPassword = '" +
    password +
    "' ;";
  let prom = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result));
      if (result != "") {
        if (result[0].txtApprovalstatus === "Pending") {
          const response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },
            body: "Not approved",
          };
          resolve(response);
        } else {
          const token = jwt.sign(
            { username: username, password: password },
            "secretkey"
          );
          const d = {
            token: token,
            userid: result[0].id,
            username: result[0].txtFirstName,
            jobrole: result[0].txtRole,
          };
          const response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },

            body: JSON.stringify(d),
          };

          resolve(response);
        }
      } else {
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: "incorrect email or password",
        };
        resolve(response);
      }
    });
  });

  return prom;

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.middleware = async (event, context) => {
  console.log("middleware");
  let token = event.headers.token;
  let verified = await new Promise((resolve, reject) => {
    jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) resolve(false);
      resolve(true);
    });
  });
  if (!verified) {
    context.end();
    return { statusCode: 403, body: "Authentication Failed!" };
  }
};

module.exports.signup = async (event) => {
  let request = JSON.parse(event.body);
  let firstname = request.firstname;
  let lastname = request.lastname;
  let email = request.email;
  let password = request.password;
  let repassword = request.repassword;
  let OTP = request.OTP;
  let jobrole = request.jobrole;
  let sql =
    "select txtFirstName,txtEmail from crm2.tblusers where txtEmail= '" +
    email +
    "'";
  let sqlinsert =
    "insert into crm2.tblusers(txtFirstName,txtLastName,txtEmail,txtPassword,txtOTP,refJobRole,txtApprovalstatus) values('" +
    firstname +
    "','" +
    lastname +
    "','" +
    email +
    "','" +
    password +
    "','" +
    OTP +
    "', " +
    jobrole +
    ", 'Pending')";

  let result = await new Promise((resolve, reject) => {
    if (firstname === "") {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: "firstname is mandatory",
      };
      resolve(response);
    } else if (email === "") {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: "email is mandatory",
      };
      resolve(response);
    } else if (jobrole === 0) {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: "jobrole is mandatory",
      };
      resolve(response);
    } else if (password === "") {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: "password is mandatory",
      };
      resolve(response);
    } else if (repassword === "") {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: "repassword is mandatory",
      };
      resolve(response);
    } else if (repassword !== password) {
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: "repassword not match",
      };
      resolve(response);
    } else {
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("result" + JSON.stringify(result));

        if (result != "") {
          const response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },
            body: "email already exists" + JSON.stringify(result),
          };

          resolve(response);
        } else {
          con.query(sqlinsert, function (err, result) {
            if (err) throw err;
            console.log("user added" + JSON.stringify(result));
            const response = {
              statusCode: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
              },
              body: "user added" + JSON.stringify(result),
            };

            resolve(response);
          });
        }
      });
    }
  });
  console.log("last line ");
  return result;
};

module.exports.Verifyotp = async (event) => {
  let request = JSON.parse(event.body);
  let otp = request.enteredOtp;
  let email = request.email;
  let sqlverify =
    "select id from crm.tblusers where txtOTP = '" +
    otp +
    "' and txtEmail = '" +
    email +
    "'";
  // return({body: "test verify otp"+sqlverify})
  let prom = await new Promise((resolve, reject) => {
    con.query(sqlverify, function (err, result) {
      if (err) resolve({ body: err });
      // console.log(result);
      if (result == "" || result == null) {
        resolve({ body: "wrong otp" + JSON.stringify(result) });
      } else {
        resolve({ body: "your verified" });
      }
    });
  });
  return prom;
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.Verifyotp1 = async (event) => {
  let request = JSON.parse(event.body);
  let otp = request.enteredOtp;
  let Email = request.Email;
  let sqlverify =
    "select id from crm.tblusers where txtOTP = '" +
    otp +
    "' and txtEmail = '" +
    Email +
    "';";
  let prom = await new Promise((resolve, reject) => {
    con.query(sqlverify, function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result == "" || result == null) {
        resolve({ body: "wrong otp" + JSON.stringify(result) });
      } else {
        resolve({ body: "your verified" });
      }
    });
  });
  return prom;
};

module.exports.insertsingleprofile = async (event) => {
  let request = JSON.parse(event.body);
  let firstname = request.firstname;
  let email = request.email;
  let password = request.password;
  let phone = request.phone;
  let sql =
    "select txtemail from crm.tblusers where txtEmail =  '" + email + "';";
  let sql1 =
    "insert into crm.dbdata(txtfirstname, txtemail, txtpassword, txtphone) values ('" +
    firstname +
    "','" +
    email +
    "','" +
    password +
    "', '" +
    phone +
    "');";
  let prom = await new Promise((resolve, reject) => {
    if (firstname == "") {
      resolve({ body: "Firstname is empty" });
    } else if (email == "") {
      resolve({ body: "email is empty" });
    } else if (password == "") {
      resolve({ body: "password is empty" });
    } else if (phone == "") {
      resolve({ body: "phone is empty" });
    } else {
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result = " + JSON.stringify(result));
        if (result != "") {
          reject("Profile already exists!");
        } else {
          con.query(sql1, function (err, result) {
            if (err) throw err;
            resolve("Profile Inserted!");
            console.log("New user profile details inserted");
          });
        }
      });
    }
  });
  return prom;
};

module.exports.getsingleprofile = async (event) => {
  let request = JSON.parse(event.body);
  let id = request.id;
  let sql =
    "select txtFirstName, txtLastName, txtEmail from crm.tblusers where id = '" +
    id +
    "';";
  let prom = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Profile information displayed");
      if (result != "") {
        resolve({ body: "Profile Information: " + JSON.stringify(result) });
      } else {
        reject("Profile does not exist");
      }
    });
  });
  return prom;
};

module.exports.UpdateSingleProfile = async (event) => {
  let request = JSON.parse(event.body);
  let id = request.id;
  let sqlget = "select * from crm.tblusers where id = " + id + ";";
  let firstname;
  let email;
  let password;
  let phoneno;
  let firstname1 = request.firstname;
  let email1 = request.email;
  let password1 = request.password;
  let phoneno1 = request.phone;
  let prom = await new Promise((resolve, reject) => {
    con.query(sqlget, function (err, result) {
      if (err) throw err;
      console.log(result);
      firstname = result.txtFirstName;
      email = result.txtEmail;
      password = result.txtPassword;
      phoneno = result.txtPhonenumber;
      // resolve({body: JSON.stringify(result)})
      if (firstname1 == "") {
        reject("firstname is mandatory");
      } else if (email1 == "") {
        reject("email is mandatory");
      } else if (password1 == "") {
        reject("password is mandatory");
      } else if (phoneno1 == "") {
        reject("phone number is mandatory");
      } else {
        firstname = firstname1;
        email = email1;
        password = password1;
        phoneno = phoneno1;
        let sqlupdate =
          "update crm.tblusers set txtFirstName = '" +
          firstname +
          "', txtEmail = '" +
          email +
          "', txtPassword = '" +
          password +
          "', txtPhonenumber = '" +
          phoneno +
          "' where id = " +
          id +
          ";";
        con.query(sqlupdate, function (err, result) {
          if (err) throw err;
          console.log(result);
          resolve("your data is updated");
        });
      }
    });
  });
  return prom;
};

module.exports.GetSingleCampaign = async (event) => {
  let request = JSON.parse(event.body);
  let CampaignName = request.CampaignName;
  let sqlSinglecampaign =
    "SELECT txtCampaignName CampaignName,dtStartdate Startdate,dtEnddate Enddate ,Status1, count(txtCampaignName) NoOfOwners FROM tblcampaign join tblusers where txtCampaignName = '" +
    CampaignName +
    "' group by txtCampaignName;";
  let result = await new Promise((resolve, reject) => {
    con.query(sqlSinglecampaign, function (err, result) {
      if (err) throw err;
      console.log("Selected Campaign Details");
      if (result != "") {
        resolve({
          body:
            "Campaign details for selected Campaign" + JSON.stringify(result),
        });
        return;
      } else {
        reject("Campaign Does Not Exist");
        return;
      }
    });
  });
  return result;
};

module.exports.GetSingleLead = async (event) => {
  let request = JSON.parse(event.body);
  let LeadName = request.LeadName;
  let sqlSingleLead =
    "SELECT tl.txtFirstName FirstName,tl.txtLastName LastName,tl.status1 Status,tl.dtCreatedOn CreatedOn,tl.txtEmail Email,tl.Responses,tu.txtFirstName Owner FROM tblleads tl JOIN tblusers tu on tl.refCreatedBy=tu.id where tl.txtFirstName = '" +
    LeadName +
    "';";
  let result = await new Promise((resolve, reject) => {
    con.query(sqlSingleLead, function (err, result) {
      if (err) throw err;
      console.log("Selected Lead Details");
      if (result != "") {
        resolve({
          body: "Lead details for selected Lead" + JSON.stringify(result),
        });
        return;
      } else {
        reject("LeadName Does Not Exist");
        return;
      }
    });
  });
  return result;
};

module.exports.InsertLead = async (event) => {
  let request = JSON.parse(event.body);
  let suffix = request.suffix;
  let firstname = request.firstname;
  let lastname = request.lastname;
  let company = request.company;
  let phone = request.phone;
  let email = request.email;
  let address = request.address;
  let createdBy = request.createdBy;
  let createdOn = request.createdOn;
  let sqlexist = "select * from crm2.tblleads where txtEmail='" + email + "';";
  let sql =
    "insert into crm2.tblleads(txtSuffix, txtFirstName, txtLastName, txtCompanyName, txtPhone, txtEmail, txtAddress, refCreatedby, dtCreatedOn, status1) VALUES('" +
    suffix +
    "', '" +
    firstname +
    "','" +
    lastname +
    "','" +
    company +
    "','" +
    phone +
    "','" +
    email +
    "','" +
    address +
    "','" +
    createdBy +
    "','" +
    createdOn +
    "', 'Pending');";

  let prom = await new Promise((resolve, reject) => {
    con.query(sqlexist, function (err, result) {
      if (err) resolve({ body: err });
      // console.log("result");
      if (result == "") {
        con.query(sql, function (err, result) {
          if (err) resolve({ body: err });
          // console.log("Added");
          const response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },
            body: "lead has been added",
          };
          resolve(response);
        });
      } else {
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: "email id already exists",
        };
        resolve(response);
      }
    });
  });
  return prom;
};

module.exports.InsertTask1 = async (event) => {
  let request = JSON.parse(event.body)
  let leadid = request.leadid
  let campaignid = request.campaignid
  let userid = request.userid
  let mapid
  let sql3="select id from crm2.tblleadcampaignmap where refLeadId = "+leadid+" and refCampaignId = "+campaignid+"";

  let sql2="SET FOREIGN_KEY_CHECKS=0;";
  let sql1 = "insert into crm2.tblleadcampaignmap(refLeadId, refCampaignId, refCreatedBy) values("+leadid+", "+campaignid+", "+userid+");"
  let prom = await new Promise((resolve, reject) => {
    con.query(sql2, function (err, result) {
      if (err) resolve({ body: "error message2"+err });
    })
  con.query(sql1, function (err, result) {
    if (err) resolve({ body: "error message"+err });
  })
  con.query(sql3, function (err, result) {
    if (err) resolve({ body: "error message2"+err });
    if(result !== ""){
      mapid = result[0].id
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },

        body: JSON.stringify(mapid),
      };
      resolve(response);
    }
  })

  })
  return prom
  }

module.exports.InsertTask = async (event) => {
  let request = JSON.parse(event.body);
  
  let title = request.title;
  let txtcomments = request.txtcomments;
  let activity = request.activity;
  let mapid = request.mapid;

  let sql3 =
      "insert into crm2.tblactivity(txtTitle, txtComments, refMapid, refActivitytype, refConversionStatus) value('" +
      title +
      "', '" +
      txtcomments +
      "', " +
      mapid +
      ", " +
      activity +
      ", 1);";
  
  let prom = await new Promise((resolve, reject) => {
    
    
    con.query(sql3, function (err, result) {
      if (err) resolve({ body: "error message2==>" + err });
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },

        body: "added to db",
      };
      resolve(response);
    });
  });
  return prom;
};

// module.exports.InsertLead = async (event) => {
//   let request = JSON.parse(event.body);
//   let suffix = request.suffix;
//   let firstname = request.firstname;
//   let lastname = request.lastname;
//   let company = request.company;
//   let phone = request.phone;
//   let email = request.email;
//   let address = request.address;
//   let createdBy = request.createdBy;
//   let createdOn = request.createdOn;
//   let sqlexist = "select * from crm.tblleads where txtEmail='" + email + "';";
//   let sql =
//     "insert into crm.tblleads(txtSuffix, txtFirstName, txtLastName, txtCompanyName, txtPhone, txtEmail, txtAddress, refCreatedby, dtCreatedOn) VALUES('" +
//     suffix +
//     "', '" +
//     firstname +
//     "','" +
//     lastname +
//     "','" +
//     company +
//     "','" +
//     phone +
//     "','" +
//     email +
//     "','" +
//     address +
//     "','" +
//     createdBy +
//     "','" +
//     createdOn +
//     "');";

//   let prom = await new Promise((resolve, reject) => {
//     con.query(sqlexist, function (err, result) {
//       if (err) resolve({ body: err });
//       // console.log("result");
//       if (result == "") {
//         con.query(sql, function (err, result) {
//           if (err) resolve({ body: err });
//           // console.log("Added");
//           resolve({ body: "lead has been added" });
//         });
//       } else {
//         resolve({ body: "email id already exists" });
//       }
//     });
//   });

//   return prom;
// };

module.exports.GetSingleTask = async (event) => {
  let request = JSON.parse(event.body);
  let TaskName = request.TaskName;
  let sql =
    "SELECT tt.txtActivitytype, tc.txtConversionType, count(tt.txtActivitytype) as count FROM tblactivity ta JOIN tblactivitytype tt ON ta.refActivitytype = tt.id JOIN tblconversiontype tc ON ta.refConversionStatus = tc.id where tt.txtActivitytype = '" +
    TaskName +
    "';";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result !== "") {
        resolve({ body: "Selected Task Details" + JSON.stringify(result) });
        return;
      } else {
        reject(" Task does not Exist");
        return;
      }
    });
  });
  return result;
};

module.exports.campaignwiseprospectcount = async (event) => {
  let sql =
    "SELECT B.refCampaignId, A.txtCampaignName, D.txtConversionType, count(txtCampaignName) as count FROM tblcampaign A  JOIN tblleadcampaignmap B ON A.id = B.refCampaignId  JOIN  tblactivity C ON B.id = C.refMapid    JOIN  tblconversiontype D ON C.refConversionStatus = D.id  where D.txtConversionType = 'Prospect'  group by A.txtCampaignName;";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result));
      resolve({ body: JSON.stringify(result) });
    });
  });
  return result;
};

module.exports.ManagerwiseProspectCount = async (event) => {
  let sql =
    "SELECT B.txtFirstName, A.txtJobTitle, E.txtConversionType, COUNT(E.txtConversionType) FROM tbljobtitle A JOIN tblusers B ON A.id = B.refJobTitle JOIN tblleadcampaignmap C ON C.refCreatedBy = B.id JOIN tblactivity D ON D.refMapid = C.id JOIN tblconversiontype E ON D.refConversionStatus = E.id WHERE A.txtJobTitle = '% Manager' AND E.txtConversionType = 'Prospect';";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result));
      resolve({ body: JSON.stringify(result) });
    });
  });
  return result;
};

module.exports.leadsfunnel = async (event) => {
  let sql =
    "select count(id) leadscount from crm.tblleads union all SELECT count(d.txtConversionType) as NoOfLeads FROM crm.tblleads a JOIN crm.tblleadcampaignmap b ON a.id = b.refLeadId JOIN crm.tblactivity c ON b.id = c.refMapid JOIN crm.tblconversiontype d ON c.refConversionStatus = d.id where d.txtConversionType = 'Nurturing ' or d.txtConversionType = 'Prospect ' group by d.txtConversionType;";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result));
      resolve({ body: JSON.stringify(result) });
    });
  });
  return result;
};