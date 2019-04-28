var path=require("path");
var fs=require("fs");
var http=require("http");
var request=require("request");
var name_file = "/home/taylor/share1/IPFS_HTTP/file_list.json"

 
var url="http://192.168.56.1:5001/api/v0/cat/";
var hash = process.argv.slice(2)[0];//命令行传参
console.log(hash);
//var hash ="QmdeUsPQytd9veWAB85Kj3d2oihJ8S2cMzgyonDCm5gssy";

var request = require('request');
let name_list = fs.readFileSync(name_file);
let file_name = "";
if(JSON.parse(name_list).hasOwnProperty([hash])){
    file_name = JSON.parse(name_list)[hash][0];
}
else{
    file_name = hash;
}
 
var Save_path = '/home/taylor/share1/IPFS_HTTP/'+file_name;
request(url+hash, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    for(i=0;i<body.length;i++){
        //console.log(parseInt(body[i],16)); // 打印
    }
    console.log(file_name);
    fs.writeFileSync(Save_path,body);
    if (error) {
            return console.error(err);
    }
  }
  else{console.log(body)}
})