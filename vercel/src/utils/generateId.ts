export const generateId = () =>{
 let ans =  "";
 const maxLength = 5;
 const characters = "abcdefghijklmnopqrstuvwxyz1234567890"
 for(let i = 0;i < maxLength;i++){
    ans += characters[Math.floor(Math.random() * characters.length)];
 }

 return ans;
}