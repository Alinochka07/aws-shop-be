import { APIGatewayProxyHandler } from "aws-lambda";
import 'source-map-support';
import { formatJSONResponse } from '@libs/api-gateway';

interface Product {
    id: number;
    title: string;
}

const data: { products: Product[] } = {
    products: [
        { id: 1, title: 'Product 1' },
        { id: 2, title: 'Product 2' },
        { id: 3, title: 'Product 3' },
    ],
};

export const getProductsList: APIGatewayProxyHandler = async (event) => {
    console.log(`event: ${event}`)
    return formatJSONResponse ({
        products: data.products,
    })
}
