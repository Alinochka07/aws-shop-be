import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, QueryCommand, PutCommand } from '@aws-sdk/lib-dynamodb';


const dynamoDBClient = new DynamoDBClient({ 
    region: 'eu-west-1',
});

const dynamoDocumentClient = DynamoDBDocumentClient.from(dynamoDBClient);

const scan = async () => {
  const scanResults = await dynamoDocumentClient.send(new ScanCommand({
    TableName: process.env.PRODUCTS_TABLE,
  }));
  return scanResults.Items;
};

const query = async (id: string) => {
  const queryResults = await dynamoDocumentClient.send(new QueryCommand({
    TableName: process.env.PRODUCTS_TABLE,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: { ':id': id },
  }));
  return queryResults.Items;
};

const put = async (item: any) => {
  return dynamoDocumentClient.send(new PutCommand({
    TableName: process.env.PRODUCTS_TABLE,
    Item: item,
  }));
};

export const handler = async (event: any) => {
  const scanResults = await scan();
  const queryResults = await query('1fksdkf-gkkfjsAWfd');

  const item = { 
    id: 'gk083jfls-gdjfjks-534fkslsA', 
    title: "Inserted from Lambda function on CLI", 
    description: 'This is the description to item 3',
    price: 200
 };
  await put(item);
  const putResults = await scan();

  return { scanResults, queryResults, putResults };
};
