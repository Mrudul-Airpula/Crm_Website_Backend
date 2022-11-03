'use strict';
var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "crm"
// });
// var con = mysql.createConnection({
//   host: "rds-mysql.cqeomymt3m9r.us-east-1.rds.amazonaws.com",
//   user: "admin",
//   password: "rdsmysql12",
//   database: "crm"
// });
var con = mysql.createConnection({
  host: "crm.ciozo2gsp2ag.us-east-1.rds.amazonaws.com",
  // port: "3306",
  user: "SAZ",
  password: "password",
  database: "crm2"
});

con.connect(function (err) {
  if (err) throw err;
  //console.log("Connected!");
});
//module.exports.login = async (event) => {
// let req = event.body;
// if (req.username == "") {
// return {
//   statusCode: 200,
//   body: JSON.stringify({
//    status: "error",
//    Message: "username missing",
//  }),
// };
//} else if (req.password == "") {
//  return {
//   statusCode: 200,
//  body: JSON.stringify({
//   status: "error",
//  Message: "password missing",
// }),
// };
//} else {
// return {
//   statusCode: 200,
//   body: JSON.stringify({
//     status: "success",
//     Message: "Successfully Done!",
//   }),
// };
// }
//};
// module.exports.signup = async (event) => {
//   let req = event.body;
//   if ((req.firstname == "") & (req.password == "") & (req.email == "") & (req.repassword == "")) {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         status: "error",
//         Message: "firstname or password or email or repassword are missing",
//       }),
//     };
//   } else if ((req.repassword == "")) {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         status: "error",
//         Message: "password not matching",
//       }),
//     };
//   } else {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         status: "success",
//         Message: "Successfully Done!",
//       }),
//     };
//   }
// };
// module.exports.inserttask = async (event) => {
//   let req = event.body;
//   if ((req.subject == "") & (req.comments == "") & (req.createdon == "") & (req.assignedto == "") & (req.leademailid == "") & (req.status == "")) {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         status: "error",
//         Message: "some fields are missing",
//       }),
//     };
//   } else if ((req.comments == "") & (req.createdon == "") & (req.assignedto == "") & (req.leademailid == "") & (req.status == "")) {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         status: "error",
//         Message: "task already exist",
//       }),
//     };
//   } else {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         status: "success",
//         Message: "Successfully inserted!",
//       }),
//     };
//   }
// };
// module.exports.updatetask = async (event) => {
//   let req = event.body;
//   if ((req.tasktitle == "") & (req.comments == "") & (req.createdon == "") & (req.owner == "") & (req.lead == "") & (req.status == "")) {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         status: "error",
//         Message: "some fields are empty",
//       }),
//     };
//   }
//   else if ((req.comments == "") || (req.createdon == "") || (req.lead == "")) {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         status: "success",
//         Message: "task updated",
//       }),
//     };
//   } else {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         status: "error",
//         Message: "task already exist!",
//       }),
//     };
//   }
// };

// const jwt = require("jsonwebtoken");
// module.exports.middleware = async (event, context) => {
//   console.log("middleware");
//   //let token = event.headers.token;
//   let verified = await new Promise((resolve, reject) => {
//     jwt.verify(event.headers.token, "secretkey", (err, decoded) => {
//       if (err) resolve(false);
//       else resolve(true);
//     });
//   });
//   if (!verified) {
//     context.end();
//     return { statusCode: 403, body: "Authentication Failed!" };
//   }
// };
// module.exports.loginapi = async (event) => {
//   let request = JSON.parse(event.body)
//   let email = request.Email;
//   let password = request.Password;
//   let sql = "SELECT id, txtEmail FROM tblusers where txtEmail='" + email + "' and txtPassword='" + password + "'";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       if (result != "") {
//         const token = jwt.sign({ email: email, password: password }, "secretkey");
//         resolve({ body: JSON.stringify(token) });
//         console.log("Login Success:" + JSON.stringify(result));

//       }
//       else if (password == "" || email == "") {
//         reject("Both the fields are mandatory");
//       } else {
//         reject("Login details incorrect!");
//       }
//     });
//   });
//   return result;
// };
// module.exports.loginapi = async (event) => {
//   //let request = JSON.parse(event.body);
//   let req = event.body;
//   let username = req.username;
//   let password = req.password;
//   let sql =
//     "SELECT txtEmail,txtPassword FROM tblusers where txtEmail='" + username + "' and txtPassword='" + password + "';";
//   let result = await new Promise((resolve, reject) => {
//     if (username ==""){
//       resolve({ body: JSON.stringify( {status : "error", Message: "username missing"}) })
//       return
//     }
//     if (password ==""){
//       resolve({ body: JSON.stringify( {status : "error", Message: "password missing"}) })
//       return
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result: " + JSON.stringify(result));
//       if (result != "") {
//         reject("username or password is incorrect");
//       } else {
//         const token = jwt.sign(
//           { username: username, password: password }, "secretkey");
//         resolve({ body: "Success: " + JSON.stringify(token) });
//       }
//     });
//   });
//   return result;
// };
// module.exports.signupapi = async (event) => {
//   let request = JSON.parse(event.body);
//   let firstname = request.firstname;
//   let lastname = request.lastname;
//   let email = request.email;
//   let password = request.password;
//   //let repassword = request.repassword;
//   let OTP = request.OTP;
//   let sql = "select txtFirstName,txtEmail from tblusers where txtEmail= '" + email + "'";
//   let sqlinsert = "insert into tblusers(txtFirstName,txtLastName,txtEmail,txtPassword,txtOTP) values('" + firstname + "','" + lastname + "','" + email + "','" + password + "','" + OTP + "')";



//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("result" + JSON.stringify(result));
//       if (result != "") {
//         resolve("email already exists" + JSON.stringify(result))
//       }
//       else {
//         con.query(sqlinsert, function (err, result) {
//           if (err) throw err;
//           console.log("user added" + JSON.stringify(result));
//           resolve("user added" + JSON.stringify(result));
//         })
//       }
//     });
//   }
//   )
//   console.log("last line ");
//   return result;

// };

// module.exports.verifyotp = async (event) => {
//   let request = JSON.parse(event.body);
//   let OTP = request.OTP;
//   let email = request.email;


//   let sql = "select id,txtOTP,txtEmail from tblusers where  txtEmail='" + email + "'";
//   let sqlupdate = "update tblusers set txtDeleteflag=1 where id=36 and txtOTP='" + OTP + "'";

//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       if (result == "") {
//         resolve("Incorrect OTP")
//       }
//       else {
//         con.query(sqlupdate, function (err, result) {
//           if (err) throw err;
//           console.log("updated" + JSON.stringify(result));
//           resolve("verify and updated" + JSON.stringify(result));


//         });
//       }
//     });


//   });
//   console.log("last line ");
//   return result;

// }

// module.exports.resend = async (event) => {
//   let request = JSON.parse(event.body);
//   let OTP = request.OTP;
//   let email = request.email;

//   let sqlupdate = "update tblusers set txtOTP='" + OTP + "' where id=36";
//   let sql = "select id,txtOTP,txtEmail from tblusers where  txtEmail='" + email + "'";
//   let result = await new Promise((resolve, reject) => {

//     con.query(sqlupdate, function (err, result) {
//       if (err) throw err;
//       console.log("otp updated" + JSON.stringify(result));


//      ///// //resolve("otp  updated" + JSON.stringify(result));


//     });

//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       if (result == "") {
//         resolve("incorrect otp")
//       } else {
//         {
//           resolve("verify" + JSON.stringify(result));
//         }
//       }
//     });
//   });
// }


//////////module.exports.login = async (event) => {
// let request = JSON.parse(event.body);
//  let req = event.body;
//let username = req.username;
//let password = req.password;

// let sql = "select id,txtFirstName,txtEmail from tblusers where txtFirstName ='" + username + "' and txtPassword='" + password + "'";

// let result = await new Promise((resolve, reject) => {
//  if (username ==""){
//    resolve({ body: JSON.stringify( {status : "error", Message: "username missing"}) })
//    return
//  }
//  if (password ==""){
//    resolve({ body: JSON.stringify( {status : "error", Message: "password missing"}) })
//    return
//  }
//  con.query(sql, function (err, result) {
//    if (err) throw err;
//    console.log("Result: " + JSON.stringify(result));

//    if (result != "") {
//      const token = jwt.sign({ username: username, password: password }, "secretkey");
//      resolve({ body: JSON.stringify(token) });
//    }
//    else {
//      reject("Login details incorrect");
//    }

//  });
// });
// return result;
//};
// module.exports.insertprofile = async (event) => {
//   let request = JSON.parse(event.body);
//   let FirstName = request.firstName;
//   let Lastname = request.Lastname;
//   let Email = request.Email;
//   let Dob = request.Dob;
//   let Address = request.Address;
//   let Repassword = request.Repassword;
//   let Password = request.Password;
//   let sql = "select txtEmail from tblusers where txtEmail =  '" + Email + "';"
//   let sql1 = "insert into tblusers(txtFirstName,txtLastName,txtEmail,txtdob,txtaddress,txtPassword) values ('" + FirstName + "','" + Lastname + "','" + Email + "','" + Dob + "','" + Address + "','" + Password + "');"
//   let result = await new Promise((resolve, reject) => {
//     if (FirstName == "") {
//       resolve("Firstname is mandatory")
//       return
//     }

//     if (Email == "") {
//       reject("Email is mandatory")
//       return
//     }
//     if (Dob == "") {
//       reject("dob is mandatory")
//       return
//     }
//     if (Address == "") {
//       reject("address is mandatory")
//       return
//     }
//     if (Password == "") {
//       reject("Password is mandatory")
//       return
//     }
//     if (Repassword == "") {
//       reject("Repassword is mandatory")
//       return
//     }
//     if (Password != Repassword) {
//       reject("Password do not match")
//       return
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result = " + JSON.stringify(result))
//       if (result != "") {
//         reject("Profile already exists!")
//         //resolve({ body: JSON.stringify(result) });
//         return
//       }
//       else {
//         con.query(sql1, function (err, result) {
//           if (err) throw err;
//           reject("Profile Inserted!")
//           console.log("New user profile details inserted")
//           return
//         });
//       }
//     });
//   });

// };
// module.exports.campaignwiseproscount = async (event) => {
//   let request = JSON.parse(event.body);
//   let sql = "SELECT B.refCampaignId, A.txtCampaignName, D.txtConversionType, count(txtCampaignName) as count FROM tblcampaign A  JOIN tblleadcampaignmap B ON A.id = B.refCampaignId  JOIN  tblactivity C ON B.id = C.refMapid    JOIN  tblconversiontype D ON C.refConversionStatus = D.id  where D.txtConversionType = 'Prospect '  group by A.txtCampaignName;"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result: ");
//       resolve({ body: "result" + JSON.stringify(result) })
//     });
//   });
//   return result;
// };


/////getprofile/////////////////////////////////////////
module.exports.getprofile = async (event) => {
  let request = JSON.parse(event.body);
  let id = request.id;
  let sql = "select txtaddress,txtdob,txtFirstName,txtLastName,txtEmail,txtPassword from tblusers where id  = '" + id + "';"
  let res = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Profile  displayed")

      if (result != "") {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body: JSON.stringify(result)
        };
        //console.log("Profile  displayed")

        resolve(response)
        return
      }
      else {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body: "Profile Not Exists" + JSON.stringify(result)
        };
        resolve(response)
        return
      }
    });
  });
  return res;
};


// module.exports.updateprofile = async (event) => {
//   // return ({body:"test"})
//   let request = JSON.parse(event.body);
//   let FirstName = request.FirstName;
//   let LastName = request.LastName;
//   let Email = request.Email;
//   let Dob = request.Dob;
//   let Address = request.Address;
//   let Password = request.Password;
//   let ConfirmPassword = request.ConfirmPassword;
//   let id = request.id;
//   let sql = "select id,txtaddress,txtdob,txtFirstName,txtLastName,txtEmail,txtPassword from tblusers where txtEmail= '" + Email + "'";
//   let sqlupdate = "update tblusers set txtFirstName='" + FirstName + "', txtLastName='" + LastName + "', txtdob='" + Dob + "', txtaddress='" + Address + "', txtPassword='" + Password + "',txtEmail='" + Email + "' where id='" + id + "'";
//   // return ({body:"test"+sqlupdate})
//   let res = await new Promise((resolve, reject) => {
//     if (FirstName == "") {
//       const response = {
//         statusCode: 200,
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Credentials': true,
//         }, body: "FirstName is mandatory"
//       };
//       resolve(response);
//       //resolve("Firstname is mandatory")
//       return
//     }

//     else if (Email == "") {
//       const response = {
//         statusCode: 200,
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Credentials': true,
//         }, body: "Email is mandatory"
//       };
//       resolve(response);
//       // resolve("Email is mandatory")
//       return
//     }
//     else if (Dob == "") {
//       const response = {
//         statusCode: 200,
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Credentials': true,
//         }, body: "dob is mandatory"
//       };
//       resolve(response);
//       // resolve("dob is mandatory")
//       return
//     }
//     else if (Address == "") {
//       const response = {
//         statusCode: 200,
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Credentials': true,
//         }, body: "address is mandatory"
//       };
//       resolve(response);
//       //resolve("address is mandatory")
//       return
//     }
//     else if (Password == "") {
//       const response = {
//         statusCode: 200,
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Credentials': true,
//         }, body: "Password is mandatory"
//       };
//       resolve(response);
//       //resolve("Password is mandatory")
//       return
//     }
//     else if (ConfirmPassword == "") {
//       const response = {
//         statusCode: 200,
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Credentials': true,
//         }, body: "ConfirmPassword is mandatory"
//       };
//       resolve(response);
//       //resolve("ConfirmPassword is mandatory")
//       return
//     }
//     else if (Password != ConfirmPassword) {
//       const response = {
//         statusCode: 200,
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Credentials': true,
//         }, body: "Password do not match"
//       };
//       resolve(response);
//       // resolve("Password do not match")
//       return
//     }

//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);

//       if (result != "") {
//         const response = {
//           statusCode: 200,
//           headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Credentials': true,
//           }, body: "Profile already Exists" + JSON.stringify(result)
//         };
//         resolve(response);
//       }
//       // });
//       else {
//         con.query(sqlupdate, function (err, result) {
//           if (err) throw err;
//           console.log("updated" + result);
//           const response = {
//             statusCode: 200,
//             headers: {
//               'Access-Control-Allow-Origin': '*',
//               'Access-Control-Allow-Credentials': true,
//             }, body: JSON.stringify(result)
//           };
//           //resolve("updated")
//           resolve(response)

//         });
//       }

//     });

//     return res;
//     //return ({body:"test"+sqlupdate})
//   });
// };
/*//   if (FirstName == "") {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       }, body: "FirstName is mandatory"
//     };
//     resolve(response);
//     resolve("Firstname is mandatory")
//     //return
//   }
 
//  else if (Email == "") {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       }, body: "Email is mandatory"
//     };
//     resolve(response);
//     resolve("Email is mandatory")
//     //return
//   }
//   else if (Dob == "") {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       }, body: "dob is mandatory"
//     };
//     resolve(response);
//     resolve("dob is mandatory")
//     //return
//   }
//   else if (Address == "") {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       }, body:"address is mandatory"
//     };
//     resolve(response);
//     resolve("address is mandatory")
//     //return
//   }
//   else  if (Password == "") {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       }, body: "Password is mandatory"
//     };
//     resolve(response);
//     resolve("Password is mandatory")
//     //return
//   }
//   else  if (ConfirmPassword == "") {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       }, body: "ConfirmPassword is mandatory"
//     };
//     resolve(response);
//     resolve("ConfirmPassword is mandatory")
//     //return
//   }
//   else if (Password != ConfirmPassword) {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       }, body: "Password do not match"
//     };
//     resolve(response);
//     resolve("Password do not match")
//     //return
//   }
 
//   });
//   return res;
//   //return ({body:"test"+sqlupdate})
// }
 
 
// module.exports.addtask = async (event) => {
//   let request = JSON.parse(event.body);
//   let tasktitle = request.tasktitle;
//   let txtcomments = request.txtcomments;
//   let dtCreatedOn = request.dtCreatedOn;
//   let txtowner = request.txtowner;
//   let Status = request.Status;
//   let LeadEmail = request.LeadEmail;
 
//   let sql1 = "insert into tblactivity (tasktitle,txtComments,dtCreatedOn,txtowner,LeadEmail,Status) values ('" + tasktitle + "', '" + txtcomments + "','" + dtCreatedOn + "','" + txtowner + "','" + LeadEmail + "','" + Status + "');"
//   // return ({body:"test"+sql1})
//   let result = await new Promise((resolve, reject) => {
 
//     if (tasktitle === "") {
//       resolve("tasktitle is empty")
//       return
//     }
//     if (txtcomments === "") {
//       resolve("txtcomments is empty")
//       return
//     }
//     if (dtCreatedOn === "") {
//       resolve("dtCreatedOn is empty")
//       return
//     }
//     if (txtowner === "") {
//       resolve("txtowner is empty")
//     }
 
//     if (Status === "") {
//       resolve("Status is empty")
//     }
 
//     if (LeadEmail === "") {
//       resolve("LeadEmail is empty")
//     }
 
 
//     con.query(sql1, function (err, result) {
//       if (err) throw err;
//       console.log("Result = " + JSON.stringify(result))
//       resolve("Task Inserted!")
//       console.log("New task  details inserted")
//       const response = {
//         statusCode: 200,
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Credentials': true,
//         }, body: JSON.stringify(result)
//       };
 
//       return
//     });
//   }
 
//   );
//   return result;
// };
 
 
// module.exports.managerwisepcount = async (event) => {
//   let request = JSON.parse(event.body);
//   let Jobrole = request.Jobrole;
//   let sql = "select A.txtJobTitle,B.txtFirstName,E.txtconversiontype,count(E.txtConversionType) count from tbljobtitle A join tblusers B on B.refJobTitle=A.id  join tblleadcampaignmap C on B.refCreatedBy=C.id join tblactivity D on D.refMapid=C.id join tblconversiontype E on D.refConversionStatus=E.id where txtJobTitle='" + Jobrole + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       resolve({ body: JSON.stringify(result) });
//     });
//   });
//   return result;
// };
 
// module.exports.salespersonsuccessrate = async (event) => {
//   let request = JSON.parse(event.body);
//   let Prospect = request.Prospect;
//   let sql = "SELECT tm.refLeadId,tl.txtFirstName,tc.txtConversionType, count(tl.txtFirstName) FROM tblleads tl JOIN tblleadcampaignmap tm ON tl.id = tm.refLeadId JOIN tblactivity ta ON tm.id = ta.refMapid JOIN tblconversiontype tc ON tc.id = ta.refConversionStatus WHERE tc.txtConversionType = '" + Prospect + "' group by tl.txtFirstName;"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err
//       console.log(result)
//       resolve({ body: JSON.stringify(result) });
//     });
//   });
//   return result;
// };
// module.exports.getcampaign = async (event) => {
//   let request = JSON.parse(event.body);
//   let txtCampaignName = request.txtCampaignName;
//   let sql = "SELECT txtCampaignName CampaignName,dtStartdate Startdate,dtEnddate Enddate , count(txtCampaignName) NoOfOwners FROM tblcampaign join tblusers where txtCampaignName = '" + txtCampaignName + "' group by txtCampaignName;";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("required campaign info");
//       if (result != "") {
//         resolve({ body: "Campaign info of  selected Campaign" + JSON.stringify(result) })
//         return
//       }
//       else {
//         reject("campaign not exist")
//         return
//       }
//     });
//   });
//   return result;
// };
// module.exports.insertcampaign = async (event) => {
//   let request = JSON.parse(event.body);
//   let Campaignname = request.Campaignname;
//   let Producttype = request.Producttype;
//   let Startdate = request.Startdate;
//   let Enddate = request.Enddate;
//   let Createdon = request.Createdon;
//   let sql = "insert into tblcampaign(txtCampaignName,refProducttype,dtStartdate,dtEnddate,dtCreatedOn) values('" + Campaignname + "','" + Producttype + "','" + Startdate + "','" + Enddate + "','" + Createdon + "');";
//   let result = await new Promise((resolve, reject) => {
//     if (Campaignname == "") {
//       resolve("Campaignname is mandatory")
//       return
//     }
 
//     if (Producttype == "") {
//       resolve("Producttype is mandatory")
//       return
//     }
//     if (Startdate == "") {
//       resolve("Startdate is mandatory")
//       return
//     }
//     if (Enddate == "") {
//       resolve("Enddate is mandatory")
//       return
//     }
//     if (Createdon == "") {
//       resolve("Createdon is mandatory")
//     }
//     else {
//       reject("Campaign Added Successfully")
//     }
//   });
 
// };
// module.exports.updatecampaign = async (event) => {
//   let request = JSON.parse(event.body);
//   let campname = request.campname;
//   let id = request.id;
//   let sql = "select txtCampaignName  from tblcampaign where id= '" + id + "'";
//   let sqlupdate = "update tblcampaign  set txtCampaignName='" + campname + "'    where id='" + id + "'";
//   let result = await new Promise((resolve, reject) => {
//     if (campname == "") {
//       resolve("campname is mandatory");
//       return res
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       if (result != "") {
//         resolve("already exist");
//       }
//     });
//     con.query(sqlupdate, function (err, result) {
//       if (err) throw err;
//       console.log("updated" + result);
//       resolve({ body: JSON.stringify(result) });
//     });
//   });
//   return result;
// };
// module.exports.getlead = async (event) => {
//   let request = JSON.parse(event.body);
//   let id = request.id;
//   let sql = "select txtFirstName,txtCompanyName,txtEmail,txtPhone,txtAddress from tblleads where id = '" + id + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("result");
//       if (result != "") {
//         resolve({ body: "Lead Exist" + JSON.stringify(result) })
//         return
//       }
//       else {
//         reject("Lead not exist")
//         return
//       }
//     });
//   });
//   return result;
// };
// module.exports.insertlead = async (event) => {
//   let request = JSON.parse(event.body);
//   let firstname = request.firstname;
//   let Companyname = request.Companyname;
//   let email = request.email;
//   let Phone = request.Phone;
//   let address = request.address;
//   let sql = "select txtEmail from tblleads where txtEmail =  '" + email + "';"
//   let sql1 = "insert into tblleads(txtFirstName,txtCompanyName,txtEmail,txtPhone,txtAddress) values ('" + firstname + "','" + Companyname + "','" + email + "','" + Phone + "','" + address + "');"
//   let result = await new Promise((resolve, reject) => {
//     if (firstname == "") {
//       resolve("Firstname is mandatory")
//       return
//     }
//     if (Companyname == "") {
//       resolve("Companyname is mandatory")
//       return
//     }
//     if (email == "") {
//       resolve("Email is mandatory")
//       return
//     }
//     if (Phone == "") {
//       resolve("Phone is mandatory")
//       return
//     }
//     if (address == "") {
//       resolve("address is mandatory")
//       return
//     }
    // con.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("Result = " + JSON.stringify(result))
    //   if (result != "") {
    //     resolve("Profile already exists!")
    //     return
    //   }
    //   else {
    //     con.query(sql1, function (err, result) {
    //       if (err) throw err;
    //       reject("Profile Inserted!")
    //       console.log("New user profile details inserted")
    //       return
    //     });
    //   }
    // });
//   });
// };
// module.exports.updatelead = async (event) => {
//   let request = JSON.parse(event.body);
//   let firstname = request.firstname;
//   let email = request.email;
//   let id = request.id;
//   let sql = "select id,txtFirstName,txtEmail from tblleads where txtEmail= '" + email + "'";
//   let sqlupdate = "update tblleads   set txtEmail='" + email + "'    where id='" + id + "'";
//   let result = await new Promise((resolve, reject) => {
//     if (firstname == "") {
//       resolve("firstname is mandatory");
//       return res
//     }
//     if (email == "") {
//       resolve("email is mandatory");
//       return res
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       if (result != "") {
//         resolve("already exist");
//       }
//     });
//     con.query(sqlupdate, function (err, result) {
//       if (err) throw err;
//       console.log("updated" + result);
//       resolve({ body: JSON.stringify(result) });
//     });
//   });
//   return result;
// };
// module.exports.prospectGrowth = async (event) => {
//   let sql = "SELECT d.txtConversionType, COUNT(d.txtConversionType) as count FROM crm.tblleads a JOIN crm.tblleadcampaignmap b ON a.id = b.refLeadId JOIN crm.tblactivity c ON b.id = c.refMapid JOIN crm.tblconversiontype d ON c.refConversionStatus = d.id WHERE d.txtConversionType = 'Prospect';";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err
//       console.log(JSON.stringify(result))
//       resolve({ body: JSON.stringify(result) })
//     });
//   });
//   return result;
// };
// module.exports.prospectprogress = async (event) => {
//   let sql = "select tct.txtconversiontype,tpt.txtProgresstype from tblactivity ta join tblconversiontype tct on ta.refConversionStatus=tct.id join tblprogresstype tpt on ta.refProgressStatus=tpt.id where tct.txtconversiontype='Prospect ';";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err
//       console.log(JSON.stringify(result))
//       resolve({ body: JSON.stringify(result) })
//     });
//   });
//   return result;
// };
// module.exports.leadsfunnel = async (event) => {
//   let sql = "select count(id) leadscount from crm.tblleads union all SELECT count(d.txtConversionType) as NoOfLeads FROM crm.tblleads a JOIN crm.tblleadcampaignmap b ON a.id = b.refLeadId JOIN crm.tblactivity c ON b.id = c.refMapid JOIN crm.tblconversiontype d ON c.refConversionStatus = d.id where d.txtConversionType = 'Nurturing ' or d.txtConversionType = 'Prospect ' group by d.txtConversionType;";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(JSON.stringify(result))
//       resolve({ body: JSON.stringify(result) })
//     });
//   });
//   return result;
// }
// module.exports.getCampaignlistwithfilter = async (event) => {
//   let request = JSON.parse(event.body);
//   let value_filter = request.value_filter;
//   let filtername = request.filtername;
//   let sql = "select A.id,C.txtFirstName,B.txtCampaignName from tblleadcampaignmap A join tblcampaign B on A.refCampaignId=B.id join tblleads C on A.refLeadId=C.id  where " + value_filter + "='" + filtername + "' or " + value_filter + " like '" + filtername + "';";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result" + result);
//       resolve({ body: JSON.stringify(result) })
//     })
//   })
//   return result;
// }
// module.exports.getProspectlistwithfilter = async (event) => {
//   let request = JSON.parse(event.body);
//   let value_filter = request.value_filter;
//   let filtername = request.filtername;
//   let sql = " select D.id,D.txtFirstName,D.txtCompanyName,D.txtEmail,B.txtConversionType from tblactivity A join tblconversiontype B on A.refConversionStatus=B.id join tblleadcampaignmap C on A.refMapid =C.id join tblleads D on C.refLeadId=D.id where " + value_filter + "='" + filtername + "' or " + value_filter + " like '" + filtername + "';";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result" + result);
//       resolve({ body: JSON.stringify(result) })
//     })
//   })
//   return result;
// };
 
// module.exports.updateprofile = async (event) => {
//   // return ({body:"test"})
//   let request = JSON.parse(event.body);
//   let FirstName = request.FirstName;
//   let LastName = request.LastName;
//   let Email = request.Email;
//   let Dob = request.Dob;
//   let Address = request.Address;
//   let Password = request.Password;
//   let ConfirmPassword = request.ConfirmPassword;
//   let id = request.id;
//   let sql = "select id,txtaddress,txtdob,txtFirstName,txtLastName,txtEmail,txtPassword from tblusers where txtEmail= '" + Email + "'";
//   let sqlupdate = "update tblusers set txtFirstName='" + FirstName + "', txtLastName='" + LastName + "', txtdob='" + Dob + "', txtaddress='" + Address + "', txtPassword='" + Password + "',txtEmail='" + Email + "' where id='" + id + "'";
//   // return ({body:"test"+sqlupdate})
//   let res = await new Promise((resolve, reject) => {
 
//     if (FirstName == "") {
//       resolve("Firstname is mandatory")
//       return
//     }
 
//     if (Email == "") {
//       reject("Email is mandatory")
//       return
//     }
//     if (Dob == "") {
//       reject("dob is mandatory")
//       return
//     }
//     if (Address == "") {
//       reject("address is mandatory")
//       return
//     }
//     if (Password == "") {
//       reject("Password is mandatory")
//       return
//     }
//     if (ConfirmPassword == "") {
//       reject("ConfirmPassword is mandatory")
//       return
//     }
//     if (Password != ConfirmPassword) {
//       resolve("Password do not match")
//       return
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
  
//       if (result != "") {
//         const response = {
//           statusCode: 200,
//           headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Credentials': true,
//           }, body: JSON.stringify(result)
//         };
//         reject("already exist");
//       }
//     });
//     con.query(sqlupdate, function (err, result) {
//       if (err) throw err;
//       console.log("updated" + result);
//       const response = {
//         statusCode: 200,
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Credentials': true,
//         }, body: JSON.stringify(result)
//       };
//       resolve("updated")
//       resolve({ body: JSON.stringify(result) })
//     });
//   });
//   return res;*/


module.exports.updateprofile = async (event) => {
  let request = JSON.parse(event.body);
  let FirstName = request.FirstName;
  let LastName = request.LastName;
  let Email = request.Email;
  let Address = request.Address;
  let Dob = request.Dob;
  let Password = request.Password;
  let ConfirmPassword = request.ConfirmPassword;
  let id = request.id;
  let sql = "select id,txtaddress,txtdob,txtFirstName,txtLastName,txtEmail,txtPassword from tblusers where txtEmail= '" + Email + "'";
  let sqlupdate = "update tblusers set txtFirstName='" + FirstName + "', txtLastName='" + LastName + "', txtdob='" + Dob + "', txtaddress='" + Address + "', txtPassword='" + Password + "',txtEmail='" + Email + "' where id='" + id + "'";



  let result = await new Promise((resolve, reject) => {

    if (FirstName == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: "Firstname is mandatory"
      };
      resolve(response)
      return
    }
    if (Email == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: "Email is mandatory"
      };
      resolve(response)
      return
    }
    if (Password == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: "Password is mandatory"
      };
      resolve(response)
      return
    }
    if (ConfirmPassword == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: "ConfirmPassword is mandatory"
      };
      resolve(response)
      return
    }
    if (Dob == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: "Dob is mandatory"
      };
      resolve(response)
      return
    }
    if (Address == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: "Address is mandatory"
      };
      resolve(response)
      return
    }

    if (ConfirmPassword != Password) {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: "ConfirmPassword not match"
      };
      resolve(response)
      return
    }

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("result" + JSON.stringify(result));

      if (result != "") {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body: "Email already exist" 
        };

        resolve(response)
      }
      else {
        con.query(sqlupdate, function (err, result) {
          if (err) throw err;
          console.log("Profile Updated!" + JSON.stringify(result));
          const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            }, body: "Profile Updated!" 
          };

          resolve(response);
        })
      }
    });
  }
  )
  console.log("last line ");
  return result;

};

// module.exports.updateprofile = async (event) => {
// let request = JSON.parse(event.body);
// let FirstName = request.FirstName;
// let LastName = request.LastName;
// let Email = request.Email;
// let Address = request.Address;
// let Dob = request.Dob;
// let Password = request.Password;
// let ConfirmPassword = request.ConfirmPassword;
// let id = request.id;
// let sql = "select id,txtaddress,txtdob,txtFirstName,txtLastName,txtEmail,txtPassword from tblusers where txtEmail= '" + Email + "'";
// let sqlupdate = "update tblusers set txtFirstName='" + FirstName + "', txtLastName='" + LastName + "', txtdob='" + Dob + "', txtaddress='" + Address + "', txtPassword='" + Password + "',txtEmail='" + Email + "' where id='" + id + "'";



// let result = await new Promise((resolve, reject) => {

//   if (FirstName == "") {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       }, body: "firstname is mandatory"
//     };
//     resolve(response)
//     return
//   }
//   else if (Email == "") {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       }, body: "email is mandatory"
//     };
//     resolve(response)
//     return
//   }
//   else if (Password == "") {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       }, body: "password is mandatory"
//     };
//     resolve(response)
//     return
//   }
//   else if (ConfirmPassword == "") {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       }, body: "ConfirmPassword is mandatory"
//     };
//     resolve(response)
//     return
//   }
//   else if (Dob == "") {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       }, body: "Dob is mandatory"
//     };
//     resolve(response)
//     return
//   }
//   else if (Address == "") {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       }, body: "Address is mandatory"
//     };
//     resolve(response)
//     return
//   }

//   else if (ConfirmPassword != Password) {
//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       }, body: "ConfirmPassword not match"
//     };
//     resolve(response)
//     return
//   }

//   else {
//     con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("result" + JSON.stringify(result));

//     if (result != "") {
//       const response = {
//         statusCode: 200,
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Credentials': true,
//         }, body: "email already exists"
//       };

//       resolve(response)
//     }
//     //});
//     else {
//       con.query(sqlupdate, function (err, result) {
//         if (err) throw err;
//         //console.log("user updated" + JSON.stringify(result));
//         const response = {
//           statusCode: 200,
//           headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Credentials': true,
//           }, body: "Profile Updated!"
//         };

//         resolve(response);
//       })
//     }
//   });}
// }
// )
// console.log("last line ");
// return result;

// };