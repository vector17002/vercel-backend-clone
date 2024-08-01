// getting all files and folder paths in an array
import fs from "fs"
import path from "path"
export const getAllFiles = (folderPath : string) => {
  let files : string[] = []

  const allFilesAndFolder = fs.readdirSync(folderPath);
  allFilesAndFolder.forEach(file => {
    const currFilePath = path.join(folderPath ,file)

    // checking for folder in a folder and if found a folder again recursively calling the function for getting the files path inside that folder
    if(fs.statSync(currFilePath).isDirectory()){
        files = files.concat(getAllFiles(currFilePath))
    }
    else{
        files.push(currFilePath)
    }
  })
   return files
}
