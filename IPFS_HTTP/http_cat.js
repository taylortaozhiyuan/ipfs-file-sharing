var path=require("path");
var fs=require("fs");
var http=require("http");
var request=require("request");
 
var url="http://192.168.56.1:5001/api/v0/cat/";
var hash ="QmTdJGAwVNRS7chCWZ2hozaNVkbYPNEaBCkFb2kKFXTFKc";

var request = require('request');
request(url+hash, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // 打印
  }
  else{console.log(body)}
})