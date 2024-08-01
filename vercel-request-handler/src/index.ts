import express from "express"
import {S3} from "aws-sdk"

const s3 = new S3({
        accessKeyId: "86014a03416aa1e81a76c6b36394915f",
        secretAccessKey: "bc2251bac42e21bbcbfacafa14fa468a269fe25410a699bf8c5b1cc165a85f25",
        endpoint: "https://7b0ffcb11544b10a064c62aeeb15ac5b.r2.cloudflarestorage.com"
})

const app = express()

app.get("/*" , async (req , res) => {
    const host = req.hostname
    // get this id from res.json from the other backend and create a url from this on the domain for now a=it will be hosted on the local 
    // machine and we have to manually add host name as 127.0.0.1 to that url host name
    const id = host.split(".")[0]

    const filePath = req.path
    console.log(filePath)

    const content = await s3.getObject({
        Bucket: "vercel-project",
        Key:   `out/${id}/dist${filePath}`
    }).promise()

    const contentType = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : filePath.endsWith("svg") ? "image/svg+xml" : "application/javascript"
    res.set("Content-Type", contentType)

    res.send(content.Body)
})


app.listen(3001 , () => {
    console.log('Server running at port 3001')
})