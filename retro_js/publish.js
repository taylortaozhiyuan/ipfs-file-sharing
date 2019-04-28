const fs = require('fs');
const ipfs = require('/home/taylor/node_modules/ipfs-api/src')('localhost', 5001)
const name =require('./name');
var exec = require('child_process').exec; 
let writePath = "/home/taylor/ipfs_test/temp3.txt";
let hash = "Qmd2oDynDtp7aTetsqcPtJNvLoBZyun11uHjt6chpkZWz6";
let key = "server";
let reso = "/ipns/QmcdjbL2QEeQn1A1LrCsE3Lben5LTf6V33y4NeATUEhamy"
/*name.publish(hash,key).then((content)=>{
	console.log(content);
});

name.resolve(reso).then((content)=>{
	console.log(content);
});
*/
var cmdStr = 'ipfs name publish --key=server ' + hash;
exports.publish = (cmdStr)=>{
	exec(cmdStr, function(err,stdout,stderr){
		if(err) {
			console.log(stderr);
		} else {
			//var data =JSON.parse(stdout);
			//console.log(stdout);
			fs.writeFileSync(writePath,stdout);
		}
	});
	return fs.readFileSync(writePath,'utf-8');
}
//console.log(fs.readFileSync(writePath,'utf-8'));