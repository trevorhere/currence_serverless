const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const moment = require('moment')
const sha1 = require('sha1')
const unixTime = require('unix-time');
const FileType = require('file-type');
const Bucket = "currence-profile-images";



const imageUploader =  async ( image: string, alias: string ) => {

    try {
    const buffer = new Buffer(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    var params = {
        Bucket,
        Key: alias, 
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
      };

    const data = async () => {
        let url = await s3.putObject(params).promise();
        return url;
    }

    return await data();
} catch(error){
    console.log('ERROR::S3.imageUploader: ', error.message)
}
    
}

const getFileInfo = ( file, buffer ) => {
    let ext = file.ext;
    let hash = sha1(new Buffer(new Date().toString()))
    let now =  moment().format('YYYY-MM-DD HH:MM:SS')

    let path = hash + '/';
    let name = unixTime(now) + '.' + ext
    let fullName = path + name
    let fullPath = Bucket + fullName;

    let params = {
        Bucket,
        Key: fullName + ext,
        Body: buffer
    }

    let upload = {
        size: buffer.toString('ascii').length,
        type: file.mime,
        name: fullName,
        full_path: fullPath
    }

    return {
        'params': params,
        'uploadFile': upload
    }
}

export {
    imageUploader
}