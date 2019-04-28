//ipns相关函数export
const fs = require('fs');
const init = require('./init.js');
//const ipfs = require('/home/taylor/node_modules/ipfs-api/src')('localhost', 5001)
const ipfs = require(init.source)('localhost', 5001)

exports.publish = (buff,key) =>{
	return new Promise((resolve,reject)=>{
		try {
			ipfs.name.publish(buff,key, function (err, res) {
				if (err) {
					return console.log('got an error', err)
				}else{
					//console.log(res);
					resolve(res);
				}
			})
		}catch (ex){
			reject(ex);
		}
	});
}
exports.resolve = (buff) =>{
	return new Promise((resolve,reject)=>{
		try {
			ipfs.name.resolve(buff, function (err, res) {
				if (err) {
					return console.log('got an error in name_resolve', err)
				}else{
					//console.log(res);
					resolve(res);
				}
			})
		}catch (ex){
			reject(ex);
		}
	});
}
