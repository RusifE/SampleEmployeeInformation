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

// exports.handler = async (event) => {
// // exports.handler = (event, context, callback) => {
//      // // TODO implement
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
//     // callback(null, '{"FirstName": "Rusif", "LastName": "Eyvazli", "Email": "rusif.eyvazli@lcginc.com"}');
    
// };
