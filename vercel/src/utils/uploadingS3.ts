import S3 from 'aws-sdk/clients/s3';
import fs from "fs"


const s3 = new S3({
    accessKeyId: "86014a03416aa1e81a76c6b36394915f",
    secretAccessKey: "bc2251bac42e21bbcbfacafa14fa468a269fe25410a699bf8c5b1cc165a85f25",
    endpoint: "https://7b0ffcb11544b10a064c62aeeb15ac5b.r2.cloudflarestorage.com"
})

// file path is the path which will be present in our s3 bucket
// -> out/123su/src/App.jsx
// local file path will be our path which will be present in our local system from which they will be uploaded to s3
// -> User/anshKumain/Desktop/Projects/vercel

export const uploadToS3 = async (filePath : string , localFilePath: string) => {
   const currfileContent = fs.readFileSync(localFilePath)
   const response = await s3.upload({
    Body: currfileContent,
    Bucket: "vercel-project",
    Key: filePath
   }).promise()
}