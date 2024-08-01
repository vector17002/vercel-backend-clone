import express from "express"
import cors from "cors"
import { generateId } from "./utils/generateId";
import simpleGit from "simple-git";
import path from "path"
import { getAllFiles } from "./utils/getAllfile";
import { uploadToS3 } from "./utils/uploadingS3";
require('dotenv').config()
import { buildProject } from "./utils/buildProject";

const app = express();
const git = simpleGit()
app.use(cors())
app.use(express.json())

app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl
    const id = generateId()
    // cloning the repository in our local machine
    await git.clone(repoUrl , path.join(__dirname , `out/${id}`))

    // try to build the html/js files first and then upload them in the s3 rather than uploading the git files
    await buildProject(id)

    // getting all the files paths so that we can upload the files to our aws object store or S3
    const files = getAllFiles(path.join(__dirname , `out/${id}/dist`))

    files.forEach(async file => {
        // file.slice will give out/123v5/src/App.jsx whereas file wiil give /Users/anshkumain/Desktop/Projects/vercel/dist/out/y25sd/src/assets/loader.svg
        await uploadToS3(file.slice(__dirname.length + 1) , file)
    })
    res.json({
        id: id
    })
})

app.listen(3000, () => {
    console.log("Server running at port : 3000")
})