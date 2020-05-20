
/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com",
  region: 'us-west-2',
  accessKeyId: 'AKIAIVL4OZ44KEJYSP4A',
  secretAccessKey: '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',
});


/*var dynamodb = new AWS.DynamoDB();

var params = {
  TableName : "Events",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH"},  //Partition key
    { AttributeName: "date", KeyType: "RANGE" }  //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "date", AttributeType: "N" },
    { AttributeName: "id", AttributeType: "N" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});*/


var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Events";

var date = Date.now();
var title = "The Big New Movie 4";

var params = {
  TableName:table,
  Item:{
    "date": date,
    "title": title,
    "id": 4,
    "info":{
      "plot": "Nothing happens at all.",
      "rating": 0
    }
  }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
  if (err) {
    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Added item:", JSON.stringify(data, null, 2));
  }
});



