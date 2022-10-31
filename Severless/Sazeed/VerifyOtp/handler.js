"use strict";
const jwt = require("jsonwebtoken");
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "crm.ciozo2gsp2ag.us-east-1.rds.amazonaws.com",
  port:"3306",
  user: "SAZ",
  password: "password",
  database: "crm",
});
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "crm",
// });

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!!");
});

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
const Joi = require('joi');


module.exports.Login = async (event) => {
  let req = JSON.parse(event.body);
  let username = req.username;
  let password = req.password;
  const schema = Joi.object({
    username: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

  let sql = "select id,txtFirstName,txtEmail from tblusers where txtEmail ='" + username + "' and txtPassword='" + password + "'";

  let result = await new Promise((resolve, reject) => {
    if (username == "") {
      resolve({ body: JSON.stringify({ status: "error", Message: "username missing" }) })
      return
    }
    if (password == "") {
      resolve({ body: JSON.stringify({ status: "error", Message: "password missing" }) })
      return
    }
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));

      if (result != "") {
        const token = jwt.sign({ username:username, password:password }, "secretkey");
        schema.validate({ username: username, password: password });
        resolve({ body: JSON.stringify(token) });
      }
      else {
        reject("Login details incorrect");
      }

    });
  });
  return result;
};

// module.exports.Login = async (event) => {
//   let req = JSON.parse(event.body);
//   let username = req.username;
//   let password = req.password;

//   let sql = "select id,txtFirstName,txtEmail from tblusers where txtEmail ='" + username + "' and txtPassword='" + password + "'";

//   let result = await new Promise((resolve, reject) => {
//     if (username == "") {
//       resolve({ body: JSON.stringify({ status: "error", Message: "username missing" }) })
//       return
//     }
//     if (password == "") {
//       resolve({ body: JSON.stringify({ status: "error", Message: "password missing" }) })
//       return
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result: " + JSON.stringify(result));

//       if (result != "") {
//         const token = jwt.sign({ username:username, password:password }, "secretkey");
//         resolve({ body: JSON.stringify(token) });
//       }
//       else {
//         reject("Login details incorrect");
//       }

//     });
//   });
//   return result;
// };

module.exports.Verifyotp = async (event) => {
  let request = JSON.parse(event.body);
  let email = request.email;
  let otp = request.otp;
  let sql =
    "SELECT id FROM crm.tblusers where txtOTP='" +
    otp +
    "' and txtEmail='" +
    email +
    "';";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      console.log(result);
      if (err) throw err;
      console.log("result: " + JSON.stringify(result));
      if (result != "") {
        resolve("verified!!!");
      } else {
        reject("incorrect otp");
      } 
    });
  });
  return result;
};

module.exports.getsingleprofile = async (event) => {
  let request = JSON.parse(event.body);
  let email = request.email;
  let sql =
    "select txtFirstName,txtLastName,txtEmail,txtdob,txtAddress from tblusers where txtEmail = '" +
    email +
    "';";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Profile information displayed");
      if (result != "") {
        resolve({ body: "Profile Information: " + JSON.stringify(result) });
        return;
      } else {
        reject("Profile Does Not Exist");
        return;
      }
    });
  });
  return result;
};

module.exports.Insertsingleprofile = async (event) => {
  let request = JSON.parse(event.body);
  let firstname = request.firstname;
  let email = request.email;
  let password = request.password;
  let repassword = request.repassword;
  let sql = "SELECT txtEmail FROM tblusers where txtEmail='" + email + "';";
  let sql1 =
    "insert into tblusers(txtFirstName,txtEmail,txtPassword) values ('" +
    firstname +
    "','" +
    email +
    "','" +
    password +
    "');";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result:" + JSON.stringify(result));
      if (result != "") {
        reject("User already exists");
      } else if (firstname == "") {
        reject("Firstname is Mandatory");
      } else if (email == "") {
        reject("Email is Mandatory");
      } else if (password == "") {
        reject("Password is Mandatory");
      } else if (repassword == "") {
        reject("RePassword is Mandatory");
      } else if (password != repassword) {
        reject("Passwords Do not Match");
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

module.exports.UpdateSingleProfile = async (event) => {
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

module.exports.GetSingleCampaign = async (event) => {
  let request = JSON.parse(event.body);
  //let CampaignName = request.CampaignName;
  let sqlSinglecampaign =
    "SELECT txtCampaignName CampaignName,ParentCampaignName,dtStartdate Startdate,dtEnddate Enddate ,Status1 Status,Responses FROM tblcampaign;";
  let result = await new Promise((resolve, reject) => {
    con.query(sqlSinglecampaign, function (err, result) {
      if (err) throw err;
      console.log("Selected Campaign Details");
      if (result != "") {
        resolve({
          body:
            "Campaign details for selected Campaign" + JSON.stringify(result),
        });
        return{
          statusCode: 200,
          body: JSON.stringify({
            Status: "Success",
            message: "CampaignDetails"
          })
        }
      }
      if (CampaignName == ""){
      reject("CampaignName Missing")  
        return{
          statusCode: 200,
          body: JSON.stringify({
            Status: "error",
            message: "MissingCampaignName"
          })
        }
      }
       else {
        reject("Campaign Does Not Exist");
        return{
          statusCode: 200,
          body: JSON.stringify({
            Status: "error",
            message: "Campaign Does Not Exist"
          })
        }
      }
    });
  });
  return result;
};


module.exports.InsertSingleCampaign = async (event) => {
  let request = JSON.parse(event.body);
  let CampaignName = request.CampaignName;
  let ParentCampaignName = request.ParentCampaignName;
  let Status = request.Status;
  let Startdate = request.Startdate;
  let Enddate = request.Enddate;
  let Responses = request.Responses;
  let CampaignOwner = request.CampaignOwner;
  let sqlinsert =
    "insert into tblcampaign (txtCampaignName,ParentCampaignName,Status1,dtStartdate,dtEnddate,Responses,refCampaignOwner) VALUES('" +
    CampaignName +
    "','" +
    ParentCampaignName +
    "','" +
    Status +
    "','" +
    Startdate +
    "','" +
    Enddate +
    "','" +
    Responses +
    "','" +
    CampaignOwner +
    "');";
  let result = await new Promise((resolve, reject) => {
  if (CampaignName == "") {
    reject("CampaignName is mandatory");
    return;
  }
  else if (ParentCampaignName == "") {
    reject("ParentCampaignName is mandatory");
    return;
  }
  else if (Startdate == "") {
    reject("Startdate is mandatory");
    return;
  }
  else if (Enddate == "") {
    reject("Enddate is mandatory");
    return;
  }
  else if (CampaignOwner == "") {
    reject("CampaignOwner name is mandatory");
    return;
  }
  con.query(sqlinsert, function (err, result) { 
    if (err) throw err; 
      console.log("1 record inserted");
      resolve({body:"1 record inserted"});
  });
  });
  return(result);  
};

module.exports.UpdateSingleCampaign = async (event) => {
  let request = JSON.parse(event.body);
  let CampaignName = request.CampaignName;
  let ParentCampaignName = request.ParentCampaignName;
  let Status = request.Status;
  let Startdate = request.Startdate;
  let Enddate = request.Enddate;
  let Responses = request.Responses;
  let CampaignOwner = request.CampaignOwner;
  let id = request.id;
  let sqlupdate =
    "UPDATE tblcampaign SET  txtCampaignName ='" +
    CampaignName +
    "',ParentCampaignName = '" +
    ParentCampaignName +
    "',Status1 = '" +
    Status +
    "',dtStartdate= '" +
    Startdate +
    "',dtEnddate= '" +
    Enddate +
    "',Responses= '" +
    Responses +
    "',refCampaignOwner='" +
    CampaignOwner +
    "'WHERE id = '" +
    id +
    "';";
  let result = await new Promise((resolve, reject) => {
  if (CampaignName == "") {
    reject("Enter CampaignName");
    return res;
  }
  if (ParentCampaignName == "") {
    reject("Enter ParentCampaignName");
    return res;
  }
  if (Startdate == "") {
    reject("Enter Startdate");
    return res;
  }
  if (Enddate == "") {
    reject("Enter Enddate");
    return res;
  }
  if (CampaignOwner == "") {
    reject("Enter CampaignOwner");
    return res;
  }
  con.query(sqlupdate, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
    resolve({body:"1 record updated"});
  });
});  
}




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
    "SELECT B.refCampaignId, A.txtCampaignName, D.txtConversionType, count(txtCampaignName) as count FROM tblcampaign A  JOIN tblleadcampaignmap B ON A.id = B.refCampaignId  JOIN  tblactivity C ON B.id = C.refMapid JOIN  tblconversiontype D ON C.refConversionStatus = D.id  where D.txtConversionType = 'Prospect'  group by A.txtCampaignName;";
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

module.exports.sampleapi = async (event) => {
  console.log("sampleapi");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "API is working!" }),
  };
};


module.exports.SalespersonwiseSuccessRate = async (event) => {
  let sql = "SELECT tm.refLeadId,tl.txtFirstName,tc.txtConversionType,COUNT(txtFirstName) FROM tblleads tl JOIN tblleadcampaignmap tm ON tl.id = tm.refLeadId JOIN tblactivity ta ON tm.id = ta.refMapid JOIN tblconversiontype tc ON tc.id = ta.refConversionStatus WHERE tc.txtConversionType = 'Prospect' GROUP BY (tl.txtFirstName);";
  let result = await new Promise((resolve, reject) => {
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result));
    resolve({ body: JSON.stringify(result) });
  });
});
return result;
};

module.exports.Leadlist = async (event) => {
  let request = JSON.parse(event.body);
  let sqlSingleLead =
    "SELECT tl.txtFirstName FirstName,tl.txtLastName LastName,tl.status1 Status,tl.dtCreatedOn CreatedOn,tl.txtEmail Email,tl.Responses,tu.txtFirstName Owner FROM tblleads tl JOIN tblusers tu on tl.refCreatedBy=tu.id;";
  let result = await new Promise((resolve, reject) => {
    con.query(sqlSingleLead, function (err, result) {
      if (err) throw err;
      console.log("Selected Lead Details");
      if (result != "") {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body: JSON.stringify(result)
        };
        resolve(response);
      } else {
        reject({body:"LeadName Does Not Exist"});
        return;
      }
    });
  });
  return result;
};