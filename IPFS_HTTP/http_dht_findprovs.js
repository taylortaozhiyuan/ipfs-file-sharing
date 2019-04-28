var path=require("path");
var fs=require("fs");
var http=require("http");
var request=require("request");
 
var url="http://192.168.56.11:5001/api/v0/dht/findprovs?arg=";
//var hash ="QmcSeKeqvw99CbBSWx7AdXxytnAkNHffo1H3c3PazpBjc6";
var hash = process.argv.slice(2)[0];//命令行传参
var request = require('request');
request(url+hash, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // 打印
  }
  else{console.log("目标不存在或服务器错误")}
})