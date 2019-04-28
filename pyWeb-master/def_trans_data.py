#定义上传下载交易数据报格式
#上传：新建证书上传区块链
keys = ["owner_id","transaction_hash","owner_name","clearence","position","department","file_hash","success","time_stamp","","","",""]
values = [""]*13
datagram = dict(zip(keys,values))
print(datagram)