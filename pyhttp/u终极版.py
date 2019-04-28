import socket
import requests
import urllib
import requests
import json

SERVER_ADDRESS = (HOST, PORT) = '', 38005
REQUEST_QUEUE_SIZE = 5
import os
url = 'http://192.168.56.11:5001/api/v0/add'
#with open("/home/taylor/share1/IPFS_HTTP/file_list.json","utf-8")as f:
#       file_list = JSON.loads(f)
def handle_request(client_connection):
    request = client_connection.recv(1024)
    #print(request.decode())
    data = request.decode()
    http_response = "HTTP/1.1 200 OK\r\n"+"Server: My server\r\n\r\n"+"<h1>Python HTTP Test</h1>"
    print(data)
    if data.splitlines()[0].find("method")!=-1:
        data_1 = data.splitlines()[0].split("/")
        method = data_1[1].split("=")[1]
#样例输入
#http://127.0.0.1:38005/method=main/name=sample.json/hash=QmbhHfqL1U191MVpdMZw1oYZeM1vmavsYB3af7cVtyRoGt/
        if method == "main":
            name = data_1[2].split("=")[1]
            hash0 = data_1[3].split("=")[1]
            print(name,hash0)
            down_file(name,hash0)
#http://127.0.0.1:38005/method=retro/name=sample.json/
        elif method == "retro":
            name = data_1[2].split("=")[1]
            print(name)
            res =retro(name)
            print("res1111111111111111111111111111111",res) 
            http_response = "HTTP/1.1 200 OK\r\n"+"Server: My server\r\n\r\n"+res
#http://127.0.0.1:38005/method=get/
        elif method == "get":
            with open(r"C:\Users\taylor\Documents\share\pyWeb-master\proof_temp.txt","r")as f:
                    f_data = f.read()
            http_response = "HTTP/1.1 200 OK\r\n"+"Server: My server\r\n\r\n"+f_data
                
    #http_response = "HTTP/1.1 200 OK\r\n"+"Server: My server\r\n\r\n"+res#"<h1>Python HTTP Test</h1>"
    print("hhhhhhhhhhhhhhhhhttp",http_response)
    client_connection.sendall(bytes(http_response,"utf-8"))

def down_file(name,hash1):
    #将文件下载到本地再运行main1.js
    url = 'http://127.0.0.1:5001/api/v0/cat/'+ hash1
    r = requests.get(url) 
    file_path='/home/taylor/share1/pyhttp/save/'+name
    with open(file_path, "wb+") as f:
        print("url",url)
        print(str(r.content,'utf-8'))
        f.write(r.content)
        f.close()
        cmdStr = "node /home/taylor/share1/retro_js/main1.js "
        cmdStr1 = cmdStr + file_path
        print(cmdStr1)
        print(os.popen(cmdStr1).read().strip())
def retro(name):
    cmdStr = "node /home/taylor/share1/retro_js/retro1.js "
    cmdStr1 = cmdStr + name
    print("cmdstr11111",cmdStr1)
    res = os.popen(cmdStr1).read()
    print("resssssssssssssssss",res.strip())
    return res.strip()
def serve_forever():
    listen_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    listen_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    listen_socket.bind(SERVER_ADDRESS)
    listen_socket.listen(REQUEST_QUEUE_SIZE)
    print('Serving HTTP on port {port} ...'.format(port=PORT))

    while True:
        client_connection, client_address = listen_socket.accept()
        handle_request(client_connection)
        client_connection.close()

if __name__ == '__main__':
    serve_forever()
