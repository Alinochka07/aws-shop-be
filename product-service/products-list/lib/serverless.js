const serverlessConfiguration = {
    service: "products-list",
    frameworkVersion: "3",
    plugins: ["serverless-esbuild"],
    provider: {
        name: "aws",
        runtime: "nodejs16.x",
        region: "eu-west-1",
    },
    functions: {
        getProductsList: {
            handler: "./src/functions/getProductsList/index.getProductsList",
            events: [
                {
                    http: {
                        path: "products",
                        method: "get",
                        cors: {
                            origin: "*",
                        },
                    },
                },
            ],
        },
        getProductsById: {
            handler: "./src/functions/getProductsById/index.getProductsById",
            events: [
                {
                    http: {
                        path: "products/{productId}",
                        method: "get",
                        cors: {
                            origin: "*",
                        },
                    },
                },
            ],
        },
        createProduct: {
            handler: "./src/functions/createProduct/index.createProduct",
            events: [
                {
                    http: {
                        path: "products",
                        method: "post",
                        cors: {
                            origin: "*",
                        },
                    },
                },
            ],
        },
    },
};
module.exports = serverlessConfiguration;
export {};
//# sourceMappingURL=serverless.js.map