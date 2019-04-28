var path=require("path");
var fs=require("fs");
var http=require("http");
var name_file = "/home/taylor/share1/IPFS_HTTP/file_list.json"//存储文件名的位置

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
                let temp = chunk.toString().split('\r\n')[0].replace(/[\r\n]/g,"");
                if(temp.split('"')[3].length!=46){          //找到最终文件返回hash那一次的返回值
                    console.log(temp);
                    let file_path_now = temp.split('"')[3];
                    let file_hash_now = temp.split('"')[7];
                    //console.log(file_path_now.length);
                    let file_name_now = file_path_now.split("/")[file_path_now.split("/").length-1];
                    //console.log(file_name_now);
                    let name_list = JSON.parse(fs.readFileSync(name_file,'utf-8'));
                    name_list[file_hash_now]=["","",""];
                    name_list[file_hash_now][0]=file_name_now;
                    name_list[file_hash_now][1]=file_path_now;
                    fs.writeFileSync(name_file,JSON.stringify(name_list));
                }
                //return chunk.toString();
            });
            res.on('end', function () {
                console.log(res.statusCode)
                //console.log(data);
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
    //"file":"/home/taylor/ipfs_test/123456.jpg",//文件位置
    "file":process.argv.slice(2)[0],//命令行输入参数，也可改成传参
    "param":"file",//文件上传字段名
    "field":{//其余post字段
        "client":"1",
        "title":"ok"
    },
    "boundary":"----WebKitFormBoundary"+getBoundary()
}

function file_protection(opt1){                 //boundary做法局限于文本型文件，现在废弃改用cat
    console.log("fileeeeeeeeeeeeeeeeee",opt1['file']);
    data = fs.readFileSync(opt1["file"],"utf-8");
    boundary = "--------------surprise----------------";
    data = boundary + data + boundary;
    fs.writeFileSync(opt1["file"],data);
    console.log(data);
    return opt1;
}
//postRequest(file_protection(opt));
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
