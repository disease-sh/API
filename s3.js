var AWS = require('aws-sdk');
const config = require('./config.json');

AWS.config.region = config.aws.region;

const s3Client = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const todaysDate = new Date();
const formattedDate = todaysDate.getFullYear() 
    + "-" + ("0" + (todaysDate.getMonth() + 1)).slice(-2)
    + "-" + ("0" + todaysDate.getDate()).slice(-2);

const uploadFile = (objectName, payload) => {
    var params = {
        Bucket: config.aws.bucket,
        Key: objectName,
        ContentType: 'application/json',
        Body: payload,
        ACL: 'public-read'
    };

    // Upload Today's statistics into the bucket
    s3Client.upload(params, function(s3Err, data) {
        if (s3Err) throw s3Err
        console.log(`File uploaded successfully at ${data.Location}`)
    });

    // Archive the daily statistics in a dated folder
    params.Key = formattedDate + "/" + objectName;
    s3Client.upload(params, function(s3Err, data) {
        if (s3Err) throw s3Err
        console.log(`File uploaded successfully at ${data.Location}`)
    });
};



module.exports = {
    uploadFile
};