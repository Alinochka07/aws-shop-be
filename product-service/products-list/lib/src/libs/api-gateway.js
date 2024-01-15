export const formatJSONResponse = (response, statusCode = 200, headers) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(response),
        headers,
    };
};
//# sourceMappingURL=api-gateway.js.map