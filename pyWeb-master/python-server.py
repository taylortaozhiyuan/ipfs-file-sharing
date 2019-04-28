#! /usr/bin/env python3
import pymysql
from flask import Flask, request, render_template,send_from_directory,url_for
import os
from werkzeug.utils import secure_filename
import json
import time
import requests
import marble_add
app = Flask(__name__)

def insert(user ,idea):
    db=pymysql.connect("localhost","root","root","test3")
    cursor=db.cursor()
    sql="insert into dosomething (user,idea) values ('{}','{}')".format(user,idea)
    try:
        cursor.execute(sql)
        db.commit()
    except:
        db.rollback()
    db.close()

def getfile():
    print (os.getcwd())
    path1=os.getcwd()+'/uploadfile'
    path2=os.getcwd()
    #跳转目录 跳转到下载文件的目录，获得下载文件目录里面的ｌｉｓｔ之后，然后再跳转出来
    os.chdir(path1)
    flist=os.listdir()
    os.chdir(path2)
    print (os.getcwd())
    return flist

def isHavefile(filename):
    print (os.getcwd())
    path1=os.getcwd()+'/uploadfile'
    path2=os.getcwd()
    os.chdir(path1)
    flag=os.path.isfile(filename)
    os.chdir(path2)
    print ("youmeiyou",os.getcwd())
    return flag

def ipfs_add(f_name,path="/home/taylor/share1/pyWeb-master/uploadfile/"):
    cmdStr = "node /home/taylor/share1/IPFS_HTTP/name_storage.js "+path+f_name
    #print(cmdStr)
    res = os.popen(cmdStr).read()
    Hash_ex = json.loads(res[res.find("{"):res.find("}")+1])
    return Hash_ex["Hash"]


def get_cp_right(hash):
    res1=os.popen("node /home/taylor/share1/IPFS_HTTP/http_dht_findprovs.js "+hash).readlines()
    flag = "None"
    print("res1:",res1,hash)
    for each in res1:
        each.strip()
        #print(each)
        if len(each)>1:
            if json.loads(each)["Type"] == 4:
                flag = "single"
                resp = json.loads(each)["Responses"][0]
                if resp["Addrs"]!=None:
                    return "multi"
    return flag

def save_cp_right(fname,hash,username="admin"):
    if os.path.exists("cp_right.json"):
        with open("cp_right.json","r+",encoding='utf-8')as f:
            data = json.load(f)
            #print(type(data))
            #print("data1",data)
            if hash in data.keys():
                return ["e",str(data[hash][1])]
            else:
                data.update({hash:[fname,username]})
                #print("data2",data)
                f.seek(0)                   #这两句用来清空文件，很重要
                f.truncate()
                json.dump(data,f)
                return ["success",str(data[hash][1])]
    else:
        with open("cp_right.json","w+",encoding='utf-8')as f:
            data={hash:[fname,username]}
            json.dump(data,f)
            return ["success",str(data[hash][1])]
    
def table_create(res):              #这坨代码写的跟屎一样
    if res.find("name数组")!=-1:
        p = 0
        data = res
        table = []
        s_str =""
        s_str += "<tr><td>修改时间</td><td>修改人</td><td>版本号</td><td>数据hash</td></tr>"
        while p!=-1:
            s_str+="<tr>"
            data_1 = data[data.find("{",p):data.find("}",p+1)+1]
            p = data.find("}",p+1)
            if data.find("{",p)!=-1:
                data_2 = data[p+1:data.find("{",p)]
            else:
                data_2 = data[p+1:]
            data_3 =json.loads(data_1)
            aaa=list(data_3.values())
            aaa.append(data_2)
            #print("aaaaaaaaaa:",aaa)
            #aaa->['2019-4-26 21:20:56', 2, 'sample_user', '\ndata:  QmShrW7D5ryYsmEkSfU2zHCh2zbxHwnEK7uGi2LCEgLLCw\n']
            bbb=[]
            for each in aaa:
                if str(each).find("data:") == -1:
                    bbb.append("<td>"+str(each)+"</td>")
                else: bbb.append("<td>"+each[str(each).find(" "):-2]+"</td>")
            #bbb = ["<td>"+str(each)+"</td>" for each in aaa]
            for each in bbb:
                s_str+=each
            s_str+="</tr>"
            table.append(bbb)
            p = data.find("{",p)
        return s_str  


@app.route('/uploadfile', methods=['POST','get'])
def upload():
    if request.method=='GET':
        return '<h3>get 222 </h3>'
    if request.method=='POST':

        relativepath='./uploadfile/'
        username=request.form['upfilename']
        retro_flag=request.form.getlist("retro")
        f=request.files['file']
        fname=secure_filename(f.filename)
        f.save(os.path.join(relativepath,fname))
        print(username)
        if username=="":
            username = "admin"
        print(username)
        print(fname)
        
        #验证版权
        #cmdStr = "node /home/taylor/share1/IPFS_HTTP/name_storage.js /home/taylor/share1/pyWeb-master/uploadfile/"+str(f.filename)
        flist = getfile()
        #print(flist)
        #print("------------------",get_cp_right(ipfs_add(fname)),"---------------")
        cp_right =""
        cp_right_res = get_cp_right(ipfs_add(fname))
        print("cp_right_res:",cp_right_res)
        if cp_right_res == "single":
            if fname in flist:          #文件夹里有，显然是已经上传过得
                cp_right = "这是一个已存在于服务器的文件,版权所有人是"+save_cp_right(fname,ipfs_add(fname),username)[1]
            #文件夹里没有，但是版权表里面有的，属于别人的版权    
            elif save_cp_right(fname,ipfs_add(fname),username)[0] == "e":
                cp_right = "这是一个已存在于服务器的文件,版权所有人是"+save_cp_right(fname,ipfs_add(fname),username)[1]
            else:
                cp_right="您上传的文件为新文件，已为您登记版权信息"
                print(save_cp_right(fname,ipfs_add(fname),username))
        elif cp_right_res == "multi":
            cp_right = "这是一个已存在于服务器的文件,版权所有人是"+save_cp_right(fname,ipfs_add(fname),username)[1]
        else:
            cp_right = "服务器内部错误，请联系管理员"
        #
        #乾坤大挪移护体 将文件上传ipfs并返回hash 重写html有点傻，可以改成render_template传参
        #乾坤大挪移护体
        #生成proof
        #keys = ["owner_id","transaction_hash","owner_name","clearence","position","department","file_hash","success","time_stamp","","","",""]
        keys = ["owner_id","transaction_hash","owner_name","clearence","position","department","file_hash","success","time_stamp","9","10","11","12","13","14","15"]
        values = [""]*16
        proof_up = dict(zip(keys,values))
        proof_up["owner_name"] = "bupt"
        proof_up["file_hash"] =  ipfs_add(fname)
        proof_up["time_stamp"] = str(time.time())
        proof_up["13"]="bupt"
        proof_up["14"]="bupt"
        proof_up["15"]="o01554987265477ax3SD"
        #print(proof_up)
        values[0]=ipfs_add(fname)
        values[13]="bupt"
        values[14]="bupt"
        values[15]="o01554987265477ax3SD"
        fp_write=""
        with open("proof_temp.txt","w")as fp:
            for each in values:
                if each!="":
                    if fp_write!="":
                        fp_write+=","+each
                    else:
                        fp_write=each
                else:
                    if fp_write!="":
                        fp_write+=","+"temp"
                    else:
                        fp_write="temp"
            fp.write(fp_write)
            #print(proof_values)
        #
        #建立追溯
        retro_sta = "无"
        #print("哈哈哈哈哈哈哈哈哈哈或或或或或或或或或",retro_flag)
        if "是否建立追溯" in retro_flag:
            url = "http://127.0.0.1:38005/method=main/name="+fname+"/"+"hash="+ipfs_add(fname)+"/"
            res = requests.get(url)
            
            #print("rrrrrrrrrrrrres",type(res))
            if str(res)=="<Response [200]>":
                retro_sta = "建立成功"
            else:
                retro_sta = "建立失败"
        #
        #在区块链建立证书
        res_marble = marble_add.marble_create()
        #
        return render_template('uploadfile_ok.html',Hash_up=ipfs_add(fname),cp_right = cp_right,retro=retro_sta,marble=res_marble)


#显示上传页面 同时也是主页面
@app.route('/up', methods=['POST','get'])
def up():
    mycss=url_for('static', filename='style.css')
    return render_template('upload.html',mycss=mycss)


@app.route('/file', methods=['POST','get'])
def file():
    mycss=url_for('static', filename='style.css')
    return render_template('upload.html',mycss=mycss)

#main页面
@app.route('/')
def hello():
    return '<p> flask run in port 5002 </p>'

#显示下载文件的界面
@app.route('/down', methods=['GET'])
def query():
    mycss=url_for('static', filename='style.css')
    flist=getfile()
    return render_template('downloadpage.html',mycss=mycss,fl=flist)

#显示查询页面
@app.route('/query', methods=['GET'])
def downloadpage():
    mycss=url_for('static', filename='style.css')
    flist=getfile()
    return render_template('query.html',mycss=mycss,fl=flist)
    
@app.route("/file_get_by_hash",methods=["GET"])
def down_by_hash():
    if request.method=='GET':
        hash = request.args.get('upfilehash')
        cmdStr="node /home/taylor/share1/IPFS_HTTP/http_get.js "+str(hash)
        p = os.popen(cmdStr).read()
        downloadfilename = p.split("/")[-1]
        downloadfilename = downloadfilename.split("\n")[0]
        print("f_name:",p.split("/")[-1],"hhhhh")
        flist=getfile()
        #downloadfilename = p.split("/")[-1]
        print ()
        if isHavefile(downloadfilename):
            return send_from_directory('uploadfile',downloadfilename,as_attachment=True)
        else:
            return "404"
        #return render_template('uploadfile_ok.html')

#下载要下载的文件，要下载的文件是通过get方法来传递的
@app.route('/downloadfile', methods=['GET'])
def downloadfile():
    if request.method=='GET':
        downloadfilename=request.args.get('filename')
        flist=getfile()
        print (downloadfilename)
        if isHavefile(downloadfilename):
            return send_from_directory('uploadfile',downloadfilename,as_attachment=True)
        else:
            return "404"

@app.route('/query_file', methods=['GET'])
def query_file():
    if request.method=='GET':
        mycss=url_for('static', filename='style.css')
        name_or_hash = request.args.get('query_hash_or_name')
        #print(name_or_hash[0:2])
        if name_or_hash[0:2]=="Qm":
            print("这是哈希")
            with open("/home/taylor/share1/IPFS_HTTP/file_list.json","r")as f_list:
                file_name = json.loads(f_list.read())[name_or_hash][0]
                #print(file_name)
            cmdStr = "node /home/taylor/share1/IPFS_HTTP/http_dht_findprovs.js "+name_or_hash
            #print(cmdStr)
            res0 = os.popen(cmdStr).read()
            print(res0)
            #print(type(res))
            name = name_or_hash+" "+file_name
            return render_template('query.html',mycss=mycss,name_or_hash = name,result = res0)
        else:
            print("这是文件名")
            with open("/home/taylor/share1/IPFS_HTTP/file_list.json","r")as f_list:
                fr = json.loads(f_list.read())
                #print(type(fr))
                for key in fr:
                    if fr[key][0] == name_or_hash:
                        cmdStr = "node /home/taylor/share1/IPFS_HTTP/http_dht_findprovs.js " + key
                        res = json.loads(os.popen(cmdStr).read())["Responses"]
                        return render_template('query.html',name_or_hash = name_or_hash +" "+ key,result = res)
                return render_template('query.html',mycss=mycss,name_or_hash = name_or_hash,result = "Result Not Found")
            
@app.route('/retro',methods=['GET'])
def retro():
    if request.method=='GET':
        mycss=url_for('static', filename='style.css')
        retro_name = request.args.get('retro_name')
        
        url = "http://127.0.0.1:38005/method=retro/name="+retro_name+"/"
        print(url)
        res = requests.get(url)    
        #print("rrrrrrrrrrrrres",type(res))
        print("rrrrrrrrrrrrres",res.text)
        table = '<table border="1">'+table_create(res.text)
        print(table)
        return render_template('retro_result.html',mycss=mycss,name_or_hash = retro_name,result = table)

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True,port=5002)
