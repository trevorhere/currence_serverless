const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const Bucket = "currence-profile-images";

const imageUploader =  async ( image: string, alias: string ): Promise<string> => {
    try {

    const base64 = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = new Buffer(base64, "base64");
    const type = image.split(';')[0].split('/')[1];
    // console.log('type: \n', type);
    // console.log('buffer: \n', buffer);
    // console.log('base64: \n', base64);
    // console.log('image: \n\n', image);





    var params = {
        Bucket,
        Key: `${alias}.${type}`, 
        Body: buffer,
        ContentEncoding: 'base64',
        ACL: 'public-read',
        ContentType: `image/${type}`
      };


    const data = async () => {
        let url = await s3.putObject(params).promise();
        return `https://currence-profile-images.s3.amazonaws.com/${alias}.${type}`;
    }

    return await data();
} catch(error){
    console.log('ERROR::S3.imageUploader: ', error.message)
}
    
}

export {
    imageUploader
}