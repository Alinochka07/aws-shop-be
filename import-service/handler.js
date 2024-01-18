const AWS = require('aws-sdk');
const BUCKET = 'task5bucket';

module.exports = {
    importProductsFile: async function(event) {
        const s3 = new AWS.S3({ region: "eu-west-1"});
        const catalogPath = `uploaded/catalog.csv`;
        const { name } = event.queryStringParameters;

        if (!name) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing 'name' parameter in the query string" })
            }
        };

        const params = {
            Bucket: BUCKET,
            Key: catalogPath,
            Expires: 60,
            ContentType: 'text/csv'
        };

        try {
            const signedURL = await s3.getSignedUrlPromise('PutObject', params);
                console.log('Generated signed url: ', signedURL);
            
            return {
                statusCode: 200,
                body: JSON.stringify({ signedURL })
            }

        } catch (error) {
            console.error('Error generating Signed URL: ', error);
        }

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Internal Server Error'
            })
        }
    }
}