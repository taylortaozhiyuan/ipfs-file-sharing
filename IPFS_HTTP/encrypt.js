const crypto = require('crypto');
const fs = require("fs");
const AES = require('./aes');

let password = crypto.randomBytes(32).toString("hex");  //对称算法密钥
console.log(password);
fs.writeFileSync("/home/taylor/share1/IPFS_HTTP/aes_password.txt",password);
var addPath = "/home/taylor/share1/IPFS_HTTP/a1234.txt";
let buff = AES.encrypt(fs.readFileSync(addPath),password);
let file_name = addPath.split("/")[addPath.split("/").length-1];
let file_name_0 = file_name.split(".")[0];
let file_name_1 = file_name.split(".")[1];
var savePath = "/home/taylor/share1/IPFS_HTTP/" + file_name_0 + "_encrypted." + file_name_1;
fs.writeFileSync(savePath,buff);