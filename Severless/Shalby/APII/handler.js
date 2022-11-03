'use strict';
const { resolve, reject } = require("bluebird");

var mysql = require("mysql");

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Password",
//   database: "crm"
// });


// var con = mysql.createConnection({
//   host: "database-1.cptxxicj99bg.us-east-1.rds.amazonaws.com",
//   user: "admin",
//   password: "Password",
//   database: "crm"
// });


var con = mysql.createConnection({
  host: "crm.ciozo2gsp2ag.us-east-1.rds.amazonaws.com",
  //port:"3306",
  user: "SAZ",
  password: "password",
  database: "crm",
});


con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// const jwt = require("jsonwebtoken");
// const { result } = require("lodash");
// module.exports.middleware = async (event, context) => {
//   console.log("middleware");
//   let token = event.headers.token;
//   let verified = await new Promise((resolve, reject) => {
//     jwt.verify(token, "secretkey", (err, decoded) => {
//       if (err) resolve(false);
//       resolve(true);
//     });
//   });
//   if (!verified) {
//     context.end();
//     return { statusCode: 403, body: "Authentication Failed!" };
//   }
// };





// module.exports.Loginn = async (event) => {
//   let request = JSON.parse(event.body)
//   let email = request.email;
//   let password = request.password;
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



// module.exports.signup = async (event) => {
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

//       //resolve("otp  updated" + JSON.stringify(result));
//     });

//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       if (result == "") {
//         resolve("incorrect otp")
//       } else {
//         resolve("verify" + JSON.stringify(result))
//       }
//     });
//   });

//   return result;

// }


// module.exports.getprofile = async (event) => {
//   let request = JSON.parse(event.body);
//   let id = request.id;
//   let sql = "select txtSuffix,txtFirstName,txtLastName,txtEmail,txtPassword from tblusers where id  = '" + id + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Profile  displayed")

//       if (result != "") {
//         resolve({ body: JSON.stringify(result) })
//         return
//       }
//       else {
//         reject("Profile does not exist")
//         return
//       }
//     });
//   });
//   return result;
// };


// module.exports.insertprofile = async (event) => {
//   let request = JSON.parse(event.body);
//   let firstname = request.firstname;
//   let lastname = request.lastname;
//   let email = request.email;
//   let password = request.password;

//   let sql = "select txtEmail from tblusers where txtEmail =  '" + email + "';"
//   let sql1 = "insert into tblusers(txtFirstName,txtLastName,txtEmail,txtPassword) values ('" + firstname + "','" + lastname + "','" + email + "','" + password + "');"
//   let result = await new Promise((resolve, reject) => {
//     if (firstname == "") {
//       resolve("Firstname is empty")
//       return
//     }
//     if (lastname == "") {
//       resolve("Lastname is empty")
//       return
//     }
//     if (email == "") {
//       resolve("Email is empty")
//       return
//     }
//     if (password == "") {
//       resolve("Password is empty")
//       return
//     }

//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result = " + JSON.stringify(result))
//       if (result != "") {
//         resolve("Profile already exists!")
//         //resolve({ body: JSON.stringify(result) });
//         return
//       }
//       else {
//         con.query(sql1, function (err, result) {
//           if (err) throw err;
//           resolve("Profile Inserted!")
//           console.log("New user profile details inserted")
//           return
//         });
//       }
//     });
//   });
//   return result;
// };


// module.exports.updateprofile = async (event) => {
//   let request = JSON.parse(event.body);
//   let email = request.email;
//   let id = request.id;
//   let sql = "select id,txtFirstName,txtEmail from tblusers where txtEmail= '" + email + "'";
//   let sqlupdate = "update tblusers    set txtEmail='" + email + "'    where id='" + id + "'";
//   let result = await new Promise((resolve, reject) => {

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

// module.exports.getuserprofilefilter = async (event) => {
//   let request = JSON.parse(event.body);
//   let value_filter = request.value_filter;
//   let filtername = request.filtername;
//   let sql = "select * from tblusers where " + value_filter + "='" + filtername + "' or " + value_filter + " like '" + filtername + "';";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result" + result);
//       resolve({ body: JSON.stringify(result) });
//     });

//   });
//   return result;
// };

// module.exports.campaigncount = async (event) => {
//   let request = JSON.parse(event.body);
//   let Prospect = request.Prospect;
//   let sql =
//     "SELECT tl.refCampaignId CampaignId,tc.txtCampaignName CampaignName,tt.txtConversionType ConversionType,COUNT(txtCampaignName) count FROM tblcampaign tc JOIN tblleadcampaignmap tl ON tc.id = tl.refCampaignId JOIN tblactivity ta ON tl.id = ta.refMapid JOIN tblconversiontype tt ON ta.refConversionStatus = tt.id WHERE tt.txtConversionType = '" + Prospect + "' GROUP BY tc.txtCampaignName;";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       resolve({ body: JSON.stringify(result) });
//     });
//   });
//   return result;
// };


// module.exports.managercount = async (event) => {
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

// module.exports.salespersoncount = async (event) => {
//   //let request = JSON.parse(event.body);
//   let req = event.body;
//   let Prospect = req.Prospect;
//   let sql = "SELECT tm.refLeadId,tl.txtFirstName,tc.txtConversionType, count(tl.txtFirstName) FROM tblleads tl JOIN tblleadcampaignmap tm ON tl.id = tm.refLeadId JOIN tblactivity ta ON tm.id = ta.refMapid JOIN tblconversiontype tc ON tc.id = ta.refConversionStatus WHERE tc.txtConversionType = '" + Prospect + "' group by tl.txtFirstName;"
//   let result = await new Promise((resolve, reject) => {
//     if (Prospect == "") {
//       resolve({ body: JSON.stringify({ status: "error", Message: "Prospect missing" }) })
//       return
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err
//       console.log(result)
//       resolve({ body: JSON.stringify(result) });
//     });
//   });
//   return result;
// };

// module.exports.leadsfunnel = async (event) => {
//   let request = JSON.parse(event.body);
//   let Prospect = request.Prospect;
//   let sql = "select count(id) leadscount from crm.tblleads union all SELECT count(d.txtConversionType) as NoOfLeads FROM crm.tblleads a JOIN crm.tblleadcampaignmap b ON a.id = b.refLeadId JOIN crm.tblactivity c ON b.id = c.refMapid JOIN crm.tblconversiontype d ON c.refConversionStatus = d.id where d.txtConversionType = 'Nurturing ' or d.txtConversionType = '" + Prospect + "' group by d.txtConversionType;"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result)
//       resolve({ body: JSON.stringify(result) });
//     });
//   });
//   return result;
// };


// module.exports.prospectgrowth = async (event) => {
//   let request = JSON.parse(event.body);
//   let Prospect = request.Prospect;
//   let sql = "SELECT d.txtConversionType, COUNT(d.txtConversionType) as count FROM crm.tblleads a JOIN crm.tblleadcampaignmap b ON a.id = b.refLeadId JOIN crm.tblactivity c ON b.id = c.refMapid JOIN crm.tblconversiontype d ON c.refConversionStatus = d.id WHERE d.txtConversionType = '" + Prospect + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err
//       console.log(result)
//       resolve({ body: JSON.stringify(result) });
//     });
//   });
//   return result;
// };

// module.exports.prospectprogress = async (event) => {
//   let request = JSON.parse(event.body);
//   let Prospect = request.Prospect;
//   let sql = "select tct.txtconversiontype,tpt.txtProgresstype from tblactivity ta join tblconversiontype tct on ta.refConversionStatus=tct.id join tblprogresstype tpt on ta.refProgressStatus=tpt.id where tct.txtconversiontype='" + Prospect + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err
//       console.log(result)
//       resolve({ body: JSON.stringify(result) });
//     });
//   });
//   return result;
// };


// module.exports.getleadfilter = async (event) => {
//   //let request = JSON.parse(event.body);
//   let req = event.body;
//   let value_filter = req.value_filter;
//   let filtername = req.filtername;
//   let sql = "select * from tblleads where " + value_filter + "='" + filtername + "' or " + value_filter + " like '" + filtername + "';";
//   let result = await new Promise((resolve, reject) => {
//     if (filtername == "") {
//       resolve({ body: JSON.stringify({ status: "error", Message: "filtername missing" }) })
//       return
//     }
//     if (value_filter == "") {
//       resolve({ body: JSON.stringify({ status: "error", Message: "value_filter missing" }) })
//       return
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result" + result);
//       resolve({ body: JSON.stringify(result) });
//     });
//   });
//   return result;
// };



// module.exports.getsinglelead = async (event) => {
//   //let request = JSON.parse(event.body);
//   let req = event.body;
//   let id = req.id;
//   let sql = "select txtSuffix,txtFirstName,txtLastName,txtEmail from tblleads where id  = '" + id + "';"
//   let result = await new Promise((resolve, reject) => {
//     if (id == "") {
//       resolve({ body: JSON.stringify({ status: "error", Message: "id missing" }) })
//       return
//     }

//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Lead  displayed")

//       if (result != "") {
//         resolve({ body: "Lead exsist" + JSON.stringify(result) });
//         return
//       }
//       else {
//         reject("Lead does not exist")
//         return
//       }
//     });
//   });
//   return result;
// };

// module.exports.insertlead = async (event) => {
//   let request = JSON.parse(event.body);
//   let FirstName = request.FirstName;
//   let LastName = request.LastName;
//   let email = request.email;
//   let Phone = request.Phone;
//   let sql = "select txtEmail from tblleads where txtEmail =  '" + email + "';"
//   let sql1 = "insert into tblleads (txtFirstName, txtLastName, txtEmail, txtPhone) values('" + FirstName + "', '" + LastName + "','" + email + "','" + Phone + "');"
//   let result = await new Promise((resolve, reject) => {
//     if (FirstName == "") {
//       resolve("FirstName is empty")
//       return
//     }
//     if (LastName == "") {
//       resolve("LastName is empty")
//       return
//     }
//     if (email == "") {
//       resolve("email is empty")
//       return
//     }
//     if (Phone == "") {
//       resolve("Phone is empty")
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result = " + JSON.stringify(result))
//       if (result != "") {
//         reject("Lead already exists!")
//         return
//       }
//       else {
//         con.query(sql1, function (err, result) {
//           if (err) throw err;
//           resolve("Lead Inserted!")
//           console.log("New user Lead details inserted")
//           return
//         });
//       }
//     });
//   });
//   return result;
// };


// module.exports.updatelead = async (event) => {
//   let request = JSON.parse(event.body);
//   let email = request.email;
//   let id = request.id;
//   let sql = "select id,txtFirstName,txtEmail from tblleads where txtEmail= '" + email + "'";
//   let sqlupdate = "update tblleads   set txtEmail='" + email + "'    where id='" + id + "'";
//   let result = await new Promise((resolve, reject) => {

//     if (email == "") {
//       resolve("email is mandatory");
//       return res
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       if (result != "") {
//         reject("Already exist Lead");
//       }
//     });
//     con.query(sqlupdate, function (err, result) {
//       if (err) throw err;
//       console.log("updated" + result);
//       resolve({ body: "Updated" + JSON.stringify(result) });
//     });
//   })
//   return result;
// };

// module.exports.getcampaignfilter = async (event) => {
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
// };


// module.exports.getsinglecampaign = async (event) => {
//   let request = JSON.parse(event.body);
//   let id = request.id;
//   let sql = "select tblcampaign.txtCampaignName,tblproducttype.txtProducttype from tblcampaign left join tblproducttype on tblcampaign.refProducttype =tblproducttype.id where tblcampaign.id = '" + id + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       if (result != "") {
//         resolve({ body: "Campaign exsist" + JSON.stringify(result) });
//         return
//       }
//       else {
//         reject("Campaign does not exist")
//         return
//       }
//     });
//   });
//   return result;
// };

// module.exports.updatecampaign = async (event) => {
//   let request = JSON.parse(event.body);
//   let Campaignname = request.Campaignname;
//   let Startdate = request.Startdate;
//   let Enddate = request.Enddate;
//   let id = request.id;
//   let sql = "update tblcampaign  set txtCampaignName='" + Campaignname + "',dtStartdate='" + Startdate + "',dtEnddate='" + Enddate + "'  where id = " + id + ";"
//   let result = await new Promise((resolve, reject) => {
//     if (Campaignname == "") {
//       resolve("Campaignname is mandatory")
//       return
//     }
//     if (Startdate == "") {
//       resolve(" Startdate is mandatory")
//       return
//     }
//     if (Enddate == "") {
//       resolve("Enddate  is mandatory")
//       return
//     }
//     if (id == "") {
//       resolve("id  is mandatory")
//       return
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       if (result == "") {
//         reject("campaign not exists")
//         console.log("Result" + result);
//         return
//       }
//       else {
//         resolve({ body: "Campaign updated" + JSON.stringify(result) })
//       }
//     });
//   });
//   return result;
// };


// module.exports.getprospectfilter = async (event) => {
//   let request = JSON.parse(event.body);
//   let value_filter = request.value_filter;
//   let filtername = request.filtername;
//   let sql = "select D.id,D.txtFirstName,D.txtCompanyName,D.txtEmail,B.txtConversionType from tblactivity A join tblconversiontype B on A.refConversionStatus=B.id join tblleadcampaignmap C on A.refMapid =C.id join tblleads D on C.refLeadId=D.id where " + value_filter + "='" + filtername + "' or " + value_filter + " like '" + filtername + "';";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result" + result);
//       resolve({ body: JSON.stringify(result) })
//     })
//   })
//   return result;
// };


// module.exports.getsingletask = async (event) => {
//   let request = JSON.parse(event.body);
//   let id = request.id;
//   let sql = "select tt.txtActivitytype,tc.txtConversionType from tblactivity ta join tblactivitytype tt on ta.refActivitytype=tt.id join tblconversiontype tc on ta.refConversionStatus=tc.id where ta.id = '" + id + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       if (result !== '') {
//         resolve({ body: "Lead exsist" + JSON.stringify(result) });
//         return
//       }
//       else {
//         reject(" Task does not Exist")
//         return
//       }

//     });
//   });
//   return result;
// };





// module.exports.addtask = async (event) => {
//   let request = JSON.parse(event.body);
//   let Subject = request.Subject;
//   let txtcomments = request.txtcomments;
//   let dtCreatedOn = request.dtCreatedOn;
//   let txtAssignedto = request.txtAssignedto;
//   let Status = request.Status;
//   let LeadEmail = request.LeadEmail;

//   let sql1 = "insert into tblactivity (Subject,txtComments,dtCreatedOn,txtAssignedto,LeadEmail,Status) values ('" + Subject + "', '" + txtcomments + "','" + dtCreatedOn + "','" + txtAssignedto + "','" + LeadEmail + "','" + Status + "');"

//   let result = await new Promise((resolve, reject) => {

//     if (Subject === "") {
//       resolve("Subject is empty")
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
//     if (txtAssignedto === "") {
//       resolve("txtAssignedto is empty")
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
//       resolve(response);
//     });
//   });
//   return result;
// };





// module.exports.insertsingletask = async (event) => {
//   let request = JSON.parse(event.body);
//   let email = request.email;
//   let tasktitle = request.tasktitle;
//   let txtAssignedto = request.txtAssignedto;
//   let dtCreatedOn = request.dtCreatedOn;
//   let id = request.id;
//   let ProgressStatus = request.ProgressStatus;
//   let campaign = request.campaign;
//   let sql = " select tl.txtEmail from  tblactivity ta join tblleadcampaignmap tm on ta.refMapid =tm.id join tblleads tl on  tm.refLeadId=tl.id where tl.txtEmail='" + email + "';"
//   let sql1 = "insert into tblactivity (tasktitle,txtAssignedto,dtCreatedOn,refProgressStatus,campaign) values ('" + tasktitle + "','" + txtAssignedto + "','" + dtCreatedOn + "','" + ProgressStatus + "','" + campaign + "');"
//   let result = await new Promise((resolve, reject) => {

//     if (tasktitle == "") {
//       resolve("tasktitle is empty")
//       return
//     }
//     if (txtAssignedto == "") {
//       resolve("txtAssignedto is empty")
//       return
//     }
//     if (id == "") {
//       resolve("id is empty")
//       return
//     }
//     if (dtCreatedOn == "") {
//       resolve("dtCreatedOn is empty")
//       return
//     }
//     if (ProgressStatus == "") {
//       resolve("ProgressStatus is empty")
//       return
//     }
//     if (campaign == "") {
//       resolve("campaign is empty")
//       return
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result = " + JSON.stringify(result))
//       if (result != "") {
//         resolve("task already exists!" + JSON.stringify(result))
//         return
//       }
//       else {
//         con.query(sql1, function (err, result1) {
//           if (err) throw err;
//           reject({ body: "task Inserted!" + JSON.stringify(result1) })
//           console.log("New task details inserted")
//           return
//         });
//       }
//     });
//   });
//   return result;
// }



// module.exports.updatesignletask = async (event) => {
//   let request = JSON.parse(event.body);
//   let tasktitle = request.tasktitle;
//   let ProgressStatus = request.ProgressStatus;
//   let id = request.id;
//   let email= request.email;
//   let sql = "select tl.txtEmail from  tblactivity ta join tblleadcampaignmap tm on ta.refMapid =tm.id join tblleads tl on  tm.refLeadId=tl.id where tl.txtEmail='" + email + "';"
//   let sqlupdate = "update tblactivity   set tasktitle='" + tasktitle + "'    where id='" + id + "'";
//   let result = await new Promise((resolve, reject) => {
//     if (tasktitle == "") {
//       resolve("tasktitle is mandatory");
//       return res
//     }
//     if (ProgressStatus == "") {
//       resolve("ProgressStatus is mandatory");
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
//       resolve("updated")
//     });
//   });
//   return result;
// }



// module.exports.GetTaskListWithFilter = async (event) => {
//   let request = JSON.parse(event.body);
//   let value_filter = request.value_filter;
//   let filtername = request.filtername;
//   let sql = "select * from tblactivity A join tblactivitytype B on A.refActivitytype=B.id where " + value_filter + "='" + filtername + "' or " + value_filter + " like '" + filtername + "';";

//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result" + result);
//       resolve({ body: JSON.stringify(result) })
//     });
//   });
//   return result;
// };



module.exports.taskfetch = async (event) => {

  // let request = JSON.parse(event.body);
  // let sql = "select tasktitle,campaign,Status,dtCreatedOn,LeadEmail,txtAssignedto owner from  tblactivity group by tasktitle;";
  let sql = "select tasktitle,Status,dtCreatedOn,LeadEmail,Assignedto owner from  tblactivity group by tasktitle;";
  let res = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result)
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: JSON.stringify(result)
      };
      resolve(response);
    });
  });
  return res;

};

module.exports.addtask = async (event) => {
  let request = JSON.parse(event.body);
  let Subject = request.Subject;
  let txtcomments = request.txtcomments;
  let dtCreatedOn = request.dtCreatedOn;
  let Assignedto = request.Assignedto;
  let Status = request.Status;
  let LeadEmail = request.LeadEmail;
  // let sql1 = "insert into tblactivity (Subject,txtComments,dtCreatedOn,txtAssignedto,LeadEmail,Status) values ('" + Subject + "', '" + txtcomments + "','" + dtCreatedOn + "','" + txtAssignedto + "','" + LeadEmail + "','" + Status + "');"
  let sql1 = "insert into tblactivity (Subject,txtComments,dtCreatedOn,Assignedto,LeadEmail,Status) values ('" + Subject + "', '" + txtcomments + "','" + dtCreatedOn + "','" + Assignedto + "','" + LeadEmail + "','" + Status + "');"
  let res = await new Promise((resolve, reject) => {
    con.query(sql1, function (err, result) {
      if (err) throw err;
      // if (result != "") {
      //   const response = {
      //     statusCode: 200,
      //     headers: {
      //       'Access-Control-Allow-Origin': '*',
      //       'Access-Control-Allow-Credentials': true,
      //     }, body: JSON.stringify(result)
      //   };
      //   resolve(response);
      //   console.log("Result = " + JSON.stringify(result))
      //   resolve("Task Inserted!")
      //   console.log("New task  details inserted")
      // }
      if (Subject === "") {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body: "Subject is empty"
        };
        resolve(response);
        resolve("Subject is empty")
        
      }
  else if (txtcomments === "") {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body: "txtcomments is empty"
        };
        resolve(response);
        resolve("txtcomments is empty")

      }
      else if (dtCreatedOn === "") {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body: "dtCreatedOn is empty"
        };
        resolve(response);
        resolve("dtCreatedOn is empty")

      }
      else if (Assignedto === "") {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body: "Assignedto is empty"
        };
        resolve(response);
        resolve("Assignedto is empty")
       
      }
      else if (Status === "") {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body: "Status is empty"
        };
        resolve(response);
        resolve("Status is empty")
        
      }


      else if (LeadEmail === "") {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body: "LeadEmail is empty"
        };
        resolve(response);
        resolve("LeadEmail is empty")
      
      }
      else {
        // if (result != "") 
        {
          const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            }, body: "Task Inserted!"
          };
          resolve(response);
          console.log("Result = " + JSON.stringify(result))
          resolve("Task Inserted!")
          console.log("New task  details inserted")
        }
      }
    });

  });
  return res;
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