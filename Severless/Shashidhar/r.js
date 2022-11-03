// "use strict";
 
// var mysql = require("mysql");
 
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "crm"
// });
 
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected");
// });
// module.exports.hello = async (event) => {
//   let request = JSON.parse(event.body);
//   let otp = request.otp;
//   let sql = "select txtOTP from tblusers where txtOTP='" + otp + "'";
   
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result: " + JSON.stringify(result));
//       resolve({ body: JSON.stringify(result) });
//     });
//   });
 
//   console.log("last line");
//   return result;
// };















// const jwt = require("jsonwebtoken");
// module.exports.middleware = async (event, context) => {
// console.log("middleware");
// let token = event.headers.token;
// let verified = await new Promise((resolve, reject) => {
// jwt.verify(token, "secretkey", (err, decoded) => {
// if (err) resolve(false);
// resolve(true);
// });
// });
// if (!verified) {
// context.end();
// return { statusCode: 403, body: "Authentication Failed!" };

// }
// };
// module.exports.login = async (event) => {
// const token = jwt.sign({ username: "something", id: 10 }, "secretkey");
// return {
// statusCode: 200,
// body: JSON.stringify({ token: token }),
// };
// };
// module.exports.sampleapi = async (event) => {
// console.log("sampleapi");
// return {
// statusCode: 200,
// body: JSON.stringify(
// {
// message: "API is working!",
// }
// ),
// };
// };




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
//     return { statuscode: 403, body: "Authentication failed" };
//   }
//   else{
//     return{body: "key verified!"}
//   }
// };


//***********************14-1147******************************************************* */

module.exports.otpverify = async (event) => {
  let request = JSON.parse(event.body);
  let email = request.email;
  let otp = request.otp;
  let sql =
    "SELECT id FROM  crm.tblusers where txtotp='" +
    otp +
    "' and txtEmail='" +
    email +
    "';";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));
      if (result != "") {

    reject({ body: "incorrect otp" + JSON.stringify(result) });
  }
});
    });
return (result)
  };



  module.exports.Login = async (event) => {
    let request = JSON.parse(event.body);
    let username = request.username;
    let password = request.password;
    let sql =
    "SELECT txtEmail,txtPassword FROM crm.tblusers where txtEmail='" +
    username +
    "' and txtPassword='" +
    password +
    "';";
    let result = await new Promise((resolve, reject) => {
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        if (result == "") {
          reject("username or password is incorrect");
        } else {
          const token=jwt.sign({ username: username , password: password }, "secretkey" );
          resolve({ body: "Success: " +JSON.stringify(token) });
        }
      });
    });
    return result;
  };

module.exports.getsingleprofile = async (event) => {
  let request = JSON.parse(event.body);
  let email = request.email;
  let sql = "select * from tblusers where txtEmail = '" + email + "';";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("result")
      if (result != "") {
        resolve({ body: "result " + JSON.stringify(result) })
      }
      else {
        reject("Does Not Exist")
      }
    });
  });
  return (result)
};

module.exports.Insertsingleprofile = async (event) => {
  let request = JSON.parse(event.body)
  let firstname = request.firstname;
  let email = request.email;
  let password = request.password;
  let repassword = request.repassword;
  let sql = "SELECT txtEmail FROM tblusers where txtEmail='" + email + "';";
  let sql1 = "insert into tblusers(txtFirstName,txtEmail,txtPassword) values ('" + firstname + "','" + email + "','" + password + "');"
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result:" + JSON.stringify(result));
      if (result != "") {
        reject("User already exists");
      }
      else if (firstname == "") {
        reject("Firstname is Mandatory")
      }
      else if (email == "") {
        reject("Email is Mandatory")
      }
      else if (password == "") {
        reject("Password is Mandatory")
      }
      else if (repassword == "") {
        reject("RePassword is Mandatory")
      }
      else if (password != repassword) {
        reject("Passwords Do not Match")
      }
      else {
        con.query(sql1, function (err, result) {
          if (err) throw err;
          console.log("1 Record Inserted");
          resolve({ body: "Record Updated" + JSON.stringify(result) });
        })
      }
    });
  });
  return (result);
};

module.exports.UpdateSingleProfile = async (event) => {
  let request = JSON.parse(event.body);
  let id = request.id;
  let firstname = request.firstname;
  let lastname = request.lastname;
  let email = request.email;
  let dob = request.dob;
  let address = request.address;
  let sql = "select id from tblusers where id = " + id + " ;"
  let sql1 = "update crm.tblusers set txtFirstName = '" + firstname + "',txtLastName = '" + lastname + "',txtEmail = '" + email + "',txtdob ='" + dob + "',txtAddress = '" + address + "' where id = " + id + " ;"
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      if (result != "") {
        con.query(sql1, function (err, result) {
          resolve({ body: "Record Updated" + JSON.stringify(result) })
        })
      }
      else {
        reject("Profile does not exist");
      }
    })
  })
  return result;
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
    return { statuscode: 403, body: "Authentication failed" };
  }
  else{
    return{body: "key verified!"}
  }
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
        resolve({body:"Campaign details for selected Campaign" + JSON.stringify(result)} );
        return;
      } else {
        reject("Campaign Does Not Exist");
        return;
      }
    });
  });
return (result)
}  

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
        resolve({body:"Lead details for selected Lead" + JSON.stringify(result)});
        return;
      } else {
        reject("LeadName Does Not Exist");
        return;
      }
    });
  });
  return(result);
}  

module.exports.GetSingleTask = async (event) => {
  let request = JSON.parse(event.body);
  let TaskName = request.TaskName;
  let sql = "SELECT tt.txtActivitytype, tc.txtConversionType, count(tt.txtActivitytype) as count FROM tblactivity ta JOIN tblactivitytype tt ON ta.refActivitytype = tt.id JOIN tblconversiontype tc ON ta.refConversionStatus = tc.id where tt.txtActivitytype = '"+TaskName+"';";
  let result = await new Promise((resolve, reject) => {
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result !== '') {
      resolve({body:"Selected Task Details" +JSON.stringify(result)})
      return
    }
    else {
      reject(" Task does not Exist")
      return
    }
  });
});
return(result);
}  

module.exports.campaignwiseprospectcount = async (event) => {
  let sql = "SELECT B.refCampaignId, A.txtCampaignName, D.txtConversionType, count(txtCampaignName) as count FROM tblcampaign A  JOIN tblleadcampaignmap B ON A.id = B.refCampaignId  JOIN  tblactivity C ON B.id = C.refMapid    JOIN  tblconversiontype D ON C.refConversionStatus = D.id  where D.txtConversionType = 'Prospect'  group by A.txtCampaignName;"
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err
      console.log(JSON.stringify(result))
      resolve({ body: JSON.stringify(result) })
    })
  })
  return result;
};



module.exports.ManagerwiseProspectCount = async (event) => {
  let sql = "SELECT B.txtFirstName, A.txtJobTitle, E.txtConversionType, COUNT(E.txtConversionType) FROM tbljobtitle A JOIN tblusers B ON A.id = B.refJobTitle JOIN tblleadcampaignmap C ON C.refCreatedBy = B.id JOIN tblactivity D ON D.refMapid = C.id JOIN tblconversiontype E ON D.refConversionStatus = E.id WHERE A.txtJobTitle = '% Manager' AND E.txtConversionType = 'Prospect';"
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err
      console.log(JSON.stringify(result))
      resolve({ body: JSON.stringify(result) })
    })
  })
  return result;
};


module.exports.leadsfunnel = async (event) => {
  let sql = "select count(id) leadscount from crm.tblleads union all SELECT count(d.txtConversionType) as NoOfLeads FROM crm.tblleads a JOIN crm.tblleadcampaignmap b ON a.id = b.refLeadId JOIN crm.tblactivity c ON b.id = c.refMapid JOIN crm.tblconversiontype d ON c.refConversionStatus = d.id where d.txtConversionType = 'Nurturing' or d.txtConversionType = 'Prospect' group by d.txtConversionType;"
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result))
      resolve({ body: JSON.stringify(result) })
    })
  })
  return result;
};








module.exports.ProspectGrowth = async (event) => {
  let sql = "SELECT d.txtConversionType, COUNT(d.txtConversionType) as count FROM crm.tblleads a JOIN crm.tblleadcampaignmap b ON a.id = b.refLeadId JOIN crm.tblactivity c ON b.id = c.refMapid JOIN crm.tblconversiontype d ON c.refConversionStatus = d.id WHERE d.txtConversionType = 'Prospect ';"
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result))
      resolve({ body: JSON.stringify(result) })
    })
  })
  return result;
};





module.exports.ProspectProgress = async (event) => {
  let sql = " select tl.txtFirstName,count(tc.txtConversionType ) as countfrom tblleads tl JOIN tblleadcampaignmap tm ON tl.id = tm.refLeadId JOIN tblactivity ta ON tm.id = ta.refMapid JOIN tblconversiontype tc ON tc.id = ta.refConversionStatus WHERE tc.txtConversionType = 'Prospect' GROUP BY (tl.txtFirstName);";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result))
      resolve({ body: JSON.stringify(result) })
    })
  })
  return result;
};

   

module.exports.SalespersonwiseSuccessRate = async (event) => {
  let sql = "SELECT tm.refLeadId,tl.txtFirstName,tc.txtConversionType,COUNT(txtFirstName) FROM tblleads tl JOIN tblleadcampaignmap tm ON tl.id = tm.refLeadId JOIN tblactivity ta ON tm.id = ta.refMapid JOIN tblconversiontype tc ON tc.id = ta.refConversionStatus WHERE tc.txtConversionType = 'Prospect' GROUP BY (tl.txtFirstName);;"
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result))
      resolve({ body: JSON.stringify(result) })
    })
  })
  return result;
};



module.exports.GetLeadListWithFilter = async (event) => {
  let request = JSON.parse(event.body);
  let username= request.CampaignNameusername;
  let name=requestname;
  let sql = "select * from tblleads where txtFirstName= '" +username+ "';";
  let result = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result))
      resolve({ body: JSON.stringify(result) })
      
      if (username!="" || name!="") {
        if(username!="" & name=="")
          {
           if(result!=""){
           reject("success"  + JSON.stringify(result));
          }
      else{
        reject("error");
          }
         }
        if(username=="" & name!="")
        {
         let sql = "select * from tblleads where txtFirstName like '" +name+ "';";
         con.query(sql, function (err, result1) {
          if (err) throw err;
          console.log(JSON.stringify(result))
          resolve({ body: JSON.stringify(result1) })
        if(result1!=""){
          reject("success"  + JSON.stringify(result1));
          }
             else{
              reject("error");
        }
 });
 
}
if(username!="" & name!=""){
  reject("please use username or name");
}


}
else{
  reject("username or name is mandatory ");
}
    })
  })
  return result;
};



//***************************************************************************************************************************************** */


module.exports.login=async (event)=>{
  let request =JSON.parse(event.body)
}






//***************************************************** */











module.exports.InsertSingleLead1 = async (event) => {
  let request = JSON.parse(event.body);
  let Salutation = request.Salutation;
  let Firstname =request.Firstname;
  let Middlename = request.Middlename;
  let Lastname = request.Lastname;
  let Title = request.Title;
  let Email = request.Email;
  let Mobile = request.Mobiler;
  let Company = request.Company;
  let Address = request.Address;
  let sql = "select txtEmail from tblleads where txtEmail =  '" + Email + "';"
  let sqlinsert ="insert into tblleads (Salutation,txtFirstName,Middlename,txtLastName,txtJobTitle,txtCompanyName,txtEmail,mobile,txtAddress) VALUES('"+Salutation+"','"+Firstname+"','"+Middlename+"','"+Lastname+"','"+Title+"','"+Company+"','"+Email+"','"+Mobile+"','"+Address+"') ;";
  let value = await new Promise((resolve, reject) => {
    if(Firstname=="" & Email=="" & Mobile=="" & Company=="" & Address==""){
      reject("firstname,email,mobile,company,address are mandatory")
    }

    else{
      con.query(sql, function (err, result) {
        if (err) throw err;
        if(result!=""){
          reject("lead already exist")
        }
        else{
          con.query(sqlinsert, function (err, result) {
            if (err) throw err;
            resolve("lead inserted")
            console.log("new lead details inserted")
           
      });
      }
    

   
    });


}

  })
  return value;
}

















module.exports.UpdateSingleLead = async (event) => {
  let request = JSON.parse(event.body)
  let firstname = request.firstname;
  let email = request.email;
  let Company = request.Company;
  let sql = "select txtEmail from tblleads where txtEmail =  '" + email + "';"
  let sqlupdate = "update tblleads    set  txtFirstName='"+firstname+"', txtCompanyName='"+Company+"',  txtEmail='"+email+"'  where txtEmail='"+email+"';";
  let value = await new Promise((resolve, reject) => {
  if(email==""){
    reject("email is mandatory")
  }
  else{
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("result="+JSON.stringify(result))
      if(result==""){
        reject("email not exist")
      }
      else{
        con.query(sqlupdate, function (err, result) {
          if (err) throw err;
          resolve("lead updated")
          console.log("lead details updated")
        });
    
      }
    });
  }
  })
  return value;
};










// const handler = require("./handler");
// describe("login api test", () => {
// test("Request without username and with password", async () => {
// const event = {
// body: {
// username: "",
// password: "test@123",
// },
// };
// const res = await handler.login(event);
// expect(res.body).toBe('{"status":"error","Message":"username missing"}');
// });
// test("Request without username and with password", async () => {
// const event = {
// body: {
// username: "abc@123",
// password: "",
// },
// };
// const res = await handler.login(event);
// expect(res.body).toBe('{"status":"error","Message":"password missing"}');
// });
// });










const handler = require("./handler");
describe("signup api test", () => {
test("Request without firstname and with email", async () => {
const event = {
body: {
firstname: "",
email: "test@123",
},
};
const res = await handler.signup(event);
expect(res.body).toBe('{"status":"error","Message":"firstname missing"}');
});
test("Request without firstname and with email", async () => {
const event = {
body: {
username: "abc@123",
password: "",
},
};
const res = await handler.signup(event);
expect(res.body).toBe('{"status":"error","Message":"email missing"}');
});
});
// "use strict";
// const jwt = require("jsonwebtoken");
// var mysql = require("mysql");
 
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "crm"
// });
 
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected");
// });


// //***************************************************MIDDLEWARE******************************************************************* */
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
    return { statuscode: 403, body: "Authentication failed" };
  }
  else{
    return{body: "key verified!"}
}
};
// //********************************************************************************************************************** */
// //********************************************************HELLO************************************************************** */
// // module.exports.hello = async (event) => {
// //   let request = JSON.parse(event.body);
// //   let username = request.username;
// //   let password = request.password;
// //   let sql =
// //     "SELECT id, txtFirstName FROM tblusers where txtFirstName='" +
// //     username +
// //     "' and txtPassword='" +
// //     password +
// //     "'";

   
// //   let value = await new Promise((resolve, reject) => {
// //     con.query(sql, function (err, result) {
// //       if (err) throw err;
      
// // console.log("Result: " + JSON.stringify(result));
// //       resolve({ body: JSON.stringify(result) });
// //     });
// //   });
 
// //   console.log("last line");
// //   return value;
// // };
// //********************************************************************************************************************** */



// //********************************************************LOGIN************************************************************** */
//   module.exports.Login = async (event) => {
//     let request = JSON.parse(event.body);
//     let username = request.username;
//     let password = request.password;
//     let sql ="SELECT txtEmail,txtPassword FROM crm.tblusers where txtFirstName='" +username +"' and txtPassword='" +password +"';";
//     let value = await new Promise((resolve, reject) => {
//       con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Result: " + JSON.stringify(result));
//         if (result == "") {
//           reject("username or password is incorrect");
//         } else {
//           const token=jwt.sign({ username: username , password: password }, "secretkey" );
//           resolve({ body: "Success: " +JSON.stringify(token) });
//         }
//       });
//     });
//     return value;
//   };
// //********************************************************************************************************************** */



// module.exports.Verifyotp = async (event) => {
//   let request = JSON.parse(event.body);
//   let email = request.email;
//   let otp = request.otp;
//   let sql ="SELECT id FROM crm.tblusers where txtOTP='" +otp +"' and txtEmail='" +email +"';";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       console.log(result);
//       if (err) throw err;
//       console.log("result: " + JSON.stringify(result));
//       if (result != "") {
//         resolve("verified!!!");
//       } else {
//         reject("incorrect otp");
//       }
//     });
//   });
//   return result;
// };







// module.exports.getsingleprofile = async (event) => {
//   let request = JSON.parse(event.body);
//   let email = request.email;
//   let sql =
//     "select txtFirstName,txtLastName,txtEmail,txtdob,txtAddress from tblusers where txtEmail = '" +
//     email +
//     "';";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Profile information displayed");
//       if (result != "") {
//         resolve({ body: "Profile Information: " + JSON.stringify(result) });
//         return;
//       } else {
//         reject("Profile Does Not Exist");
//         return;
//       }
//     });
//   });
//   return result;
// };


// //************************************************************INSERTSINGLELEAD*************************************************************************




// module.exports.InsertSingleLead = async (event) => {
//   let request = JSON.parse(event.body);
//   let Salutation = request.Salutation;
//   let Firstname =request.Firstname;
//   let Middlename = request.Middlename;
//   let Lastname = request.Lastname;
//   let Title = request.Title;
//   let Email = request.Email;
//   let Mobile = request.Mobiler;
//   let Company = request.Company;
//   let Address = request.Address;
//   let sql = "select txtEmail from tblleads where txtEmail =  '" + Email + "';"
//   let sqlinsert ="insert into tblleads (Salutation,txtFirstName,Middlename,txtLastName,txtJobTitle,txtCompanyName,txtEmail,mobile,txtAddress) VALUES('"+Salutation+"','"+Firstname+"','"+Middlename+"','"+Lastname+"','"+Title+"','"+Company+"','"+Email+"','"+Mobile+"','"+Address+"') ;";
//   let result = await new Promise((resolve, reject) => {
//     if(Firstname=="" & Email=="" & Mobile=="" & Company=="" & Address==""){
//       reject("firstname,email,mobile,company,address are mandatory")
//     }
//     else{
//       con.query(sql, function (err, result) {
//         if (err) throw err;
//         if(result!=""){
//           reject("lead already exist")
//         }
//         else{
//           con.query(sqlinsert, function (err, result) {
//             if (err) throw err;
//             resolve("lead inserted")
//             console.log("new lead details inserted")
           
//       });
//       }
    

   
//     });


// }
//   });
//   return result;
// };







// //*****************************************************************************************************************************************


// //********************************************************UPDATESINGLELEAD************************************************************** */





// module.exports.UpdateSingleLead = async (event) => {
//   let request = JSON.parse(event.body);
//   let firstname = request.firstname;
//   let email = request.email;
//   let Company = request.Company;
//   let sql = "select txtEmail from tblleads where txtEmail =  '" + email + "';"
//   let sqlupdate = "update tblleads    set  txtFirstName='"+firstname+"', txtCompanyName='"+Company+"',  txtEmail='"+email+"'  where txtEmail='"+email+"';";
//   let result = await new Promise((resolve, reject) => {
//     if(email==""){
//       reject("email is mandatory")
//     }
//     else{
//       con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("result="+JSON.stringify(result))
//         if(result==""){
//           reject("email not exist")
//         }
//         else{
//           con.query(sqlupdate, function (err, result) {
//             if (err) throw err;
//             resolve("lead updated")
//             console.log("lead details updated")
//           });
      
//         }
//       });
//     }
//   });
//   return result;
// };





// //*****************************************************************************************************************************************

// //********************************************************GETCAMPAIGNLISTWITHFILTER************************************************************** */
// module.exports.GetCampaignListWithFilter= async (event) => {
//   let request = JSON.parse(event.body)
//   let campaignname= request.campaignname;
//   let filter=request.filter;
//   let sql = "select txtCampaignname,txtDescription from tblcampaign where  txtCampaignName='"+campaignname+"' or txtCampaignName like '%"+filter+"%';";
//   let value = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err
//       if(campaignname!="" || filter!=""){
//         if(result!=""){
     
//           resolve({ body: "campaign Information: " + JSON.stringify(result) })
     
//        }
//        else{
//         reject("campaign not exist")
//        }
//       }
//       else{
//         reject("enter campaignname or filter")
//       }
//     });
//     });
//    return value;


// };
//********************************************************************************************************************* */




// module.exports.Insertsingleprofile = async (event) => {
//   let request = JSON.parse(event.body);
//   let firstname = request.firstname;
//   let email = request.email;
//   let password = request.password;
//   let repassword = request.repassword;
//   let sql = "SELECT txtEmail FROM tblusers where txtEmail='" + email + "';";
//   let sql1 =
//     "insert into tblusers(txtFirstName,txtEmail,txtPassword) values ('" +
//     firstname +
//     "','" +
//     email +
//     "','" +
//     password +
//     "');";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result:" + JSON.stringify(result));
//       if (result != "") {
//         reject("User already exists");
//       } else if (firstname == "") {
//         reject("Firstname is Mandatory");
//       } else if (email == "") {
//         reject("Email is Mandatory");
//       } else if (password == "") {
//         reject("Password is Mandatory");
//       } else if (repassword == "") {
//         reject("RePassword is Mandatory");
//       } else if (password != repassword) {
//         reject("Passwords Do not Match");
//       } else {
//         con.query(sql1, function (err, result) {
//           if (err) throw err;
//           console.log("1 Record Inserted");
//           resolve({ body: "Record Updated" + JSON.stringify(result) });
//         });
//       }
//     });
//   });
//   return result;
// };

// module.exports.UpdateSingleProfile = async (event) => {
//   let request = JSON.parse(event.body);
//   let id = request.id;
//   let firstname = request.firstname;
//   let lastname = request.lastname;
//   let email = request.email;
//   let dob = request.dob;
//   let address = request.address;
//   let sql = "select id from tblusers where id = " + id + " ;";
//   let sql1 =
//     "update crm.tblusers set txtFirstName = '" +
//     firstname +
//     "',txtLastName = '" +
//     lastname +
//     "',txtEmail = '" +
//     email +
//     "',txtdob ='" +
//     dob +
//     "',txtAddress = '" +
//     address +
//     "' where id = " +
//     id +
//     " ;";
//   let result = await new Promise((resolve, reject) => {
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       if (result != "") {
//         con.query(sql1, function (err, result) {
//           resolve({ body: "Record Updated" + JSON.stringify(result) });
//         });
//       } else {
//         reject("Profile does not exist");
//       }
//     });
//   });
//   return result;
// };

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
//         resolve({
//           body:
//             "Campaign details for selected Campaign" + JSON.stringify(result),
//         });
//         return;
//       } else {
//         reject("Campaign Does Not Exist");
//         return;
//       }
//     });
//   });
//   return result;
// };






// "use strict";
// module.exports.login = async (event) => {
// let req = event.body;
// if (req.username == "") {
// return {
// statusCode: 200,
// body: JSON.stringify({
// status: "error",
// Message: "username missing",
// }),
// };
// } else if (req.password == "") {
// return {
// statusCode: 200,
// body: JSON.stringify({
// status: "error",
// Message: "password missing",
// }),
// };
// } else {
// return {
// statusCode: 200,
// body: JSON.stringify({
// status: "success",
// Message: "Successfully Done!",
// }),
// };
// }
// };



//   module.exports.Login = async (event) => {
//     let request = JSON.parse(event.body);
//     let username = request.username;
//     let password = request.password;
//     let sql ="SELECT txtEmail,txtPassword FROM crm.tblusers where txtFirstName='" +username +"' and txtPassword='" +password +"';";
//     let value = await new Promise((resolve, reject) => {
//       con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Result: " + JSON.stringify(result));
//         if (result == "") {
//           reject("username or password is incorrect");
//         } else {
//           const token=jwt.sign({ username: username , password: password }, "secretkey" );
//           resolve({ body: "Success: " +JSON.stringify(token) });
//         }
        
//       });
//     });
//     return value;
//   };












// "use strict";
// module.exports.signup = async (event) => {
// let req = event.body;
// if (req.firstname == "") {
// return {
// statusCode: 200,
// body: JSON.stringify({
// status: "error",
// Message: "firstname missing",
// }),
// };
// } else if (req.email == "") {
// return {
// statusCode: 200,
// body: JSON.stringify({
// status: "error",
// Message: "email missing",
// }),
// };
// } else {
// return {
// statusCode: 200,
// body: JSON.stringify({
// status: "success",
// Message: "Successfully Done!",
// }),
// };
// }
// };








module.exports.Login = async (event) => {
  let request = event.body;
  let username = request.username;
  let password = request.password;
  let sql =
    "SELECT txtEmail,txtPassword FROM crm.tblusers where txtEmail='" +
    username +
    "' and txtPassword='" +
    password +
    "';";
  let result = await new Promise((resolve, reject) => {
    if (username ==""){
        resolve({ body: JSON.stringify( {status : "error", Message: "username missing"}) })
        return
      }
      if (password ==""){
        resolve({ body: JSON.stringify( {status : "error", Message: "password missing"}) })
        return
      }

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));
      if (result == "") {
        reject("username or password is incorrect");
      } else {
        const token = jwt.sign(
          { username: username, password: password },
          "secretkey"
        );
        resolve({ body: "Success: " + JSON.stringify(token) });
      }
    });
  });
  return result;
};
# Welcome to Serverless!
#
# This file is the main config file for your service.
# It's very minimal at this point and uses default values.
# You can always add more config options for more control.
# We've included some commented out config examples here.
# Just uncomment any of them to get that config option.
#
# For full config options, check the docs:
#    docs.serverless.com
#
# Happy Coding!

service: myservice
# app and org for use with dashboard.serverless.com
#app: your-app-name
#org: your-org-name

# You can pin your service to only deploy with a specific Serverless version
# Check out our docs for more details
frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs12.x

# you can overwrite defaults here
#  stage: dev
#  region: us-east-1

# you can add statements to the Lambda function's IAM Role here
#  iam:
#    role:
#      statements:
#        - Effect: "Allow"
#          Action:
#            - "s3:ListBucket"
#          Resource: { "Fn::Join" : ["", ["arn:aws:s3:::", { "Ref" : "ServerlessDeploymentBucket" } ] ]  }
#        - Effect: "Allow"
#          Action:
#            - "s3:PutObject"
#          Resource:
#            Fn::Join:
#              - ""
#              - - "arn:aws:s3:::"
#                - "Ref" : "ServerlessDeploymentBucket"
#                - "/*"

# you can define service wide environment variables here
#  environment:
#    variable1: value1

# you can add packaging information here
#package:
#  patterns:
#    - '!exclude-me.js'
#    - '!exclude-me-dir/**'
#    - include-me.js
#    - include-me-dir/**

functions:
  middleware :
    handler: handler.middleware
    events:
     - http:
          method: post
          path: /middleware       
  Login :
    handler: handler.Login
    events:
     - http:
          method: post
          path: /Login
  signup :
    handler: handler.signup
    events:
     - http:
          method: post
          path: /signup
  Verifyotp :
    handler: handler.Verifyotp
    events:
     - http:
          method: post
          path: /Verifyotp
  getsingleprofile :
    handler: handler.getsingleprofile
    events:
     - http:
          method: post
          path: /getsingleprofile
    middleware:
       pre: 
        - handler.middleware 
  InsertSingleLead :
    handler: handler.InsertSingleLead
    events:
     - http:
          method: post
          path: /InsertSingleLead
    middleware:
       pre: 
        - handler.middleware 
  UpdateSingleLead :
    handler: handler.UpdateSingleLead
    events:
     - http:
          method: post
          path: /UpdateSingleLead
    middleware:
       pre: 
        - handler.middleware 
  GetCampaignListWithFilter :
    handler: handler.GetCampaignListWithFilter
    events:
     - http:
          method: post
          path: /GetCampaignListWithFilter
    middleware:
       pre: 
        - handler.middleware

#    The following are a few example events you can configure
#    NOTE: Please make sure to change your handler code to work with those events
#    Check the event documentation for details
#    events:
#      - httpApi:
#          path: /users/create
#          method: get
#      - websocket: $connect
#      - s3: ${env:BUCKET}
#      - schedule: rate(10 minutes)
#      - sns: greeter-topic
#      - stream: arn:aws:dynamodb:region:XXXXXX:table/foo/stream/1970-01-01T00:00:00.000
#      - alexaSkill: amzn1.ask.skill.xx-xx-xx-xx
#      - alexaSmartHome: amzn1.ask.skill.xx-xx-xx-xx
#      - iot:
#          sql: "SELECT * FROM 'some_topic'"
#      - cloudwatchEvent:
#          event:
#            source:
#              - "aws.ec2"
#            detail-type:
#              - "EC2 Instance State-change Notification"
#            detail:
#              state:
#                - pending
#      - cloudwatchLog: '/aws/lambda/hello'
#      - cognitoUserPool:
#          pool: MyUserPool
#          trigger: PreSignUp
#      - alb:
#          listenerArn: arn:aws:elasticloadbalancing:us-east-1:XXXXXX:listener/app/my-load-balancer/50dc6c495c0c9188/
#          priority: 1
#          conditions:
#            host: example.com
#            path: /hello

#    Define function environment variables here
#    environment:
#      variable2: value2

# you can add CloudFormation resource templates here
#resources:
#  Resources:
#    NewResource:
#      Type: AWS::S3::Bucket
#      Properties:
#        BucketName: my-new-bucket
#  Outputs:
#     NewOutput:
#       Description: "Description for the output"
#       Value: "Some output value"
plugins:
  - serverless-offline
  - serverless-middleware










  module.exports.login = async (event) => {
  
  let request = JSON.parse(event.body)
  let email = request.email;
  let password = request.password;
  let sql = "SELECT id, txtEmail FROM tblusers where txtEmail='" + email + "' and txtPassword='" + password + "'";
  let prom = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      if (result != "") {
        const token = jwt.sign({ email: email, password: password }, "secretkey");
        resolve({ body: JSON.stringify(token) });
        // console.log("Login Success:" + JSON.stringify(result));
      }
      else if (password == "" || email == "") {
        reject("Both the fields are mandatory");
      } else {
        reject("Login details incorrect!");
      }
    });
  });
  return prom;
};




odule.exports.Getlead= async (event) => {

  let request=JSON.parse(event.body);
  let sqlGetlead ="select  tblleads.txtFirstName firstname, tblcampaign.txtCampaignName campaignname, DATE(tblleads.dtCreatedOn) createdon, DATE(tblleads.dtUpdatedOn) updatedon, tblusers.txtFirstName username   from  tblusers join tblleads on tblusers.id=tblleads.refCreatedBy  join tblleadcampaignmap on tblleadcampaignmap.refLeadId=tblleads.id  join tblcampaign on tblcampaign.id=tblleadcampaignmap.refCampaignId  join tblactivity on tblactivity.refMapid=tblleads.id  join tblconversiontype on tblconversiontype.id=tblactivity.refConversionStatus  group by tblleads.txtFirstName"
  
  let result = await new Promise((resolve,reject) => {
    con.query(sqlGetlead, function (err, result) {
      if (err) throw err;
      console.log("selected lead Details");
      if(result!=""){
        const response={
          statusCode:200,
          headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credendials':true,
        },body:JSON.stringify(result)
        };
        resolve(response);
     }else{
        reject({body:"leadname not exist"});
        return;
      }
    
    });
  });
  return result;
}




module.exports.login = async (event) => {
  
  let request = JSON.parse(event.body)
  let email = request.email;
  let password = request.password;
  let sql = "SELECT id, txtEmail FROM tblusers where txtEmail='" + email + "' and txtPassword='" + password + "'";
  let prom = await new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) throw err;
      if (result != "") {
        const token = jwt.sign({ email: email, password: password }, "secretkey");
        resolve({ body: JSON.stringify(token) });
// c1
        const response={
          statusCode:200,
          headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credendials':true,
        },body:JSON.stringify(result)
        };
        resolve(response);
// c1
        // console.log("Login Success:" + JSON.stringify(result));
      }
      // c1
      // else if (password == "" || email == "") {
      //   reject("Both the fields are mandatory");
      // } else {
      //   reject("Login details incorrect!");
      // }
      // c1
      else{
        reject({body:"Login details incorrect!"});
        return;
    });
  });
  return prom;
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
  return prom;
};