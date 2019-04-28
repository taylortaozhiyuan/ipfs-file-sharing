//retro.js溯源
const fs = require('fs');
const object = require('./object');
const init = require('./init.js');
//const ipfs = require('/home/taylor/node_modules/ipfs-api/src')('localhost', 5001)
const ipfs = require(init.source)('localhost', 5001)
const ipfsFile = require('./ipfsFile.js');
const name =require('./name');

var log_tail=[];
var file_name = process.argv.slice(2)[0];//命令行传参
var re = /{.*?}/g;//正则匹配获取link内容-匹配左右大括号
var re_hash = /<.{46}/g;//正则匹配46位哈希值
var re_extract = [];//数组用于存储历史版本的修改人、时间等信息	
var hash_extract=["root"];//数组用于存储链中 上一个对象的hash
var data_extract = ["root"];//数组用于存储历史版本文件内容hash,第一个内容为root
console.log("本次溯源的文件为：",file_name);
//let writePath3 = "/home/taylor/ipfs_test/temp3.txt";
//let writePath4 = "/home/taylor/ipfs_test/temp4.txt";
let writePath3 = init.temp_write2;
let writePath4 = init.temp_write3;
let writePath5 = init.temp_write4;
function retrospect(file){
	//打开server.json
	let server = JSON.parse(fs.readFileSync(init.server));
	//console.log(server);
	let retro_array = [];
	let sample_kvs = {"Data_hash":"Default","revise_log":"Default"}
	try{
		
			if(!server.hasOwnProperty(file_name)){return console.log("该文件无记录");}
			else{
				object.links(server[file_name][1]).then((content)=>{
				fs.writeFileSync(writePath3,content);
				return fs.readFileSync(writePath3,'utf-8');
				}).then((read)=>{
				//console.log(read)
				let link_cur = read;
				//console.log("读取的第0个link",link_cur);
				re_extract.push(re.exec(link_cur)[0]);
                console.log("name数组：\n",re_extract[0]);
                log_tail.push(re_extract[0]);
				//console.log("test1",JSON.parse(re_extract[0])['file_version']);
				var loop_or_not=JSON.parse(re_extract[0])['file_version'];
				//console.log("loop_or_not",loop_or_not);
				hash_extract.push(link_cur.match(/<(\S{46})\s/)[1]);//截取上一个object_hash
				if(!loop_or_not){hash_extract[0]="只有root";}
				//hash_extract.push(loop_or_not);
				//console.log("hash_extract",hash_extract);
			
				fs.writeFileSync(writePath4,JSON.stringify(hash_extract));
				return JSON.parse(fs.readFileSync(writePath4,'utf-8'));
				}).then((read2)=>{
					//开始循环
					//console.log("read2",read2);
					if(read2[0]!="只有root"){
						loop(read2);
                    }
                    else{console.log(log_tail);}
				});
			}
			
	}
	catch(err){
		console.log(err);
	}
	
}
var level = 0;
function loop(array){
				//console.log("现在在第:",level,'层\n');
				//console.log("现在在第:",level,'层',"参数array",array[array.length-1]);
				object.links(array[array.length-1]).then((content)=>{
					fs.writeFileSync(writePath3,content);
					return fs.readFileSync(writePath3,'utf-8');
				}).then((read1)=>{
					//console.log("read1:",read1);
					re.lastIndex = 0;
					re_extract.push(re.exec(read1)[0]);
					array.push(read1.match(/<(\S{46})\s/)[1]);
					//console.log("下一关",array[array.length-1]);
					//console.log("标记2",array);
					
				fs.writeFileSync(writePath4,JSON.stringify(array));
				return JSON.parse(fs.readFileSync(writePath4,'utf-8'));
				}).then((array)=>{
					level += 1;
					return array;
				}).then((array)=>{
					if(array[array.length-1] != init.root_hash){
						loop(array);
					}
					else{
                        //console.log("False",array);
                        print(array);
					}
					return array;
				}).then((array)=>{
					//console.log("现在在第:",level,'层\n');
					object.data(array[array.length-1]).then((content)=>{
						fs.writeFileSync(writePath3,content);
						return fs.readFileSync(writePath3,'utf-8');
					}).then((read2)=>{
							data_extract.push(read2);
							//console.log("标记3",data_extract[data_extract.length-1]);
							//console.log("tag4:",re_extract[re_extract.length-1]);
							
					});
				});
function print(array){
    
    for(var j=1;j<array.length;j++){
        //console.log("data:  ",object.data(array[j]))
        object.data(array[j]).then((content)=>{
            fs.writeFileSync(writePath3,content);
            return fs.readFileSync(writePath3,'utf-8');
        }).then((read2)=>{
                console.log("data: ",read2);
        });
        object.links(array[j]).then((content)=>{
            fs.writeFileSync(writePath3,content);
            return fs.readFileSync(writePath3,'utf-8');
        }).then((read1)=>{
            //console.log("read1:",read1);
            console.log(read1.substring(read1.indexOf("{"),read1.indexOf("}")+1));
            log_tail.push(read1.substring(read1.indexOf("{"),read1.indexOf("}")));
            return log_tail;
            //if(j==array.length-1){console.log(log_tail);}
        }).then((log_tail)=>{
            fs.writeFileSync(writePath5,JSON.stringify(log_tail));
        });
    }
}		

}
//let Published_server_key = '/ipns/QmVukC9q7ASWWwjG4inmNsHZwfekmQR3gPQEn2niD5NS5n';
let Published_server_key = init.key;

//首先更新server
name.resolve(Published_server_key).then((hash)=>{
	//console.log(hash);
	let file_name_old = hash.split('/')[2];
	//console.log(file_name_old);
	ipfsFile.get(file_name_old).then((hash)=>{
		fs.writeFileSync(init.server,hash);
		//fs.writeFileSync("/home/taylor/ipfs_test/server.json",hash);
		});
});
retrospect(file_name);

