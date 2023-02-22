
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, function () {
    console.log("app is running on port 3000");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signUp.html");
});



//mailchimp part http post info
const mailChimp = require("@mailchimp/mailchimp_marketing");
mailChimp.setConfig({
    apiKey: "dd5eed73c957d9eeff7f8ceb6fbdaa73-us10",
    server: "us10",
});
const listId = "3b501717f8";




app.post("/", function (req, res) {
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
   
    async function run() {
        const response = await mailChimp.lists.addListMember(listId, {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName,
            }
        });
        
        console.log(
            `Successfully added contact as an audience member. The contact's id is ${response.id
            }.`
        );
        
    }
    run();  
    res.sendFile(__dirname+"/success.html");
});

// const postIt = async () => {
//     const response = await mailchimpClient.lists.batchListMembers(MAILCHIMP_LIST_ID, {
//       members: [member],
//       update_existing: false
//     });
//     if (response.errors.length) { 
//          throw new Error(response.errors);
//     }
//   };
//   postIt().catch(errors => console.log(errors));


