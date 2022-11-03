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
      "insert into crm2.tblleads(txtSuffix, txtFirstName, txtLastName, txtCompanyName, txtPhone, txtEmail, txtAddress, refCreatedby, dtCreatedOn, status1) VALUES('" + suffix + "', '" + firstname + "','" + lastname + "','" + company + "','" + phone + "','" + email + "','" + address + "','" + createdBy + "','" + createdOn +  "', 'Pending');";
  
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
  module.exports.checklist = async (event) => {
    let request = JSON.parse(event.body);
    let userid = request.userid;
    let CampaignId = request.CampaignId;
    let LeadId = request.LeadId;
    let sql = "insert into tblleadcampaignmap(refLeadId,refCampaignId,refCreatedBy,dtCreatedOn )values('" + LeadId + "','" + CampaignId + "','" + userid + "', CURRENT_DATE() );";
    let result = await new Promise((resolve, reject) => {
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("fetching");
        if (result !== "") {
          const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            }, body: JSON.stringify("ok"),
          };
          resolve(response);
        }
        else {
          const response = {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            }, body: JSON.stringify("error"),
          };
          resolve(response);
        };
  
      });
    });
    return result;
  };