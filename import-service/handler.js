const csv = require('csv-parser');

const { S3 } = require('aws-sdk');

const s3 = new S3();


const importProductsFile = async (event) => {
    try {
        const { name } = event.queryStringParameters;

        if (!name) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Name parameter is required in the query string' }),
            };
        }

        const fileName = `uploaded/${name}`;

        const signedUrl = await s3.getSignedUrlPromise('putObject', {
            Bucket: 'importproduct',
            Key: fileName,
            Expires: 60,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ signedUrl }),
        };
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};


const importFileParser = async (event) => {
    try {
        console.log('Event:', JSON.stringify(event, null, 2));
        const records = [];

        if (event.Records && Array.isArray(event.Records)) {
            for (const record of event.Records) {
                const s3Object = record.s3.object;
                const s3Bucket = record.s3.bucket.name;
        
                const params = {
                    Bucket: s3Bucket,
                    Key: s3Object.key,
                };
      
                const stream = s3.getObject(params).createReadStream();
      
                await new Promise((resolve, reject) => {
                    stream.pipe(csv())
                    .on('data', (data) => {
                    records.push(data);
                    })
                    .on('end', resolve)
                    .on('error', reject);
                });
                console.log('Records:', records);
            }
        } else {
            console.log('Event does not contain Records property.');
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'File parsing initiated' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Internal Server Error: ${error.message}` }),
        };
    }
};

module.exports = {
    importProductsFile,
    importFileParser,
};
