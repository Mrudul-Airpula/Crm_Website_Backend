'use strict';


var mysql = require('mysql');


// var con = mysql.createConnection({
//   host: "database-1.ckz31iuhqqnn.us-east-1.rds.amazonaws.com",
//   user: "admin",
//   password: "Myrdbms22",
//   database: "crm"
// });


var con = mysql.createConnection({
  host: "crm.ciozo2gsp2ag.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "SAZ",
  password: "password",
  database: "crm2",
});



con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


module.exports.getuserlist = async (event) => {
  let sql = "select txtFirstName,txtApprovalstatus,txtEmail from tblusers where txtApprovalstatus = 'Pending';"
  let result = await new Promise((resolve) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result:" + JSON.stringify(result))
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: JSON.stringify(result)
      };
      resolve(response)
    })
  })
  return result;
}



module.exports.updateuserliststatus = async (event) => {
  let request = JSON.parse(event.body)
  let email = request.approval_mail;
  let sql = "update tblusers set txtApprovalstatus = 'Approved' where txtEmail = '" + email + "'";
  let result = await new Promise((resolve) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result))
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: "Updated!!!!!"
      };
      resolve(response)
    })
  })
  return result
}


module.exports.prospectprogress = async (event) => {
  let sql = "SELECT COUNT(id) Leads FROM tblleads UNION ALL SELECT COUNT(G.txtConversionType) leadstopros FROM tblusers A JOIN tbljobtitle B ON A.refJobTitle = B.id JOIN tblleads D ON D.refCreatedBy = A.id JOIN tblleadcampaignmap E ON E.refLeadId = D.id JOIN tblactivity F ON F.refMapid = E.id JOIN tblconversiontype G ON G.id = F.refConversionStatus WHERE B.txtJobTitle LIKE '%Manager' AND G.txtConversionType = 'Prospect';"
  let result = await new Promise((resolve) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result))
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: JSON.stringify(result)
      };
      resolve(response)
    })
  })
  return result;
}


module.exports.campaignwiseprospectcount = async (event) => {
  let sql = "SELECT B.refCampaignId, A.txtCampaignName, D.txtConversionType, count(txtCampaignName) as count FROM tblcampaign A  JOIN tblleadcampaignmap B ON A.id = B.refCampaignId  JOIN  tblactivity C ON B.id = C.refMapid    JOIN  tblconversiontype D ON C.refConversionStatus = D.id  where D.txtConversionType = 'Prospect'  group by A.txtCampaignName;"
  let result = await new Promise((resolve) => {
    con.query(sql, function (err, result) {
      if (err) throw err
      console.log(JSON.stringify(result))
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: JSON.stringify(result)
      };
      resolve(response)
    })
  })
  return result;
};


module.exports.leadsfunnel = async (event) => {
  let sql = "select count(id) Leads from tblleads union all SELECT count(d.txtConversionType) as NoOfLeads FROM tblleads a JOIN tblleadcampaignmap b ON a.id = b.refLeadId JOIN tblactivity c ON b.id = c.refMapid JOIN tblconversiontype d ON c.refConversionStatus = d.id where d.txtConversionType = 'Nurturing' or d.txtConversionType = 'Prospect' group by d.txtConversionType;"
  let res = await new Promise((resolve) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result))
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: JSON.stringify(result)
      };
      resolve(response)
    })
  })
  return res;
};


module.exports.ManagerwiseProspectCount = async (event) => {
  let sql = "SELECT B.txtFirstName, A.txtJobTitle, E.txtConversionType, COUNT(E.txtConversionType) Mancount FROM tbljobtitle A JOIN tblusers B ON A.id = B.refJobTitle JOIN tblleadcampaignmap C ON C.refCreatedBy = B.id JOIN tblactivity D ON D.refMapid = C.id JOIN tblconversiontype E ON D.refConversionStatus = E.id WHERE A.txtJobTitle like '% Manager' AND E.txtConversionType = 'Prospect' GROUP BY (A.txtJobTitle);"
  let result = await new Promise((resolve) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result))
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: JSON.stringify(result)
      };
      resolve(response)
    })
  })
  return result;
};


module.exports.prospectGrowth = async (event) => {
  let sql = "SELECT  COUNT(d.txtConversionType) as count FROM tblleads a JOIN tblleadcampaignmap b ON a.id = b.refLeadId JOIN tblactivity c ON b.id = c.refMapid JOIN tblconversiontype d ON c.refConversionStatus = d.id WHERE d.txtConversionType = 'Prospect';"
  let result = await new Promise((resolve) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result))
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: JSON.stringify(result)
      };
      resolve(response)
    })
  })
  return result;
};


module.exports.SaleswisePropectcount = async (event) => {
  let sql = "SELECT u.txtFirstName,COUNT(d.txtConversionType) AS count FROM tblusers u join tblleads a on u.id=a.refCreatedBy JOIN tblleadcampaignmap b ON a.id = b.refLeadId JOIN tblactivity c ON b.id = c.refMapid JOIN tblconversiontype d ON c.refConversionStatus = d.id WHERE d.txtConversionType = 'Prospect' group by(u.txtFirstName);"
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result))
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: JSON.stringify(result)
      };
      resolve(response)
    })
  })
  return result;
}





// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "crm"
// });

const jwt = require("jsonwebtoken");

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
}

module.exports.login = async (event) => {
  let request = JSON.parse(event.body)
  let email = request.email;
  let password = request.password;
  let sql = "SELECT id, txtEmail FROM tblusers where txtEmail='" + email + "' and txtPassword='" + password + "'";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      if (result != "") {
        const token = jwt.sign({ email: email, password: password }, "secretkey");
        console.log("Login Success:" + JSON.stringify(token));
        resolve({ body: JSON.stringify(token) })
      }
      else if (password == "" || email == "") {
        reject("Both the fields are mandatory");
      } else {
        reject("Login details incorrect!");
      }
    });
  });
  return result;
};



// module.exports.sampleapi = async (event) => {
//   console.log("sampleapi");
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: "API is working!",
//       }
//     ),
//   };
// };

// module.exports.verifyotp = async (event) => {
//   let request = JSON.parse(event.body)
//   let otp = request.otp;
//   let sql = "select id from tblusers where txtOTP='" + otp + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       if (result == "") {
//         console.log("OTP Wrong")
//       }
//       else {
//         resolve({ body: JSON.stringify(result) })
//         console.log("OTP Verified")
//       }
//     });
//   });
//   return result;
// };



// module.exports.getuserlistwithfilter = async (event) => {
//   let request = JSON.parse(event.body)
//   let filtertype = request.filtertype;
//   let filtervalue = request.filtervalue;
//   let sql = "select txtFirstName from tblusers where '" + filtertype + "' like ' % " + filtervalue + " % ';"
//   let result = await new Promise((resolve) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result :" + JSON.stringify(result))
//       resolve({ body: JSON.stringify(result) })
//     })
//   })
//   return result;
// }

// module.exports.insertsingleprofile = async (event) => {
//   let request = JSON.parse(event.body)
//   let firstname = request.firstname;
//   let lastname = request.lastname;
//   let email = request.email;
//   let dob = request.dob;
//   let address = request.address;
//   let password = request.password;
//   let repassword = request.repassword;
//   let sql = "SELECT txtEmail FROM tblusers where txtEmail='" + email + "';";
//   let sql1 = "insert into tblusers(txtFirstName,txtLastName,txtEmail,txtdob,txtAddress,txtPassword) values ('" + firstname + "','" + lastname + "','" + email + "','" + dob + "','" + address + "','" + password + "');"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result:" + JSON.stringify(result));
//       if (firstname == "") {
//         reject("Firstname is Mandatory")
//       }
//       else if (lastname == "") {
//         reject("Lastname is Mandatory")
//       }
//       else if (email == "") {
//         reject("Email is Mandatory")
//       }
//       else if (dob == "") {
//         reject("Date of Birth is Mandatory")
//       }
//       else if (address == "") {
//         reject("Address is Mandatory")
//       }
//       else if (password == "") {
//         reject("Password is Mandatory")
//       }
//       else if (repassword == "") {
//         reject("RePassword is Mandatory")
//       }
//       else if (password != repassword) {
//         reject("Passwords Do not Match")
//       }
//       else if (result != "") {
//         reject("User already exists");
//       }
//       else {
//         con.query(sql1, function (err, result) {
//           if (err) throw err;
//           console.log("1 Record Inserted");
//           resolve({ body: "Record Updated" + JSON.stringify(result) });
//         })
//       }
//     });
//   })
//   return result;
// };



// module.exports.getsingleprofile = async (event) => {
//   let request = JSON.parse(event.body);
//   let id = request.id;
//   let sql = "select txtFirstName,txtLastName,txtEmail,txtdob,txtAddress from tblusers where id = '" + id + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       if (result != "") {
//         console.log("Profile information displayed")
//         resolve({ body: "Profile Information " + JSON.stringify(result) })
//       }
//       else {
//         reject("Profile does not exist")
//         console.log("Profile does not exist")
//       }
//     });
//   })
//   return result;
// };



// module.exports.getsingleprofile = async (event) => {
//   let req = event.body;
//   if (req.id == "") {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         status: "error",
//         Message: "id missing",
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





// module.exports.updatesingleprofile = async (event) => {
//   let request = JSON.parse(event.body);
//   let id = request.id;
//   let firstname = request.firstname;
//   let lastname = request.lastname;
//   let email = request.email;
//   let dob = request.dob;
//   let address = request.address;
//   let sql = "select id from tblusers where id = " + id + " ;"
//   let sql1 = "update tblusers set txtFirstName = '" + firstname + "',txtLastName = '" + lastname + "',txtEmail = '" + email + "',txtdob ='" + dob + "',txtAddress = '" + address + "' where id = " + id + " ;"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       if (result != "") {
//         con.query(sql1, function (err, result) {
//           resolve({ body: "Record Updated" + JSON.stringify(result) })
//         })
//       }
//       else {
//         reject("Profile does not exist");
//       }
//     })
//   })
//   return result;
// };


// module.exports.GetSingleLead = async (event) => {
//   let request = JSON.parse(event.body);
//   let LeadName = request.LeadName;
//   let sqlSingleLead =
//     "SELECT tl.txtFirstName FirstName,tl.txtLastName LastName,tl.status1 Status,tl.dtCreatedOn CreatedOn,tl.txtEmail Email,tl.Responses,tu.txtFirstName Owner FROM tblleads tl JOIN tblusers tu on tl.refCreatedBy=tu.id where tl.txtFirstName = '" +
//     LeadName +
//     "';";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sqlSingleLead, function (err, result) {
//       if (err) throw err;
//       console.log("Selected Lead Details");
//       if (result != "") {
//         resolve({ body: "Lead details for selected Lead" + JSON.stringify(result) });
//       }
//       else {
//         reject("LeadName Does Not Exist");
//       }
//     });
//   });
//   return result
// };


// module.exports.InsertSingleLead = async (event) => {
//   let request = JSON.parse(event.body);
//   let firstname = request.firstname;
//   let lastname = request.lastname;
//   let Status = request.Status;
//   let CreatedOn = request.CreatedOn;
//   let Email = request.Email;
//   let Responses = request.Responses;
//   let Owner = request.Owner;
//   let sqlinsert =
//     "insert into tblleads (txtFirstName,txtLastName,status1,dtCreatedOn,txtEmail,Responses,refCreatedby) VALUES('" +
//     firstname +
//     "','" +
//     lastname +
//     "','" +
//     Status +
//     "','" +
//     CreatedOn +
//     "','" +
//     Email +
//     "','" +
//     Responses +
//     "','" +
//     Owner +
//     "');"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sqlinsert, function (err, result) {
//       if (err) throw err;
//       if (result != "") {
//         resolve({ body: "1 Record Updated" + JSON.stringify(result) });
//       }
//       else if (firstname == "") {
//         reject("firstname is mandatory");
//       }
//       else if (lastname == "") {
//         reject("lastname is mandatory");
//       }
//       else if (CreatedOn == "") {
//         reject("Startdate is mandatory");
//       }
//       else if (Email == "") {
//         reject("Email is mandatory");
//       }
//       else if (Owner == "") {
//         reject("CampaignOwner name is mandatory");
//       }
//       else {
//         reject("Lead Already Exists");
//       }
//     })
//   })
// }




// module.exports.GetSingleCampaign = async (event) => {
//   let request = JSON.parse(event.body);
//   let CampaignName = request.CampaignName;
//   let sqlSinglecampaign =
//     "SELECT txtCampaignName CampaignName,dtStartdate Startdate,dtEnddate Enddate ,Status1, count(txtCampaignName) NoOfOwners FROM tblcampaign join tblusers where txtCampaignName = '" +
//     CampaignName +
//     "' group by txtCampaignName;";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sqlSinglecampaign, function (err, result) {
//       if (err) throw err;
//       console.log("Selected Campaign Details");
//       if (result != "") {
//         resolve({ body: "Campaign details for selected Campaign" + JSON.stringify(result) });
//       } else {
//         reject("Campaign Does Not Exist");
//       }
//     });
//   });
//   return result
// };




// module.exports.GetSingleTask = async (event) => {
//   let request = JSON.parse(event.body);
//   let TaskName = request.TaskName;
//   let sql = "SELECT tt.txtActivitytype, tc.txtConversionType, count(tt.txtActivitytype) as count FROM tblactivity ta JOIN tblactivitytype tt ON ta.refActivitytype = tt.id JOIN tblconversiontype tc ON ta.refConversionStatus = tc.id where tt.txtActivitytype = '" + TaskName + "';";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       if (result !== '') {
//         resolve({ body: "Selected Task Details" + JSON.stringify(result) })
//       }
//       else {
//         reject(" Task does not Exist")
//       }
//     });
//   });
//   return result
// };



