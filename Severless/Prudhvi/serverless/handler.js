'use strict';
var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "crm"
// });
var con = mysql.createConnection({
  host: "crm.ciozo2gsp2ag.us-east-1.rds.amazonaws.com",
  port:"3306",
  user: "SAZ",
  password: "password",
  database: "crm2",
});


con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


// s
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
        resolve({ body: JSON.stringify(token) });
        console.log("Login Success:" + JSON.stringify(result));
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

module.exports.GetSingleCampaign = async (event) => {
  let request =JSON.parse(event.body);
  let sqlSinglecampaign =
    "SELECT A.id, txtCampaignName CampaignName,ParentCampaignName,Status1 Status,dtStartdate Startdate,dtEnddate Enddate,Responses,tu.txtFirstName Owner FROM crm2.tblcampaign A join tblusers tu group by txtCampaignName";
  let result = await new Promise((resolve, reject) => {
    con.query(sqlSinglecampaign, function (err, result) {
      if (err) throw err;
      console.log("Selected Campaign Details");
      if (result != "") {
        const response={
          statusCode:200,
          headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credendials':true,
        },body:JSON.stringify(result)
        };
        resolve(response);
      } else {
        reject({body:"Campaign Does Not Exist"});
        return;
      }
    });
  });
  return result;
};
