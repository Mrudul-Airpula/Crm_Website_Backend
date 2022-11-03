'use strict';

var mysql = require("mysql");

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "bizcloud"
// });
var con = mysql.createConnection({
host: "crm.ciozo2gsp2ag.us-east-1.rds.amazonaws.com",
  port:"3306",
  user: "SAZ",
  password: "password",
  database: "crm",
});

// var con = mysql.createConnection({
//   host: "database-1.cw6qs6sqli81.us-east-1.rds.amazonaws.com",
//   // port: "3306",
//   user: "admin",
//   password: "sarathcloud",
//   database: "bizcloud"
// });

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
})
// const jwt = require("jsonwebtoken");
// module.exports.Login = async (event) => {
//   let request = JSON.parse(event.body)
//   // let req = event.body;
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
// // module.exports.Login = async (event) => {
// //   let request = JSON.parse(event.body);
// //   // let req =event.body;
// //   let username = request.username;
// //   let password = request.password;
// //   let sql = "SELECT id, txtFirstName,txtEmail,txtPhonenumber FROM tblusers where txtFirstname='" + username + "' and txtPassword='" + password + "'";
// //   let result = await new Promise((resolve, reject) => {
// //     if (username ==""){
// //       resolve({ body: JSON.stringify( {status : "error", Message: "username missing"}) })
// //       return
// //     }
// //     if (password ==""){
// //       resolve({ body: JSON.stringify( {status : "error", Message: "password missing"}) })
// //       return
// //     }
// //     con.query(sql, function (err, result) {
// //       if (err) throw err;
// //       console.log(result);
// //       if (result !== '') {
// //         const token = jwt.sign({ username: username, password: password }, "secretkey");
// //         resolve({ body: "Success!!!" + JSON.stringify(token) })
// //       }
// //       else {
// //         reject("Error : Username and password is incorrect !!")
// //       }

// //     });
// //   });

// //   return result;
// // };
// module.exports.middleware = async (event, context) => {
//   console.log("middleware");
//   // let token = event.headers.token;
//   let verified = await new Promise((resolve, reject) => {
//     jwt.verify(event.headers.token, "secretkey", (err, decoded) => {
//       if (err) resolve(false);
//       resolve(true);
//     });
//   });
//   if (!verified) {
//     context.end();
//     return { statusCode: 403, body: "Authentication Failed!" };

//   }
//   else {
//     return { body: "Success!!" }
//   }
// };


// module.exports.singleprofile = async (event) => {
//   let request = JSON.parse(event.body);
//   let id = request.id;
//   let sql = "select txtFirstName,txtLastName,txtEmail,txtPhonenumber,txtPassword from tblusers where id = '" + id + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       if (result !== '') {
//         resolve({ body: JSON.stringify(result) })
//         return
//       }
//       else {
//         reject(" User does not Exist")

//       }

//     });
//   })
//   return result;
// };

// module.exports.insertsingleprofile = async (event) => {
//   let request = JSON.parse(event.body);
//   let firstname = request.firstname;
//   let lastname = request.lastname;
//   let email = request.email;
//   let dob = request.dob;
//   let address = request.address;
//   let password = request.password;
//   let sql = "select txtEmail from tblusers where txtEmail =  '" + email + "';"
//   let sql1 = "insert into tblusers(txtFirstName,txtLastName,txtEmail,txtdob,txtAddress,txtPassword) values ('" + firstname + "','" + lastname + "','" + email + "','" + dob + "','" + address + "','" + password + "');"
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
//     if (dob == "") {
//       resolve("Date of birth is empty")
//       return
//     }
//     if (address == "") {
//       resolve("Address is empty")
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
//   return result;
// };

// module.exports.updatesingleprofile = async (event) => {
//   let request = JSON.parse(event.body);
//   let email = request.email;
//   let id = request.id;
//   let sql = "select id,txtFirstName,txtEmail from tblusers where txtEmail= '" + email + "'";
//   let sqlupdate = "update tblusers set txtEmail='" + email + "' where id='" + id + "'";
//   let result = await new Promise((resolve, reject) => {
//     if (email == "") {
//       resolve("email is mandatory");
//       return
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       if (result != "") {
//         reject("already exist");
//       }
//     });
//     con.query(sqlupdate, function (err, result) {
//       if (err) throw err;
//       console.log("updated" + result);
//       resolve("updated")
//       resolve({ body: JSON.stringify(result) })
//     });
//   });
//   return result;
// };

// module.exports.userlistfilter = async (event) => {
//   let request = JSON.parse(event.body);
//   let value_filter = request.value_filter;
//   let filtername = request.filtername;
//   let result = await new Promise((resolve, reject) => {
//     let sql = "select * from tblusers where " + value_filter + "='" + filtername + "' or " + value_filter + " like '" + filtername + "';";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result" + result);
//       resolve({ body: JSON.stringify(result) })
//     })
//   })
//   return result;
// };

// module.exports.campaignprospectcount = async (event) => {
//   let request = JSON.parse(event.body);
//   let Conversiontype = request.Conversiontype;
//   let sql = "SELECT B.refCampaignId,A.txtCampaignName,D.txtConversionType,COUNT(txtCampaignName) AS count FROM tblcampaign A JOIN tblleadcampaignmap B ON A.id = B.refCampaignId JOIN tblactivity C ON B.id = C.refMapid JOIN tblconversiontype D ON C.refConversionStatus = D.id where D.txtConversionType = '" + Conversiontype + "'GROUP BY A.txtCampaignName;"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err
//       console.log(result)
//       resolve({ body: JSON.stringify(result) })
//     });
//   })
//   return result;
// };

// module.exports.managerprospectcount = async (event) => {
//   let request = JSON.parse(event.body);
//   let Jobrole = request.Jobrole;
//   let sql = "select A.txtJobTitle,B.txtFirstName,E.txtconversiontype,count(E.txtConversionType) count from tbljobtitle A join tblusers B on B.refJobTitle=A.id  join tblleadcampaignmap C on B.refCreatedBy=C.id join tblactivity D on D.refMapid=C.id join tblconversiontype E on D.refConversionStatus=E.id where txtJobTitle='" + Jobrole + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       resolve({ body: JSON.stringify(result) })
//     });
//     console.log("sampleapi");
//     return {
//       statusCode: 200,
//       body: JSON.stringify(
//         {
//           message: "API is working!",
//         }
//       ),
//     };
//   })
//   return result;
// };

// module.exports.salessuccessrate = async (event) => {
//   let request = JSON.parse(event.body);
//   let Conversiontype = request.Conversiontype;
//   let sql = "SELECT tm.refLeadId,tl.txtFirstName,tc.txtConversionType,COUNT(txtFirstName) FROM tblleads tl JOIN tblleadcampaignmap tm ON tl.id = tm.refLeadId JOIN tblactivity ta ON tm.id = ta.refMapid JOIN tblconversiontype tc ON tc.id = ta.refConversionStatus WHERE tc.txtConversionType ='" + Conversiontype + "' GROUP BY (tl.txtFirstName);"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err
//       console.log(result)
//       resolve({ body: JSON.stringify(result) })
//     })
//   })
//   return result;
// };

module.exports.leadfunnel = async (event) => {
  // let request = JSON.parse(event.body);
  // let Conversiontype = request.Conversiontype;
  let res = await new Promise((resolve, reject) => {
    let sql = " select count(id) leadscount from tblleads union all SELECT count(d.txtConversionType) as NoOfLeads FROM tblleads a JOIN tblleadcampaignmap b ON a.id = b.refLeadId JOIN tblactivity c ON b.id = c.refMapid JOIN tblconversiontype d ON c.refConversionStatus = d.id where d.txtConversionType = 'Nurturing' or d.txtConversionType = 'Prospect' group by d.txtConversionType;"
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
      resolve(response)

    });
  })
  return res;
}


// module.exports.prospectGrowth = async (event) => {
//   let request = JSON.parse(event.body);
//   let Conversiontype = request.Conversiontype;
//   let sql = "SELECT d.txtConversionType, COUNT(d.txtConversionType) as count FROM tblleads a JOIN tblleadcampaignmap b ON a.id = b.refLeadId JOIN tblactivity c ON b.id = c.refMapid JOIN tblconversiontype d ON c.refConversionStatus = d.id WHERE d.txtConversionType = '" + Conversiontype + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err
//       console.log(result)
//       resolve({ body: JSON.stringify(result) })
//     });
//   })
//   return result;
// };

// module.exports.prospectProgress = async (event) => {
//   let request = JSON.parse(event.body);
//   let Conversiontype = request.Conversiontype;
//   let sql = "SELECT tct.txtconversiontype, tpt.txtProgresstype FROM tblactivity ta JOIN tblconversiontype tct ON ta.refConversionStatus = tct.id    JOIN tblprogresstype tpt ON ta.refProgressStatus = tpt.id WHERE tct.txtconversiontype = '" + Conversiontype + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err
//       console.log(result)
//       resolve({ body: JSON.stringify(result) })
//     });
//   })
//   return result;
// }

// module.exports.getleadlistwithfilter = async (event) => {
//   let request = JSON.parse(event.body);
//   let value_filter = request.value_filter;
//   let filtername = request.filtername;
//   let sql = "select * from tblleads where " + value_filter + "='" + filtername + "' or " + value_filter + " like '" + filtername + "';";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result" + result);
//       resolve({ body: JSON.stringify(result) })
//     })
//   })
//   return result;
// }


module.exports.getsinglelead = async (event) => {
  // let request = JSON.parse(event.body);
  // let id = request.id;
  let sql = "select txtFirstName from tblleads where id between 1 and 5;"
  let res = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Lead  displayed")

      if (result != "") {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body: JSON.stringify(result)
        };
        resolve(response);
        return
      }
      else {
        reject("Lead does not exist")
        return
      }
    });
  });
  return res;
};


// module.exports.insertsinglelead = async (event) => {
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
//       resolve("Firstname is empty")
//       return
//     }
//     if (Companyname == "") {
//       resolve("Companyname is empty")
//       return
//     }
//     if (email == "") {
//       resolve("Email is empty")
//       return
//     }
//     if (Phone == "") {
//       resolve("Phone is empty")
//       return
//     }
//     if (address == "") {
//       resolve("Address is empty")
//       return
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result = " + JSON.stringify(result))
//       if (result != "") {
//         resolve({ body: "Profile already exists!" + JSON.stringify(result) })
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


// module.exports.updatesinglelead = async (event) => {
//   let request = JSON.parse(event.body);
//   let email = request.email;
//   let id = request.id;
//   let sql = "select id,txtFirstName,txtEmail from tblleads where txtEmail= '" + email + "'";
//   let sqlupdate = "update tblleads set txtEmail='" + email + "' where id='" + id + "'";
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
//       resolve({ body: "Updated" + JSON.stringify(result) });
//     });

//   })
//   return result;
// };



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
// };


module.exports.getsingleCampaign = async (event) => {
  let request = JSON.parse(event.body);
  let id = request.id;
  let sql = "select txtCampaignName,ParentCampaignName,Status1,dtStartdate,dtEnddate,txtOwner from tblcampaign where id = '" + id + "';"
  let res = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result != "") {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body: JSON.stringify(result)
        };
        resolve(response);
        return
      }
      else {
        reject("Campaign does not exist")
        return
      }

    });
  });
  return res;
};


module.exports.updateCampaign = async (event) => {
  let request = JSON.parse(event.body);
  let CampaignName = request.CampaignName;
  let Startdate = request.Startdate;
  let Enddate = request.Enddate;
  let Status = request.Status;
  let Owner = request.Owner;
  let id = request.id;
  let ParentCampaign = request.ParentCampaign;
  let sql = "update tblcampaign set txtCampaignName='" + CampaignName + "',Status1='" + Status + "',dtStartdate='" + Startdate + "',dtEnddate='" + Enddate + "',txtOwner='" + Owner + "',ParentCampaignName='" + ParentCampaign + "'where id ='" + id + "'";
  let res = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      // if (result = !"") {
      //   const response = {
      //     statusCode: 200,
      //     headers: {
      //       'Access-Control-Allow-Origin': '*',
      //       'Access-Control-Allow-Credentials': true,
      //     }, body: JSON.stringify(result)
      //   };
      //   resolve(response)
      //   resolve("updated")
      // }
     if (CampaignName == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          
        },body:"CampaignName is mandatory"
      };
      resolve(response)
      resolve("CampaignName is mandatory")
    }

    else if (Startdate == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          
        },body: "Startdate is mandatory"
      };
      resolve(response)
      resolve(" Startdate is mandatory")
    }
    else if (Enddate == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          
        },body:"Enddate is mandatory"
      };
      resolve(response)
      resolve("Enddate  is mandatory")
    }
    else if (Status == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          
        },body:"Status is mandatory"
      };
      resolve(response)
      resolve("Status  is mandatory")
    }
    else if (Owner == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          
        },body:"Owner is mandatory"
      };
      resolve(response)
      resolve("Owner  is mandatory")
      
    }
    else if (ParentCampaign == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          
        },body:"ParentCampaign is mandatory"
      };
      resolve(response)
      resolve("ParentCampaign  is mandatory")
     
    }
    else if (id == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          
        },body:"id is mandatory"
      };
      resolve(response)
      resolve("id  is mandatory")
    
    }
    else {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body:"updated"
      };
      resolve(response)
      resolve("updated")
    }
    

      


      // con.query(sql, function (err, result) {
      //   if (err) throw err;
      //   if (result == "") {
      //     const response = {
      //       statusCode: 200,
      //       headers: {
      //         'Access-Control-Allow-Origin': '*',
      //         'Access-Control-Allow-Credentials': true,
      //       }, body: JSON.stringify(result)
      //     };
      //       reject("campaign not exists")
      //       console.log("Result" + result);
      //       return
      //     }
      //     else {
      //       resolve("updated")
      //       resolve({ body: JSON.stringify(result) })
      //     }
    });
  });
  return res;
}




// module.exports.updateCampaign = async (event) => {
//   let request = JSON.parse(event.body);
//   let CampaignName = request.CampaignName;
//   let Startdate = request.Startdate;
//   let Enddate = request.Enddate;
//   let Status = request.Status;
//   let Owner = request.Owner;
//   let id = request.id;
//   let ParentCampaign = request.ParentCampaign;
//   let sql = "update tblcampaign set txtCampaignName='" + CampaignName + "',txtStatus='" + Status + "',dtStartdate='" + Startdate + "',dtEnddate='" + Enddate + "',txtOwner='" + Owner + "',txtParentCampaign='" + ParentCampaign + "'where id ='" + id + "'";
//   let result = await new Promise((resolve, reject) => {
//     if (CampaignName == "") {
//       resolve("CampaignName is mandatory")
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
//     if (Status == "") {
//       resolve("Status  is mandatory")
//       return
//     }
//     if (Owner == "") {
//       resolve("Owner  is mandatory")
//       return
//     }
//     if (ParentCampaign == "") {
//       resolve("ParentCampaign  is mandatory")
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
//         resolve("updated")
//         resolve({ body: JSON.stringify(result) })
//       }
//     });
//   });
//   return result;
// };




// module.exports.getProspectlistwithfilter = async (event) => {
//   // let request = JSON.parse(event.body);
//   let req = event.body;
//   let value_filter = req.value_filter;
//   let filtername = req.filtername;
//   let sql = " select D.id,D.txtFirstName,D.txtCompanyName,D.txtEmail,B.txtConversionType from tblactivity A join tblconversiontype B on A.refConversionStatus=B.id join tblleadcampaignmap C on A.refMapid =C.id join tblleads D on C.refLeadId=D.id where " + value_filter + "='" + filtername + "' or " + value_filter + " like '" + filtername + "';";
//   let result = await new Promise((resolve, reject) => {
//     if (value_filter == "") {
//       resolve({ body: JSON.stringify({ status: "error", Message: "value_filter missing" }) })
//       return
//     }
//     if (filtername == "") {
//       resolve({ body: JSON.stringify({ status: "error", Message: "filtername missing" }) })
//       return
//     }
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
//   let sql = "select * from tblactivity where id = '" + id + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       if (result !== '') {
//         resolve({ body: JSON.stringify(result) })
//         return
//       }
//       else {
//         reject(" Task does not Exist")
//         return
//       }

//     });
//   })
//   return result;
// }
// module.exports.signup = async (event) => {
//   let request = JSON.parse(event.body);
//   let firstname = request.firstname;
//   let lastname = request.lastname;
//   let email = request.email;
//   let password = request.password;
//   let repassword = request.repassword;
//   let OTP = request.OTP;
//   let sql = "select txtFirstName,txtEmail from tblusers where txtEmail= '" + email + "'";
//   let sqlinsert = "insert into tblusers(txtFirstName,txtLastName,txtEmail,txtPassword,txtOTP) values('" + firstname + "','" + lastname + "','" + email + "','" + password + "','" + OTP + "')";



//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("result" + JSON.stringify(result));
//       if (result != "") {
//         resolve({ body: "email already exists" + JSON.stringify(result) })
//       }
//       else if (firstname == "" || lastname == "" || email == "" || password == "" || repassword == "") {
//         reject("All fields are mandatory");
//       }
//       else if (repassword != password) {
//         reject("Password doesnt match");
//       }
//       else {
//         con.query(sqlinsert, function (err, result) {
//           if (err) throw err;
//           console.log("user added" + JSON.stringify(result));
//           resolve("user added" + JSON.stringify(result));
//         })
//       }
//     });
//   });




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
//           resolve({ body: "verify and updated" + JSON.stringify(result) });


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
//   let id = request.id;
//   let email = request.email;

//   let sqlupdate = "update tblusers set txtOTP='" + OTP + "' where id='" + id + "'";
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
//         resolve({ body: "verify" + JSON.stringify(result) })

//       }

//     });
//   });

//   console.log("last line ");
//   return result;

// }


module.exports.leadfetch = async (event) => {
  let request = JSON.parse(event.body);
  // let id = request.id;
  let sql = "select txtFirstName,txtLastName,txtLeadsource,dtUpdatedOn from tblleads where id between 1 and 3;"
  // return({body: "text" +sql})
  let res = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result !== '') {
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body: JSON.stringify(result)
        };
        resolve(response)
        return
      }
      else {
        reject(" Task does not Exist")
        return
      }

    });
  })
  return res;
}


// module.exports.campaginfetch = async (event) => {
//   let request = JSON.parse(event.body);
//   let id = request.id;
//   let sql = "select * from tblactivity where id = '" + id + "';"
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       if (result !== '') {
//         resolve({ body: JSON.stringify(result) })
//         return
//       }
//       else {
//         reject(" Task does not Exist")
//         return
//       }

//     });
//   })
//   return result;
// }



// module.exports.getProspectlistwithfilter = async (event) => {
//   // let request = JSON.parse(event.body);
//   let req = event.body;
//   let value_filter = req.value_filter;
//   let filtername = req.filtername;
//   let sql = " select D.id,D.txtFirstName,D.txtCompanyName,D.txtEmail,B.txtConversionType from tblactivity A join tblconversiontype B on A.refConversionStatus=B.id join tblleadcampaignmap C on A.refMapid =C.id join tblleads D on C.refLeadId=D.id where " + value_filter + "='" + filtername + "' or " + value_filter + " like '" + filtername + "';";
//   let result = await new Promise((resolve, reject) => {
//     if (value_filter == "") {
//       resolve({ body: JSON.stringify({ status: "error", Message: "value_filter missing" }) })
//       return
//     }
//     if (filtername == "") {
//       resolve({ body: JSON.stringify({ status: "error", Message: "filtername missing" }) })
//       return
//     }
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result" + result);
//       resolve({ body: JSON.stringify(result) })
//     })
//   })
//   return result;
// };