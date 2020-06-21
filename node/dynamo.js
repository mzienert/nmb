require('dotenv').config();
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
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});


var dynamodb = new AWS.DynamoDB();

var params = {
  TableName : "Data",
  KeySchema: [
    { AttributeName: "page", KeyType: "HASH"},  //Partition key
    { AttributeName: "type", KeyType: "RANGE" }  //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "page", AttributeType: "S" },
    { AttributeName: "type", AttributeType: "S" }
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
});


/*
var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Content";

var name = "bg-img";

var params = {
  TableName:table,
  Item:{
    "name": name,
    "id": 3,
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
*/





