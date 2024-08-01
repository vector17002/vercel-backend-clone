import {exec} from "child_process"
import path from "path"

const currPath = __dirname.substring(0 , __dirname.length - 6)
export const buildProject = (id : string) => {
   return new Promise((resolve) => {
    const child = exec(`cd ${path.join(currPath, `out/${id}`)} && npm install && npm run build`)

    child.stdout?.on('data' , function(data) {
        console.log('stdout:' + data)
    })

    child.stderr?.on('data' , function(data){
        console.log('stderr:'+ data)
    })

    child.on('close', function(code){
        resolve("")
    })
   })
}
