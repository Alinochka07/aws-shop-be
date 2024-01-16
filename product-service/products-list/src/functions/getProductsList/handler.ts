import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support";
import { formatJSONResponse } from "../../libs/api-gateway";
import { DynamoDB } from "aws-sdk";

const dynamoDB = new DynamoDB.DocumentClient();

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
}

interface Stock {
  product_id: string;
  count: number;
}

export const getProductsList: APIGatewayProxyHandler = async (event) => {
  try {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: "Products",
    };
    const dynamoDBResponse = await dynamoDB.scan(params).promise();

    const productsWithStock: Product[] = dynamoDBResponse.Items
      ? await Promise.all(
          dynamoDBResponse.Items.map(async (item) => {
            const stockParams: DynamoDB.DocumentClient.QueryInput = {
              TableName: "Stocks",
              KeyConditionExpression: "product_id = :pid",
              ExpressionAttributeValues: {
                ":pid": item.id
              }
            };

            const stockResult = await dynamoDB.query(stockParams).promise();
            const stock: Stock | undefined = stockResult.Items as Stock | undefined;

            return {
              id: item.id,
              title: item.title,
              price: item.price,
              description: item.description,
              count: stock?.count || 0,
            };
          })
        )
      : [];

    const response = formatJSONResponse(productsWithStock, 200, {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    });

    console.log("Event:", JSON.stringify(event, null, 2));
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
