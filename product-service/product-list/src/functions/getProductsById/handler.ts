import { APIGatewayProxyHandler } from "aws-lambda";
import 'source-map-support/register';
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


export const getProductsById: APIGatewayProxyHandler = async (event) => {
    try {
        console.log('Event:', event);
        const productId = parseInt(event.pathParameters?.productId ?? '');

        console.log("Parsed productId:", productId);

        if (isNaN(productId)) {
            throw new Error('Invalid productId parameter');
        }

        const searchedProduct = data.products.find((product) => product.id === productId);

        if (!searchedProduct) {
            return formatJSONResponse(
              {
                error: `Product with ID ${productId} not found`,
              },
              404,
            );
          }
      
          return formatJSONResponse({
            product: searchedProduct,
          });
      
        } catch (error) {
          const message = (error instanceof Error) ? error.message : "An unexpected error occurred";
      
          return formatJSONResponse(
            {
              error: message,
            },
            400, 
          );
        }
};
