主要文件有两个：main.js和retro.js

init.js里面是各种文件的目录和初始化值，main.js运行后会检测init.js里面写死的file_name这个文件是否发生变动，如果变动则创建object上传到ipfs并形成追溯链，retro.js运行后会查询file_name这个文件的所有追溯链信息并输出

关于建立ipfs私网

多个节点初始化之后每个节点的~/.ipfs/目录下都拷贝一份swarm.key文件作为共同的私钥，清空各个节点的bootstrap(ipfs bootstrap rm all)然后选择其中一台为初始节点（不清空）其他节点（ipfs bootstrap add /ip4/初始节点ipv4地址/tcp/4001/ipfs/初始节点hash）然后私网搭建完毕

关于共享key

每个节点都要拷贝一份server文件（在文件夹里，没有后缀）到（~/.ipfs/keystore/）下面就行

总结，简单来说，所有的输入都在init.js里面，输出可以自行测试~   aaabbbccc
   
![1543807875296](C:\Users\taylor\AppData\Roaming\Typora\typora-user-images\1543807875296.png)