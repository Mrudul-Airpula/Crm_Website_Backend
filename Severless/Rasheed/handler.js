'use strict';

var mysql = require("mysql");
const Joi = require('joi');

 var con = mysql.createConnection({


  host: "crm.ciozo2gsp2ag.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "SAZ",
  password: "password",
  database: "crm2",
});

con.connect(function (err) {
  if (err) throw err;
  // console.log("Connected");
});


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
};


// module.exports.Login = async (event) => {
//   let request = JSON.parse(event.body);
//   let username = request.username;
//   let password = request.password;
 

//   let sql =
//     " SELECT A.txtEmail,A.txtPassword,B.txtJobTitle FROM tblusers A join tbljobtitle B on A.refJobTitle=B.id  where txtEmail='" + username + "' and txtPassword='" + password + "';";
//   let result = await new Promise((resolve, reject) => {


//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Result: " + JSON.stringify(result));
//       if (result != "") {
//         const token = jwt.sign(
//           { username: username, password: password }, "secretkey");
//           const response = {
//             statusCode: 200,
//             headers: {
//               'Access-Control-Allow-Origin': '*',
//               'Access-Control-Allow-Credentials': true,
//             }, body:JSON.stringify(token) 
//           };
//         resolve(response);
       
//       } else {
//         const response = {
//           statusCode: 200,
//           headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Credentials': true,
//           }, body: "Email or Password is invalid"+ JSON.stringify(result)
//         };
//         resolve(response)
//       }
//       // if (validate.error){
//       //   resolve()    }
//     });
//   });

//   console.log("last line ");
//   return result;

// };

module.exports.Login = async (event) => {
  let request = JSON.parse(event.body);
  let username = request.username;
  let password = request.password;
    let sql = "select id,txtFirstName from tblusers where  txtEmail='" + username + "' and txtPassword='" + password + "'";
    let result = await new Promise((resolve, reject) => {

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        if (result =="") {
          const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            }, body: "Email or Password is invalid " + JSON.stringify(result)
          };
          resolve(response)
           
        }
        else {
          const token = jwt.sign(
            { username: username, password: password }, "secretkey");
            const response = {
              statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              }, body:  JSON.stringify(token)
            };
            resolve(response)
          
        }
    });
  })
  console.log("last line ");
  return result;

};


module.exports.signup = async (event) => {
  let request = JSON.parse(event.body);
  let firstname = request.firstname;
  let lastname = request.lastname;
  let email = request.email;
  let password = request.password;
  let repassword = request.repassword;
  let OTP = request.OTP;
  let sql = "select txtFirstName,txtEmail from tblusers where txtEmail= '" + email + "'";
  let sqlinsert = "insert into tblusers(txtFirstName,txtLastName,txtEmail,txtPassword,txtOTP) values('" + firstname + "','" + lastname + "','" + email + "','" + password + "','" + OTP + "')";



  let result = await new Promise((resolve, reject) => {

    if (firstname == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: "firstname is mandatory"
      };
      resolve(response)
      return
    }
    if (email == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: "email is mandatory"
      };
      resolve(response)
      return
    }
    if (password == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: "password is mandatory"
      };
      resolve(response)
      return
    }
    if (repassword == "") {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: "repassword is mandatory"
      };
      resolve(response)
      return
    }

    if (repassword != password) {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body: "repassword not match"
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
          }, body: "email already exists" + JSON.stringify(result)
        };

        resolve(response)
      }
      else {
        con.query(sqlinsert, function (err, result) {
          if (err) throw err;
          console.log("user added" + JSON.stringify(result));
          const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            }, body: "user added" + JSON.stringify(result)
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
 

module.exports.verifyotp = async (event) => {
let request = JSON.parse(event.body);
let OTP = request.OTP;
let email = request.email;

 
  let sql = "select id,txtOTP,txtEmail from tblusers where  txtEmail='" + email + "'";
  let sqlupdate="update tblusers set txtDeleteflag=1 where id=36 and txtOTP='"+OTP+"'";

  let result = await new Promise((resolve, reject) => {
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result == "") {
      resolve("Incorrect OTP")
      
    }
    else {
      con.query(sqlupdate, function (err, result) {
        if (err) throw err;
        console.log("updated" + JSON.stringify(result));
        const response = {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          }, body:"verify and updated" + JSON.stringify(result)
        };
         resolve( response);
         
      
      });
          }
  });
  
   
  });
  console.log("last line ");
  return result;
 
}

module.exports.resend = async (event) => {
let request = JSON.parse(event.body);
let OTP = request.OTP;
let email = request.email;
 
  let sqlupdate = "update tblusers set txtOTP='"+OTP+"' where id=36";
  let sql = "select id,txtOTP,txtEmail from tblusers where  txtEmail='" + email + "'";
  let result = await new Promise((resolve, reject) => {

  con.query(sqlupdate, function(err, result){
    if (err) throw err;
    console.log("otp updated" + JSON.stringify(result));
    
    
    //resolve("otp  updated" + JSON.stringify(result));
    
   
  });
 
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result == "") {
      resolve("incorrect otp")
    }else{
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }, body:"verify" + JSON.stringify(result)
      };
    resolve(response)
    
    }

  });
});
 
  console.log("last line ");
  return result;

}




