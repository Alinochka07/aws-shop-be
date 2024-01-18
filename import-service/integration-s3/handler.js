const AWS = require("aws-sdk");
const BUCKET = "nodeinawss3"

module.exports = {
    thumbnailsList: async function() {
        const s3 = new AWS.S3({
            region: "eu-west-1"
        });
        let statusCode = 200;
        let body = {};
        let thumbnails = [];
        const params = {
            Bucket: BUCKET,
            Prefix: "thumbnails/"
        };

        try {
            const s3Response = await s3.listObjectsV2(params).promise();
            thumbnails = s3Response.Contents;
            body = JSON.stringify(
                thumbnails
                    .filter(thumbnail => thumbnail.Size)
                    .map(thumbnail => `https://${BUCKET}.s3.amazonaws.com/${thumbnail.Key}`)
            );
        } catch (error) {
            console.error("Error with responding thumbnails: " + error)
            statusCode = 500;
            body = error;
        }
        return {
            statusCode,
            headers: {"Access-Control-Allow-Origin": "*"},
            body
        }
    },

    imageUpload: async function(event){
        const s3 = new AWS.S3({
            region: "eu-west-1"
        })
    
        for(const record of event.Records) {
            await s3.copyObject({
                Bucket: BUCKET,
                CopySource: BUCKET + "/" + record.s3.object.key,
                Key: record.s3.object.key.replace('images', 'thumbnails')
            }).promise()

            await s3.deleteObject({
                Bucket: BUCKET,
                Key: record.s3.object.key
            }).promise();
            
            console.log('Thumbnail for an image ' + record.s3.object.key.split('/')[1] + ' is created!')
        }
        return {
            statusCode: 202,
        }
    }    
}