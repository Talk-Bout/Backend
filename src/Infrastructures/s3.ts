import 'dotenv/config'
import fs from 'fs'
import S3 from 'aws-sdk/clients/s3'

/* 
  This file will be deprecated soon
  the code will be moved to image.controller.ts
*/

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to S3
export function uploadFile(file: any) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName as string,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

