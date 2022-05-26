const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();  //connects to DynamoDB

var tableName = "CustomerDetails";  // table to connect to

exports.handler = (event, context, callback) => {
    console.log(event.EmailID)
    
    var params = {                  // we will get data by emailId, so need to params to DynaamoDB
        TableName : tableName,
        Key:{                       // will pass from ApiGateway
        "EmailID" : event.EmailID // event is the object we get data we are passing from APIGateway in that Json structure name would be EmailID
        }
    }
    
    docClient.get(params, function(err,data){
     callback(err, data);   
    })
};

exports.handler = (event, context, callback) => {
    var tableName = "CustomerDetails";
    var params = {
        TableName : tableName,
        Item : {
            "EmailID" : event.EmailID,
            "FirstName" : event.FirstName,
            "LastName" : event.LastName
        }
    };
    
    docClient.put(params, function(err, data){
        if(err){
            callback(err)
        } else{
            callback(null, "Succesfully updated data")
        }
    })
};

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});