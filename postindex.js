var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();

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

// exports.handler = async (event) => {
//     // TODO implement
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
// };
