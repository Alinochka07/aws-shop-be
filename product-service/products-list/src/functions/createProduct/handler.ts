import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { formatJSONResponse } from "../../libs/api-gateway";
import { DynamoDB } from "aws-sdk";


const dynamoDB = new DynamoDB.DocumentClient();

interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
  }

export const createProduct: APIGatewayProxyHandler = async (event) => {
    const headers = {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    }
    try {
        console.log(`Event: ${event}`);
        const requestBody = JSON.parse(event.body || "{}");

        if (!requestBody.title || !requestBody.description || !requestBody.price) {
            return formatJSONResponse({ error: "Missing required fields" }, 400, headers);
        };
        const productId = generateProductId();

        const newProduct: Product = {
            id: productId,
            title: requestBody.title,
            description: requestBody.description,
            price: parseFloat(requestBody.price),
        };

        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: "Products",
            Item: newProduct,
        };

        await dynamoDB.put(params).promise();

        return formatJSONResponse({ product: newProduct }, 201, headers);

    } catch (error) {
        console.error("Error:", error);
        return formatJSONResponse({ error: 'Internal Server Error' }, 500, headers);
    }
}

function generateProductId(): string {
    return Math.random().toString(36).substr(2, 9);
  }