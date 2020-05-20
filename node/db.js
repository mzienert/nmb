const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com",
  region: 'us-west-2',
  accessKeyId: 'AKIAIVL4OZ44KEJYSP4A',
  secretAccessKey: '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',
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;
