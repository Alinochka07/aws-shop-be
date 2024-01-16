"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = require("aws-sdk");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var dotenv = require("dotenv");
dotenv.config();
// JS SDK v3 does not support global configuration.
// Codemod has attempted to pass values to each service client in this file.
// You may need to update clients outside of this file, if they use global config.
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
var dynamoDB = lib_dynamodb_1.DynamoDBDocument.from(new client_dynamodb_1.DynamoDB());
var tableName = "Products_DynamoDB";
var item = {
    id: "2fksdkf-vwsfjsAWfd",
    title: "Item inserted using script",
    price: 30,
    description: "This is the description of Item that inserted using scripts, for Task-4"
};
var params = {
    TableName: tableName,
    Item: item
};
dynamoDB.put(params, function (err, data) {
    if (err) {
        console.error("Error inserting item", err);
    }
    else {
        console.log("Item inserted sucessfulyy", data);
    }
});
