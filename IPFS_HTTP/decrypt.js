const crypto = require('crypto');
const fs = require("fs");
const AES = require('./aes');

let password = fs.readFileSync("/home/taylor/share1/IPFS_HTTP/aes_password.txt",'utf-8');  //对称算法密钥
var Path = "/home/taylor/share1/IPFS_HTTP/a1234_encrypted.txt";
let buff = AES.decrypt(fs.readFileSync(Path),password);
let file_name = Path.split("/")[Path.split("/").length-1];
let file_name_0 = file_name.split(".")[0];
let file_name_1 = file_name.split(".")[1];
var savePath = "/home/taylor/share1/IPFS_HTTP/" + file_name_0 + "_decrypted." + file_name_1;
fs.writeFileSync(savePath,buff);