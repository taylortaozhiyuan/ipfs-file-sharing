var path=require("path");
var fs=require("fs");
var http=require("http");
 
//post值payload
var getfield=function(field, value) {
    return 'Content-Disposition: form-data; name="'+field+'"\r\n\r\n'+value+'\r\n';
}
 
//文件payload
var getfieldHead=function (field, filename) {
    var fileFieldHead='Content-Disposition: form-data; name="'+field+'"; filename="'+filename+'"\r\n'+'Content-Type: '+getMime(filename)+'\r\n\r\n';
    return fileFieldHead;
}
//获取Mime
var getMime=function (filename) {
    var mimes = {
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.js': 'appliction/json',
        '.torrent': 'application/octet-stream'
    };
    var ext = path.extname(filename);
    var mime = mimes[ext];
    mime=!!mime?mime:'application/octet-stream';
    return mime;
}
//获取边界检查随机串
var getBoundary=function() {
    var max = 9007199254740992;
    var dec = Math.random() * max;
    var hex = dec.toString(36);
    var boundary = hex;
    return boundary;
}
//获取boundary
var getBoundaryBorder=function (boundary) {
    return '--'+boundary+'\r\n';
}
//字段格式化
function fieldPayload(opts) {
    var payload=[];
    for(var id in opts.field){
        payload.push(getfield(id,opts.field[id]));
    }
    payload.push("");
    return payload.join(getBoundaryBorder(opts.boundary));
}
 
//post数据
function postRequest (opts) {
    filereadstream(opts,function (buffer) {
        var options=require('url').parse(opts.url);
        var Header={};
        var h=getBoundaryBorder(opts.boundary);
        var e=fieldPayload(opts);
        var a=getfieldHead(opts.param,opts.file);
        var d="\r\n"+h;
        Header["Content-Length"]=Buffer.byteLength(h+e+a+d)+buffer.length;
        Header["Content-Type"]='multipart/form-data; boundary='+opts.boundary;
        options.headers=Header;
        options.method='POST';
        var req=http.request(options,function(res){
            var data='';
            res.on('data', function (chunk) {
                data+=chunk;
                //return chunk.toString();
            });
            res.on('end', function () {
                console.log(res.statusCode)
                console.log(data);
                //console.log("标记1");
                //return data;
                
            });
        });
        req.write(h+e+a);//log.diy(h+e+a+buffer+d);
        req.write(buffer);
        req.end(d);
    });
    
}
//读取文件
function filereadstream(opts, fn) {
    var readstream = fs.createReadStream(opts.file,{flags:'r',encoding:null});
    var chunks=[];
    var length = 0;
    readstream.on('data', function(chunk) {
        length += chunk.length;
        chunks.push(chunk);
    });
    readstream.on('end', function() {
        var buffer = new Buffer(length);
        for(var i = 0, pos = 0, size = chunks.length; i < size; i++) {
            chunks[i].copy(buffer, pos);
            pos += chunks[i].length;
        }
        fn(buffer);
    });
}
 
//各类设置
var opt={
    "url":"http://192.168.56.11:5001/api/v0/add/",//url
    "file":"/home/taylor/ipfs_test/123456.jpg",//文件位置
    "param":"file",//文件上传字段名
    "field":{//其余post字段
        "client":"1",
        "title":"ok"
    },
    "boundary":"----WebKitFormBoundary"+getBoundary()
}
 
postRequest(opt);
exports.postRequest=postRequest;
//export default postRequest(){};
/*
------WebKitFormBoundaryuzKmkAovUuYsQ1Dt\r\n
Content-Disposition: form-data; name="file"; filename="00.jpg"\r\n
Content-Type: application/octet-stream
\r\n
\r\n +file\r\n
------WebKitFormBoundaryuzKmkAovUuYsQ1Dt\r\n
Content-Disposition: form-data; name="fieldName"
\r\n
\r\n +value\r\n
------WebKitFormBoundaryuzKmkAovUuYsQ1Dt--
*/
