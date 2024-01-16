import "source-map-support/register";
import { formatJSONResponse } from "../../libs/api-gateway";
import { DynamoDB } from "aws-sdk";
const dynamoDB = new DynamoDB.DocumentClient();
export const createProduct = async (event) => {
    const headers = {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    };
    try {
        console.log(`Event: ${event}`);
        const requestBody = JSON.parse(event.body || "{}");
        if (!requestBody.title || !requestBody.description || !requestBody.price) {
            return formatJSONResponse({ error: "Missing required fields" }, 400, headers);
        }
        ;
        const productId = generateProductId();
        const newProduct = {
            id: productId,
            title: requestBody.title,
            description: requestBody.description,
            price: parseFloat(requestBody.price),
        };
        const params = {
            TableName: "Products",
            Item: newProduct,
        };
        await dynamoDB.put(params).promise();
        return formatJSONResponse({ product: newProduct }, 201, headers);
    }
    catch (error) {
        console.error("Error:", error);
        return formatJSONResponse({ error: 'Internal Server Error' }, 500, headers);
    }
};
function generateProductId() {
    return Math.random().toString(36).substr(2, 9);
}
//# sourceMappingURL=handler.js.map