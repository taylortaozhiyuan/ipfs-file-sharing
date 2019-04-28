var path=require("path");
var fs=require("fs");
var http=require("http");
var request=require("request");
var name_file = "/home/taylor/share1/IPFS_HTTP/file_list.json"
//var name_file = "C:\\Users\\taylor\\Documents\\share\\IPFS_HTTP\\file_list.json"
 
var url="http://192.168.56.1:5001/api/v0/cat/";
var hash = process.argv.slice(2)[0];//命令行传参
console.log(hash);
//var hash ="QmdeUsPQytd9veWAB85Kj3d2oihJ8S2cMzgyonDCm5gssy";

var request = require('request');

request(url+hash, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // 打印
    //console.log(typeof(body));
    boundary = "--------------surprise----------------";
    start = body.indexOf(boundary);
    end = body.indexOf(boundary,start+1);                           //这里不能用lastindexOf,报错原因未知？？？？？？？
    //console.log(start,end,body.substring(start+boundary.length,end));
    let name_list = fs.readFileSync(name_file);
    let file_name = JSON.parse(name_list)[hash][0]; 
    //var Save_path = '/home/taylor/share1/IPFS_HTTP/'+file_name;
    var Save_path = '/home/taylor/share1/pyWeb-master/uploadfile/'+file_name;
    console.log(Save_path);
    fs.writeFile(Save_path,body.substring(start+boundary.length,end),function(err) {
        if (err) {
            return console.error(err);
        }
    });
  }
  else{console.log(body)}
})