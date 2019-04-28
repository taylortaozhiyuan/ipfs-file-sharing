
var dir_certi = "/home/taylor/share1/RETRO_JS/a1234.txt";	//要溯源的文件的绝对路径
var file_name = dir_certi.split("/")[dir_certi.split("/").length-1];								//要溯源的文件名
var server = "/home/taylor/share1/RETRO_JS/server.json";				//存储建链所有文件的信息的分布式表格
//console.log(file_name);
module.exports.dir = dir_certi;
module.exports.server = server;
module.exports.file = file_name;



//下面5个是缓存文件
module.exports.temp_write = '/home/taylor/share1/RETRO_JS/temp.txt';
module.exports.temp_write1 = '/home/taylor/share1/RETRO_JS/temp1.txt';
module.exports.temp_write2 = '/home/taylor/share1/RETRO_JS/temp2.txt';
module.exports.temp_write3 = '/home/taylor/share1/RETRO_JS/temp3.txt';
module.exports.temp_write4 = '/home/taylor/share1/RETRO_JS/log_tail.txt';
module.exports.version = "/home/taylor/share1/RETRO_JS/version.txt";

module.exports.key ='/ipns/QmVukC9q7ASWWwjG4inmNsHZwfekmQR3gPQEn2niD5NS5n';//这行是ipns的地址，如果更换key的话需要修改这里
module.exports.source = "/home/taylor/node_modules/ipfs-api/src";			//这个是js-ipfs-api的路径，需要从github下载
module.exports.sample = '/home/taylor/share1/RETRO_JS/sample.json';
module.exports.root_hash = "QmdpWvLmfTFBSNRvvEXKHYgjTzNz1WBuA62JuTPirE1oqU";//root文件的哈希值，如果修改root文件要在这里改一下hash


//所有用到的文件包括
//main.js
//object.js
//init.js
//ipfsFile.js
//name.js
// /home/taylor/ipfs_test/temp2.txt
// /home/taylor/ipfs_test/server.json
// /home/taylor/ipfs_test/temp.txt
// /home/taylor/ipfs_test/sample.json
// root.json
