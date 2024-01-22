// const AWS = require('aws-sdk');
// const csv = require('csv-parser');

// module.exports = {
    
// };

// const PARSING_BUCKET = 'parsingbucket';  

// module.exports = {
//     importFileParser: async function(event) {
//         const s3 = new AWS.S3({
//             region: "eu-west-1"
//         });

//         const { Records } = event;

//         const recordsPromises = Records.map(async record => {
//             const { s3: { bucket, object } } = record;
//             const key = object.key;

//             if (!key.startsWith('uploaded/')) {
//                 console.log(`Ignoring non-'uploaded/' object: ${key}`);
//                 return;
//             }

//             try {

//                 const importProductParams = {
//                     Bucket: BUCKET,
//                     Key: key
//                 };
//                 const s3Stream = s3.getObject(importProductParams).createReadStream();

//                 // Parse the CSV content
//                 const parsedData = await parseCSVStream(s3Stream);

//                 // Optionally, copy the file to the parsingbucket
//                 await s3.copyObject({
//                     Bucket: PARSING_BUCKET,
//                     CopySource: `${BUCKET}/${key}`,
//                     Key: key.replace('uploaded/', ''),
//                 }).promise();

//                 console.log(`File copied to ${PARSING_BUCKET}: ${key}`);

//                 // Optionally, delete the original file from importproduct
//                 await s3.deleteObject({
//                     Bucket: BUCKET,
//                     Key: key,
//                 }).promise();

//                 console.log(`Original file deleted from ${BUCKET}: ${key}`);

//                 console.log('Parsed data:', parsedData);
//             } catch (error) {
//                 console.error('Error importing file parser', error);
//                 throw error;
//             }
//         });

//         try {
//             await Promise.all(recordsPromises);
//         } catch (error) {
//             console.error('Error in Promise.all: ', error);
//             return {
//                 statusCode: 500,
//                 body: JSON.stringify({ error: 'Internal Server Error' }),
//                 headers: { 'Access-Control-Allow-Origin': '*' },
//             };
//         }

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: 'Processing complete' }),
//             headers: {"Access-Control-Allow-Origin": "*"}
//         };
//     }
// };

// async function parseCSVStream(stream) {
//     return new Promise((resolve, reject) => {
//         const parsedData = [];

//         stream.pipe(csv())
//             .on('data', data => parsedData.push(data))
//             .on('error', error => reject(error))
//             .on('end', () => resolve(parsedData));
//     });
// }



