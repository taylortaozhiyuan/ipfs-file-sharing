import json
import os
hash1 = ["QmUT15kKW355iRfp7EGaRmskLTcRED9Sm5375UQZsxCcwf","QmWw1Kt43m8XfnXdjNSwuYekpBfkdAEAQfXDE82kbUY66z","QmWw1Kt43m8XfnXdjNSwuYekpBfkdAEAQfXDE82kbUY6ad"]

cmdstr = "node /home/taylor/share1/IPFS_HTTP/http_dht_findprovs.js "
#res1=os.popen("node /home/taylor/share1/IPFS_HTTP/http_dht_findprovs.js ")

def cp_right(res1):
    flag = "None"
    for each in res1:
        each.strip()
        print(each)
        if len(each)>1:
            #print(json.loads(each))
            if json.loads(each)["Type"] == 4:
                flag = "single"
                resp = json.loads(each)["Responses"][0]
                #print(resp["Addrs"])
                if resp["Addrs"]!=None:
                    return "multi"
    return flag
for each in hash1:
    #print(os.popen(cmdstr+each).readlines())
    print(cp_right(os.popen(cmdstr+each).readlines()))
#print(cp_right(res1))
