//test object put
'use strict'
//const object = require('./object');
const fs = require('fs');
const init = require('./init.js');
//const ipfs = require('/home/taylor/node_modules/ipfs-api/src')('localhost', 5001)
const ipfs = require(init.source)('localhost', 5001)

//操作文件
//let addPath = "/home/taylor/ipfs_test/node1.json";
//let buff0 = fs.readFileSync(addPath);
//let buff  = JSON.parse(buff0);

exports.add = (buff) =>{
	return new Promise((resolve,reject)=>{
		try {
			ipfs.object.put(buff, function (err, res) {
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
exports.get = (hash) =>{
	return new Promise((resolve,reject)=>{
		try {
			ipfs.object.get(hash, function (err, res) {
				if (err) {
					return console.log('got an error', err)
				}else{
					console.log(res);
					resolve(res);
				}
			})
		}catch (ex){
			reject(ex);
		}
	});
}
exports.links = (hash) =>{
	return new Promise((resolve,reject)=>{
		try {
			ipfs.object.links(hash, function (err, res) {
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
exports.data = (hash) =>{
	return new Promise((resolve,reject)=>{
		try {
			ipfs.object.data(hash, function (err, res) {
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