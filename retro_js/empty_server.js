const fs = require('fs');
const object = require('./object');
//const ipfs = require('/home/taylor/node_modules/ipfs-api/src')('localhost', 5001)
const ipfsFile = require('./ipfsFile.js');
const init = require('./init.js');
const ipfs = require(init.source)('localhost', 5001)
const publish = require('./publish.js');
const name =require('./name');

var empty_json="QmbJWAESqCsf4RFCqEY7jecCashj8usXiyDNfKtZCwwzGb";
var cmdStr = 'ipfs name publish --key=server '+empty_json;
console.log(publish.publish(cmdStr));
