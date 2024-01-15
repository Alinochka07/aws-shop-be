import "source-map-support";
import { formatJSONResponse } from "../../libs/api-gateway";
import { DynamoDB } from "aws-sdk";
const dynamoDB = new DynamoDB.DocumentClient();
export const getProductsList = async (event) => {
    try {
        const params = {
            TableName: "Products",
        };
        const dynamoDBResponse = await dynamoDB.scan(params).promise();
        const productsWithStock = dynamoDBResponse.Items
            ? await Promise.all(dynamoDBResponse.Items.map(async (item) => {
                const stockParams = {
                    TableName: "Stocks",
                    KeyConditionExpression: "product_id = :pid",
                    ExpressionAttributeValues: {
                        ":pid": item.id
                    }
                };
                const stockResult = await dynamoDB.query(stockParams).promise();
                const stock = stockResult.Items;
                return {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    description: item.description,
                    count: stock?.count || 0,
                };
            }))
            : [];
        const response = formatJSONResponse(productsWithStock, 200, {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        });
        console.log("Event:", JSON.stringify(event, null, 2));
        return response;
    }
    catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
//# sourceMappingURL=handler.js.map