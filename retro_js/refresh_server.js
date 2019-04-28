//main.js
const fs = require('fs');
const object = require('./object');
//const ipfs = require('/home/taylor/node_modules/ipfs-api/src')('localhost', 5001)
const ipfsFile = require('./ipfsFile.js');
const init = require('./init.js');
const ipfs = require(init.source)('localhost', 5001)
const publish = require('./publish.js');
const name =require('./name');


let Published_server_key = init.key;

//console.log("\nbug,现在上传什么都是a1234.txt！！！\n")
//首先更新server（同步其他节点对server文件的更新到本地文件）
name.resolve(Published_server_key).then((hash)=>{
	console.log(hash);
	let file_name_old = hash.split('/')[2];
	console.log('server.json更新成功',file_name_old);
	ipfsFile.get(file_name_old).then((hash)=>{
		fs.writeFileSync(init.server,hash);
		});

});