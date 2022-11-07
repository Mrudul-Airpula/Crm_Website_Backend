"use strict";
// use strict mode enables strict mode :-means not allow using undeclared variables
// this is myservice
var mysql = require("mysql");

// var con = mysql.createConnection({
//   host: "database-1.cifm2amlhh1z.us-east-1.rds.amazonaws.com",
//   user: "admin",
//   password: "password",
//   database: "crm",
// });
var con = mysql.createConnection({
  host: "crm.ciozo2gsp2ag.us-east-1.rds.amazonaws.com",
  port:"3306",
  user: "SAZ",
  password: "password",
  database: "crm2",
});
// var con = mysql.createConnection({
// host: "crm.ciozo2gsp2ag.us-east-1.rds.amazonaws.com",
//   port:"3306",
//   user: "SAZ",
//   password: "password",
//   database: "crm"
// });
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "crm"
// });

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const jwt = require("jsonwebtoken");
const { UNSAFE_NavigationContext } = require("react-router-dom");

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

// module.exports.login = async (event) => {

//   let request = JSON.parse(event.body)
//   let email = request.email;
//   let password = request.password;
//   let sql = "SELECT id, txtEmail FROM tblusers where txtEmail='" + email + "' and txtPassword='" + password + "'";
//   let prom = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       if (result != "") {
//         const token = jwt.sign({ email: email, password: password }, "secretkey");
//         resolve({ body: JSON.stringify(token) });
//         // console.log("Login Success:" + JSON.stringify(result));
//       }
//       else if (password == "" || email == "") {
//         reject("Both the fields are mandatory");
//       } else {
//         reject("Login details incorrect!");
//       }
//     });
//   });
//   return prom;
// };

// *******************************************************************************

module.exports.login = async (event) => {
  let request = JSON.parse(event.body);
  let email = request.email;
  let password = request.password;
  let sql =
    "SELECT txtFirstName,id, txtEmail FROM tblusers where txtEmail='" +
    email +
    "' and txtPassword='" +
    password +
    "'";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("login Details");
      if (result != "") {
        const token = jwt.sign(
          { email: email, password: password },
          "secretkey"
        );
        // resolve({ body: JSON.stringify(token) });
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credendials": true,
          },
          body: JSON.stringify(result) + JSON.stringify(token),
          // ,body: JSON.stringify(token)
        };

        resolve(response);
        // const token = jwt.sign({ email: email, password: password }, "secretkey");
        // resolve({ body: JSON.stringify(token) });
        // resolve(response,token);
        // console.log("Login Success:" + JSON.stringify(result));
      } else {
        reject({ body: "Login details incorrect!" });
        return;
      }
    });
  });
  return result;
};

// ************************************joi*************************************************


// module.exports.loginjoi = async (event) => {
//   var Joi=require('joi')
//   let request = JSON.parse(event.body);
//   let email = request.email;
//   let password = request.password;
//   let sql =
//     "SELECT txtFirstName,id, txtEmail FROM tblusers where txtEmail='" +
//     email +
//     "' and txtPassword='" +
//     password +
//     "'";
//   let result = await new Promise((resolve, reject) => {


//     const schema=Joi.object().keys({
//          email:Joi.string().required,
//          password:Joi.string().required
//        })
//       //  const {error}=schema.validate(res.body);
//       //  if(error){
//       //    res.status(200).json({error:error})
//       //  }else{
//       //    reject({ body: "joi incorrect!" });
//       //   }

//       const dataToValidate = { 
//         email:{email}, 
//        password:{password}
//       } 
//       const result1 = Joi.validate(dataToValidate, schema); 

//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("login Details");
//       if (result != "") {
//       //   const token = jwt.sign(
//       //     { email: email, password: password },
//       //     "secretkey"
//       //   );
//       //   // resolve({ body: JSON.stringify(token) });
//       //   const response = {
//       //     statusCode: 200,
//       //     headers: {
//       //       "Access-Control-Allow-Origin": "*",
//       //       "Access-Control-Allow-Credendials": true,
//       //     },
//       //    C+ JSON.stringify(token),
//       //     // ,body: JSON.stringify(token)
//       //   };

//         resolve({body: JSON.stringify(result)})
//         // const token = jwt.sign({ email: email, password: password }, "secretkey");
//         // resolve({ body: JSON.stringify(token) });
//         // resolve(response,token);
//         // console.log("Login Success:" + JSON.stringify(result));
//       } else {
//         reject({ body: "Login details incorrect!" });
//         return;
//       }
//     });
//   });
//   return result;
// };
// // module.exports.loginjoi = async (event) => {
//   var Joi=require('joi')
//   let request = JSON.parse(event.body);
//   let email = request.email;
//   let password = request.password;
//   let sql =
//     "SELECT txtFirstName,id, txtEmail FROM tblusers where txtEmail='" +
//     email +
//     "' and txtPassword='" +
//     password +
//     "'";
//   let result = await new Promise((resolve, reject) => {
//     const schema=Joi.object().keys({
//       email:Joi.string().required,
//       password:Joi.string().required
//     })
//     const {error}=schema.validate(req.body);
//     // if(error){
//     //   res.status(200).json({error:error})
//     // }else{
//     //   reject({ body: "joi incorrect!" });
//     // }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("login Details");
//       if (result != "") {
//         // const token = jwt.sign(
//         //   { email: email, password: password },
//         //   "secretkey"
//         // );
//         // resolve({ body: JSON.stringify(token) });



//         const response =
//         //  {
//         //   statusCode: 200,
//         //   headers: {
//         //     "Access-Control-Allow-Origin": "*",
//         //     "Access-Control-Allow-Credendials": true,
//         //   },
//           {body: JSON.stringify(result) }
//           // + JSON.stringify(token),
//           // ,body: JSON.stringify(token)
//         // };

//         resolve(response);
//         // const token = jwt.sign({ email: email, password: password }, "secretkey");
//         // resolve({ body: JSON.stringify(token) });
//         // resolve(response,token);
//         // console.log("Login Success:" + JSON.stringify(result));
//       } else {
//         reject({ body: "Login details incorrect!" });
//         return;
//       }
//     });
//   });
//   return result;
// };
//******************************************************************************************
// module.exports.login = async (event) => {
//   let req = event.body;
//   if (req.username == "") {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         status: "error",
//         Message: "username missing",
//       }),
//     };
//   } else if (req.password == "") {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         status: "error",
//         Message: "password missing",
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

module.exports.sampleapi = async (event) => {
  console.log("sampleapi");
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "API is working!",
    }),
  };
};

module.exports.verifyotp1 = async (event) => {
  let request = JSON.parse(event.body);
  let otp = request.otp;
  let sql = "select id from crm.tblusers where txtOTP='" + otp + "';";
  let prom = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      if (result == "") {
        resolve({ body: "wrong otp" + JSON.stringify(result) });
      } else {
        resolve({ body: JSON.stringify(result) });
        console.log("OTP Verified");
      }
    });
  });
  return prom;
};

module.exports.verifyotp = async (event) => {
  let request = JSON.parse(event.body);
  let otp = request.otp;
  let sql = "select id from crm.tblusers where txtOTP='" + otp + "';";
  let result = await new Promise((resolve) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("selected Details");
      if (result !== "") {
        resolve({ body: JSON.stringify(result) });
        return;
      } else {
        reject("OTP Verified");
        return;
      }
    });
  });
  return result;
};

module.exports.getuserlistwithfilter = async (event) => {
  let request = JSON.parse(event.body);
  let filtertype = request.filtertype;
  let filtervalue = request.filtervalue;
  let sql =
    "select * from crm.tblusers where '" +
    filtertype +
    "' like ' % " +
    filtervalue +
    " % ';";
  let result = await new Promise((resolve) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result :" + JSON.stringify(result));
      resolve({ body: JSON.stringify(result) });
    });
  });
  return result;
};

module.exports.insertsingleprofile = async (event) => {
  let request = JSON.parse(event.body);
  let firstname = request.firstname;
  let lastname = request.lastname;
  let email = request.email;
  let dob = request.dob;
  let address = request.address;
  let password = request.password;
  let repassword = request.repassword;
  let sql = "SELECT txtEmail FROM tblusers where txtEmail='" + email + "';";
  let sql1 =
    "insert into tblusers(txtFirstName,txtLastName,txtEmail,txtdob,txtAddress,txtPassword) values ('" +
    firstname +
    "','" +
    lastname +
    "','" +
    email +
    "','" +
    dob +
    "','" +
    address +
    "','" +
    password +
    "');";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result:" + JSON.stringify(result));
      if (firstname == "") {
        reject("Firstname is Mandatory");
      } else if (lastname == "") {
        reject("Lastname is Mandatory");
      } else if (email == "") {
        reject("Email is Mandatory");
      } else if (dob == "") {
        reject("Date of Birth is Mandatory");
      } else if (address == "") {
        reject("Address is Mandatory");
      } else if (password == "") {
        reject("Password is Mandatory");
      } else if (repassword == "") {
        reject("RePassword is Mandatory");
      } else if (password != repassword) {
        reject("Passwords Do not Match");
      } else if (result != "") {
        reject("User already exists");
      } else {
        con.query(sql1, function (err, result) {
          if (err) throw err;
          console.log("1 Record Inserted");
          resolve({ body: "Record Updated" + JSON.stringify(result) });
        });
      }
    });
  });
  return result;
};

module.exports.insertsingleprofile = async (event) => {
  let req = event.body;
  if (req.firstname == "") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "error",
        Message: "Firstname is Mandatory",
      }),
    };
  } else if (req.lastname == "") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "error",
        Message: "Lastname is Mandatory",
      }),
    };
  } else if (req.email == "") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "error",
        Message: "Email is Mandatory",
      }),
    };
  } else if (req.dob == "") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "error",
        Message: "Date of Birth is Mandatory",
      }),
    };
  } else if (req.address == "") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "error",
        Message: "Address is Mandatory",
      }),
    };
  } else if (req.password == "") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "error",
        Message: "Password is Mandatory",
      }),
    };
  } else if (req.repassword == "") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "error",
        Message: "Repassword is Mandatory",
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

module.exports.getsingleprofile = async (event) => {
  let request = JSON.parse(event.body);
  let id = request.id;
  let sql =
    "select txtFirstName,txtLastName,txtEmail,txtdob,txtAddress from tblusers where id = '" +
    id +
    "';";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      if (result != "") {
        console.log("Profile information displayed");
        resolve({ body: "Profile Information " + JSON.stringify(result) });
      } else {
        reject("Profile does not exist");
        console.log("Profile does not exist");
      }
    });
  });
  return result;
};

module.exports.getsingleprofile = async (event) => {
  let req = event.body;
  if (req.id == "") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "error",
        Message: "id missing",
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

module.exports.updatesingleprofile = async (event) => {
  let request = JSON.parse(event.body);
  let id = request.id;
  let firstname = request.firstname;
  let lastname = request.lastname;
  let email = request.email;
  let dob = request.dob;
  let address = request.address;
  let sql = "select id from tblusers where id = " + id + " ;";
  let sql1 =
    "update crm.tblusers set txtFirstName = '" +
    firstname +
    "',txtLastName = '" +
    lastname +
    "',txtEmail = '" +
    email +
    "',txtdob ='" +
    dob +
    "',txtAddress = '" +
    address +
    "' where id = " +
    id +
    " ;";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      if (result != "") {
        con.query(sql1, function (err, result) {
          resolve({ body: "Record Updated" + JSON.stringify(result) });
        });
      } else {
        reject("Profile does not exist");
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

module.exports.leadsfunnel = async (event) => {
  let sql =
    "select count(id) leadscount from crm.tblleads union all SELECT count(d.txtConversionType) as NoOfLeads FROM crm.tblleads a JOIN crm.tblleadcampaignmap b ON a.id = b.refLeadId JOIN crm.tblactivity c ON b.id = c.refMapid JOIN crm.tblconversiontype d ON c.refConversionStatus = d.id where d.txtConversionType = 'Nurturing' or d.txtConversionType = 'Prospect' group by d.txtConversionType;";
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
      } else {
        reject("LeadName Does Not Exist");
      }
    });
  });
  return result;
};

module.exports.InsertSingleLead = async (event) => {
  let request = JSON.parse(event.body);
  let firstname = request.firstname;
  let lastname = request.lastname;
  let Status = request.Status;
  let CreatedOn = request.CreatedOn;
  let Email = request.Email;
  let Responses = request.Responses;
  let Owner = request.Owner;
  let sqlinsert =
    "insert into tblleads (txtFirstName,txtLastName,status1,dtCreatedOn,txtEmail,Responses,refCreatedby) VALUES('" +
    firstname +
    "','" +
    lastname +
    "','" +
    Status +
    "','" +
    CreatedOn +
    "','" +
    Email +
    "','" +
    Responses +
    "','" +
    Owner +
    "');";
  let result = await new Promise((resolve, reject) => {
    con.query(sqlinsert, function (err, result) {
      if (err) throw err;
      if (result != "") {
        resolve({ body: "1 Record Updated" + JSON.stringify(result) });
      } else if (firstname == "") {
        reject("firstname is mandatory");
      } else if (lastname == "") {
        reject("lastname is mandatory");
      } else if (CreatedOn == "") {
        reject("Startdate is mandatory");
      } else if (Email == "") {
        reject("Email is mandatory");
      } else if (Owner == "") {
        reject("CampaignOwner name is mandatory");
      } else {
        reject("Lead Already Exists");
      }
    });
  });
};

// ************************************************************************************************************************

module.exports.Getlead = async (event) => {
  let request=JSON.parse(event.body);
  let sqlGetlead =
    "select  tblleads.txtFirstName firstname, tblcampaign.txtCampaignName campaignname, DATE(tblleads.dtCreatedOn) createdon, DATE(tblleads.dtUpdatedOn) updatedon, tblusers.txtFirstName username   from  tblusers join tblleads on tblusers.id=tblleads.refCreatedBy  join tblleadcampaignmap on tblleadcampaignmap.refLeadId=tblleads.id  join tblcampaign on tblcampaign.id=tblleadcampaignmap.refCampaignId  join tblactivity on tblactivity.refMapid=tblleads.id  join tblconversiontype on tblconversiontype.id=tblactivity.refConversionStatus  group by tblleads.txtFirstName";

  let prom = await new Promise((resolve, reject) => {
    con.query(sqlGetlead, function (err, result) {
      if (err) throw err;
      console.log("selected lead Details");
      if (result != "") {
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credendials": true,
          },
          body: JSON.stringify(result),
        };
        resolve(response);
      }else{
        resolve({ body: "no prospect exist" });
                return;
              }
    });
  });
  return prom;
};





// module.exports.Getlead = async (event) => {
//   let request=JSON.parse(event.body);
//   let sqlGetlead =
//     "select  tblleads.txtFirstName firstname, tblcampaign.txtCampaignName campaignname, DATE(tblleads.dtCreatedOn) createdon, DATE(tblleads.dtUpdatedOn) updatedon, tblusers.txtFirstName username   from  tblusers join tblleads on tblusers.id=tblleads.refCreatedBy  join tblleadcampaignmap on tblleadcampaignmap.refLeadId=tblleads.id  join tblcampaign on tblcampaign.id=tblleadcampaignmap.refCampaignId  join tblactivity on tblactivity.refMapid=tblleads.id  join tblconversiontype on tblconversiontype.id=tblactivity.refConversionStatus  group by tblleads.txtFirstName";

//   let result = await new Promise((resolve, reject) => {
//     con.query(sqlGetlead, function (err, result) {
//       if (err) throw err;
//       console.log("selected lead Details");
//       if (result != "") {
//         const response = {
//           statusCode: 200,
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credendials": true,
//           },
//           body: JSON.stringify(result),
//         };
//         resolve(response);
//       } else {
//         reject({ body: "no prospect exist" });
//         return;
//       }
//     });
//   });
//   return result;
// };


// module.exports.Getlead= async (event) => {

//   let request=JSON.parse(event.body);
//   let sqlGetlead ="select  tblleads.txtFirstName firstname, tblcampaign.txtCampaignName campaignname, DATE(tblleads.dtCreatedOn) createdon, DATE(tblleads.dtUpdatedOn) updatedon, tblusers.txtFirstName username   from  tblusers join tblleads on tblusers.id=tblleads.refCreatedBy  join tblleadcampaignmap on tblleadcampaignmap.refLeadId=tblleads.id  join tblcampaign on tblcampaign.id=tblleadcampaignmap.refCampaignId  join tblactivity on tblactivity.refMapid=tblleads.id  join tblconversiontype on tblconversiontype.id=tblactivity.refConversionStatus  group by tblleads.txtFirstName"
  
//   let result = await new Promise((resolve,reject) => {
//     con.query(sqlGetlead, function (err, result) {
//       if (err) throw err;
//       console.log("selected lead Details");
//       if(result!=""){
//         const response={
//           statusCode:200,
//           headers: {
//             'Access-Control-Allow-Origin':'*',
//             'Access-Control-Allow-Credendials':true,
//         },body:JSON.stringify(result)
//         };
//         resolve(response);
//      }else{
//         reject({body:"leadname not exist"});
//         return;
//       }
    
//     });
//   });
//   return result;
// }



// module.exports.Getlead = async (event) => {
//   let request = JSON.parse(event.body);
//   let sqlGetlead =
//     "select  tblleads.txtFirstName firstname, tblcampaign.txtCampaignName campaignname, DATE(tblleads.dtCreatedOn) createdon, DATE(tblleads.dtUpdatedOn) updatedon, tblusers.txtFirstName username   from  tblusers join tblleads on tblusers.id=tblleads.refCreatedBy  join tblleadcampaignmap on tblleadcampaignmap.refLeadId=tblleads.id  join tblcampaign on tblcampaign.id=tblleadcampaignmap.refCampaignId  join tblactivity on tblactivity.refMapid=tblleads.id  join tblconversiontype on tblconversiontype.id=tblactivity.refConversionStatus  group by tblleads.txtFirstName";

//   let result = await new Promise((resolve, reject) => {
//     con.query(sqlGetlead, function (err, result) {
//       if (err) throw err;
//       console.log("selected lead Details");
//       if (result != "") {
//         const response = {
//           statusCode: 200,
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credendials": true,
//           },
//           body: JSON.stringify(result),
//         };
//         resolve(response);
//       } else {
//         reject({ body: "leadname not exist" });
//         return;
//       }
//     });
//   });
//   return result;
// };






module.exports.todo = async (event) => {
  let request = JSON.parse(event.body);
  let sqlGetlead =
    "select tblactivity.txtDescription,  tblleads.id,tblleads.txtFirstName,tblcampaign.txtCampaignName,tblactivitytype.txtActivitytype,tblprogresstype.txtProgresstype from tblactivity join tblprogresstype on tblactivity.refProgressStatus = tblprogresstype.id join tblactivitytype on tblactivitytype.id = tblactivity.refActivitytype join tblleadcampaignmap on tblactivity.refMapid = tblleadcampaignmap.id join tblcampaign on tblcampaign.id = tblleadcampaignmap.refCampaignId join tblleads on tblleads.id = tblleadcampaignmap.refLeadId"
  let result = await new Promise((resolve, reject) => {
    con.query(sqlGetlead, function (err, result) {
      if (err) throw err;
      console.log("selected lead Details");
      if (result != "") {
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credendials": true,
          },
          body: JSON.stringify(result),
        };
        resolve(response);
      } else {
        reject({ body: JSON.stringify("leadname not exist" )});
        return;
      }
    });
  });
  return result;
};


















// module.exports.Getlead= async (event) => {
//   let request = JSON.parse(event.body);
//   let sqlLead ="select * from tblleads"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sqlLead, function (err, result) {
//       if (err) throw err;
//       console.log("Selected Lead Details");

//     });
//   });
//   return result
// };

// ************************************************************************************************************************

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
      } else {
        reject("Campaign Does Not Exist");
      }
    });
  });
  return result;
};

module.exports.GetSingleTask = async (event) => {
  let request = JSON.parse(event.body);
  let TaskName = request.TaskName;
  let sql =
    "ivity ta JOIN tblactivitytype tt ON ta.refActivitytype = tt.id JOIN tblconversiontype tc ON ta.refConversionStatus = tc.id where tt.txtActivitytype = '" +
    TaskName +
    "';";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result !== "") {
        resolve({ body: "Selected Task Details" + JSON.stringify(result) });
      } else {
        reject(" Task does not Exist");
      }
    });
  });
  return result;
};

















module.exports.db= async (event) => {
  let request = JSON.parse(event.body);

  let result = await new Promise((resolve, reject) => {
    con.query( function (err, result) {
      if (err) throw err;
      console.log("selected lead Details");
      if (result != "") {
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credendials": true,
          },
          body: JSON.stringify(result),
        };
        resolve(response);
      } else {
        reject({ body: "leadname not exist" });
        return;
      }
    });
  });
  return result;
};


module.exports.getcampaign = async (event) => {
  let request=JSON.parse(event.body);
  let sqlGetlead =
"select id,txtCampaignName from tblcampaign"
  let prom = await new Promise((resolve, reject) => {
    con.query(sqlGetlead, function (err, result) {
      if (err) throw err;
      console.log("selected getcampaignDetails");
      if (result != "") {
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credendials": true,
          },
          body: JSON.stringify(result),
        };
        resolve(response);
      }else{
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credendials": true,
          },
          body: "no getcampaign exist",
        };
        resolve(response);
              }
    });
  });
  return prom;
};




module.exports.getuser = async (event) => {
  let request=JSON.parse(event.body);
  let sqlGetlead =
"select id,txtFirstName from tblusers"
  let prom = await new Promise((resolve, reject) => {
    con.query(sqlGetlead, function (err, result) {
      if (err) throw err;
      console.log("selected user Details");
      if (result != "") {
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credendials": true,
          },
          body: JSON.stringify(result),
        };
        resolve(response);
      }else{
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credendials": true,
          },
          body: "no getuser exist",
        };
        resolve(response);
              }
    });
  });
  return prom;
};



module.exports.getlead1 = async (event) => {
  let request=JSON.parse(event.body);
  let sqlGetlead =
"select id,txtFirstName from tblleads"
  let prom = await new Promise((resolve, reject) => {
    con.query(sqlGetlead, function (err, result) {
      if (err) throw err;
      console.log("selected getlead Details");
      if (result != "") {
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credendials": true,
          },
          body: JSON.stringify(result),
        };
        resolve(response);
      }else{
        resolve({ body: "no lead exist" });
        return;
              }
    });
  });
  return prom;
};


module.exports.addcampaign = async (event) => {
  let request=JSON.parse(event.body);
  let campaignname = request.campaignname;
  let createdon = request.createdon;
  let startdate = request.startdate;
  let enddate = request.enddate;
  let producttype = request.producttype;
  let createdby = request.createdby;

 let sqlexist="select * from tblcampaign where txtCampaignName='"+campaignname+"';";
  let sql ="insert into tblcampaign(txtCampaignName, dtCreatedOn, dtStartdate, dtEnddate, refProducttype, refCreatedBy) VALUES('" + campaignname + "', '" + createdon + "','" + startdate + "','" + enddate + "','" + producttype + "','" + createdby + "');";

  let prom = await new Promise((resolve, reject) => {
    con.query(sqlexist, function (err, result) {
      if (err) throw err;
      console.log("fetching addcampaign Details");
      if (result == "") {
        con.query(sql, function (err, result1) {
          if (err) resolve({ body: err });
          console.log("selected addcampaign Details");
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credendials": true,
          }, body: JSON.stringify("campaign has been added"),
        };
        resolve(response);
      });
      }
      else {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body: JSON.stringify("campaign id already exists"),
        };
        resolve(response);
      };
      });;
    });
  return prom;
};




module.exports.pushlead = async (event) => {
  let request=JSON.parse(event.body);
  let refleadid = request.refleadid;
  let refCampaignId = request.refCampaignId;
  let sql1="SET FOREIGN_KEY_CHECKS=0;"
  let sql =
"insert into tblleadcampaignmap(refLeadId,refCampaignId) values('"+refleadid+"','"+refCampaignId+"')"
  let prom = await new Promise((resolve, reject) => {
    con.query(sql1, function (err, result) {
      if (err) throw err;
    });
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("pushing id Details");
      if (result != "") {
        const response = {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credendials": true,
          },
          body: JSON.stringify(result),
        };
        resolve(response);
      }else{
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credendials": true,
        },
        body: JSON.stringify(result),
      }
      resolve(response);
      };
      
        
              
    });
  });
  return prom;
};