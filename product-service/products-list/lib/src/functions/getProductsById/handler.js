import "source-map-support/register";
import { formatJSONResponse } from "../../libs/api-gateway";
import { DynamoDB } from "aws-sdk";
const dynamoDB = new DynamoDB.DocumentClient();
export const getProductsById = async (event) => {
    try {
        console.log("Event:", event);
        const { productId } = event.pathParameters || {};
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        };
        if (!productId) {
            return formatJSONResponse({ error: `Invalid productId parameter: ${productId}` }, 400, headers);
        }
        console.log(`product ID: ${productId}`);
        const productParams = {
            TableName: "Products",
            Key: {
                id: productId,
            },
        };
        const productResult = await dynamoDB.get(productParams).promise();
        if (!productResult.Item) {
            throw new Error(`Product with ID ${productId} not found`);
        }
        const product = productResult.Item;
        const stockParams = {
            TableName: "Stocks",
            KeyConditionExpression: "product_id = :pid",
            ExpressionAttributeValues: {
                ":pid": productId,
            },
        };
        const stockResult = await dynamoDB.query(stockParams).promise();
        const stock = stockResult.Items;
        const productWithStock = {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            count: stock?.count || 0,
        };
        console.log(productWithStock);
        return formatJSONResponse({ product: productWithStock }, 200, headers);
    }
    catch (error) {
        console.error("Error:", error);
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        };
        return formatJSONResponse({ error: 'Internal Server Error' }, 500, headers);
    }
};
//# sourceMappingURL=handler.js.map