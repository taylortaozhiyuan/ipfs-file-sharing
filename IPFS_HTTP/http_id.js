var path=require("path");
var fs=require("fs");
var http=require("http");
var request=require("request");
 
var url="http://192.168.56.1:5001/api/v0/id";
//var hash ="QmTdJGAwVNRS7chCWZ2hozaNVkbYPNEaBCkFb2kKFXTFKc";

var request = require('request');
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // 打印
  }
  else{console.log(body)}
})

/*
是这样：首先要两台电脑（或者虚拟机），一台作为中间服务（称为A服务器），另一台作为IPFS服务网关（称为B），B需要修改ipfs config文件，
将API监听端口改成0.0.0.0:5001，AB需要在同一个局域网内，在我这里，B是192.168.56.1，A是192.168.56.101，其次AB要在同一个IPFS私网内
IPFS私网搭建过程省略，是否在私网内检测方式ipfs ping hash_of_node。然后两个节点如果都需要用到同一个IPNS publish的key的话还需要拷贝key
文件。
具体测试方式见图，js会提取命令行的参数
*/