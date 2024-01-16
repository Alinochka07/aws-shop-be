import * as AWS from "aws-sdk";
import { DynamoDBDocument, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import * as dotenv from "dotenv";

dotenv.config();


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const dynamoDB = DynamoDBDocument.from(new DynamoDB());

const tableName = "Products_DynamoDB";

const item = {
    id: "2fksdkf-vwsfjsAWfd",
    title: "Item inserted using script",
    price: 30,
    description: "This is the description of Item that inserted using scripts, for Task-4"
}

const params: PutCommandInput = {
    TableName: tableName,
    Item: item
}

dynamoDB.put(params, (err, data) => {
    if (err) {
        console.error("Error inserting item", err)
    } else {
        console.log("Item inserted sucessfulyy", data)
    }
});


