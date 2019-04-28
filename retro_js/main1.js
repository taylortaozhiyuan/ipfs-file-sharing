//main.js
const fs = require('fs');
const object = require('./object');
//const ipfs = require('/home/taylor/node_modules/ipfs-api/src')('localhost', 5001)
const ipfsFile = require('./ipfsFile.js');
const init = require('./init.js');
const ipfs = require(init.source)('localhost', 5001)
const publish = require('./publish.js');
const name =require('./name');


var exec = require('child_process').exec;
//var cmdStr = 'ipfs add -r ' + init.dir_to_add;
var re = /{.*?}/g;//正则匹配获取link内容
var version = 0;
var chuan = [];
var cmdStr = 'ipfs name publish --key=server ';

let temp_write = init.temp_write;
let dir_to_record = process.argv.slice(2)[0];//命令行传参
let buff = fs.readFileSync(dir_to_record);
let dir_to_record_name = dir_to_record.split("/")[dir_to_record.split("/").length-1];
let server = init.server;
let writePath = init.temp_write1;
let server_list = fs.readFileSync(server,'utf-8');
let version_file = init.version;
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

}).then(()=>{


ipfsFile.add(buff).then((hash)=>{
    //console.log(hash);
	fs.writeFileSync(temp_write,hash);
	return fs.readFileSync(temp_write,'utf-8');//ipfs add得到hash
}).then((hash1)=>{
	//let server_list = fs.readFileSync(server,'utf-8');改为全局
    let list_parse = JSON.parse(server_list); //在server找记录
	console.log('测试000000',dir_to_record_name,"0000000",list_parse[dir_to_record_name]);
	if (!list_parse.hasOwnProperty(dir_to_record_name)){
		console.log("正常0");
		//现在创建json
		//let new_json = JSON.parse(fs.readFileSync('/home/taylor/ipfs_test/sample.json','utf-8'));
		let new_json = JSON.parse(fs.readFileSync(init.sample,'utf-8'));

		//console.log(new_json);
		new_json["Data"] = hash1;
		let name = new_json["Links"][0]["Name"];
		let name_res = JSON.parse(name);
		var myDate = new Date();
		name_res["last_revised_time"] = myDate.toLocaleString();
		name_res["file_version"] = 0; 
		new_json["Links"][0]["Name"] = JSON.stringify(name_res);
		//new_json["Links"][0]["Hash"] = "QmdpWvLmfTFBSNRvvEXKHYgjTzNz1WBuA62JuTPirE1oqU";
		new_json["Links"][0]["Hash"] = init.root_hash;

		//所有文件的第一个对象都指向这个根
		//console.log(new_json);
		
		//json文件改完，现在开始ipfs object put
		object.add(new_json).then((hash2)=>{
			fs.writeFileSync(writePath,hash2);
			return fs.readFileSync(writePath,'utf-8');
		}).then((read)=>{
				//console.log(read);
				//put成功，现在开始添加server;***当前版本server为单机版kvs
				
				let server_edit = JSON.parse(server_list);
				server_edit[dir_to_record_name] = [" "," "]
				server_edit[dir_to_record_name][0] = hash1;
				server_edit[dir_to_record_name][1] = read.slice(9,55);
				console.log(server_edit);
                fs.writeFileSync(server,JSON.stringify(server_edit));
                return fs.readFileSync(server,'utf-8');
        }).then((read1)=>{
                ipfsFile.add(fs.readFileSync(server)).then((hash)=>{
                    //console.log(hash);
                    fs.writeFileSync(temp_write,hash);
                    return fs.readFileSync(temp_write,'utf-8');//ipfs add得到hash
                }).then((hash1)=>{
                    cmdStr += hash1;
                    console.log(cmdStr);
                    console.log(publish.publish(cmdStr));
        }).catch((err)=>{
			console.log(err);
			});
		}).catch((err)=>{
			console.log(err);
			});
	}
	else if (list_parse[dir_to_record_name][0] == hash1){
		console.log("文件没有改动");
		}
	else{				//文件有改动，开始更新链信息
		console.log("False");
		console.log("当前hash：",hash1);
		console.log("上次记录的hash：",list_parse[dir_to_record_name][0]);
		//let new_json = JSON.parse(fs.readFileSync('/home/taylor/ipfs_test/sample.json','utf-8'));
		var new_json = JSON.parse(fs.readFileSync(init.sample,'utf-8'));

		//console.log(typeof(new_json));
		new_json["Data"] = hash1;
		let name = new_json["Links"][0]["Name"];
		let name_res = JSON.parse(name);
		var myDate = new Date();
		name_res["last_revised_time"] = myDate.toLocaleString();
		console.log(JSON.parse(server_list)[dir_to_record_name][1]);
		object.links(JSON.parse(server_list)[dir_to_record_name][1]).then((content)=>{
			fs.writeFileSync(writePath,content);
			return fs.readFileSync(writePath,'utf-8');
		}).then((read)=>{
			console.log('正常2');
			//console.log(read);
			let array = [];
			array.push(re.exec(read)[0]);
			console.log(array);
			version = JSON.parse(array[0])["file_version"]+1;
			console.log("标记1",version);
			console.log(name_res);
			fs.writeFileSync(version_file,version);
			return fs.readFileSync(version_file);
		}).then((version_pass)=>{
		version = parseInt(version_pass);//parseInt(fs.readFileSync(version_file,'utf-8'));
		console.log("version:",version)
		name_res["file_version"] = version;
		console.log("标记2",version);
		//let aaaa = parseInt(name_res["file_version"])+1; 
		//console.log(name_res["file_version"]);
		//name_res["file_version"] = aaaa.toString();
		new_json["Links"][0]["Name"] = JSON.stringify(name_res);
		new_json["Links"][0]["Hash"] = list_parse[dir_to_record_name][1];
		//console.log("new_json",new_json);
		chuan[0]=new_json;
		chuan[1]=name_res;
		return chuan;
		}).then((chuan)=>{
		new_json = chuan[0];
		name_res = chuan[1];
		//console.log("标记3",new_json,name_res);
		//json文件改完，现在开始ipfs object 
		object.add(new_json).then((hash2)=>{
			fs.writeFileSync(writePath,hash2);
			return fs.readFileSync(writePath,'utf-8');
		}).then((read)=>{
		//let object_return = object.add(new_json);
		//fs.writeFileSync(writePath,object_return);
				//console.log(read);
				//put成功，现在开始更新server;***当前版本server为单机版kvs
				let server_edit = JSON.parse(server_list);
				server_edit[dir_to_record_name][0] = hash1;
				server_edit[dir_to_record_name][1] = read.slice(9,55);
				//console.log(server_edit);
				fs.writeFileSync(server,JSON.stringify(server_edit));
				return fs.readFileSync(server);
			}).then((content)=>{
				//将server publish状态更新
				ipfsFile.add(content).then((hash)=>{
				//console.log(hash);
					fs.writeFileSync(temp_write,hash);
					return fs.readFileSync(temp_write,'utf-8');//ipfs add得到hash
				}).then((hash1)=>{
					cmdStr1 = cmdStr + hash1;
					console.log(publish.publish(cmdStr1));
				});	
			}).catch((err)=>{
			console.log(err);
			});
		}).catch((err)=>{
			console.log(err);
			});
		

	}
}).catch((err)=>{
    console.log(err);
})
});
