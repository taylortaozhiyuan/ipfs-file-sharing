#中间服务器接收客户端交易请求
import socket
import requests
import urllib
import requests
import json

SERVER_ADDRESS = (HOST, PORT) = '', 38005
REQUEST_QUEUE_SIZE = 5
import os
url = 'http://192.168.56.1:5001/api/v0/add'
with open(r"C:\Users\taylor\Documents\share\IPFS_HTTP\file_list.json")as f:
    file_list = json.loads(f.read())
def handle_request(client_connection):
    request = client_connection.recv(1024)
    #print(request.decode())
    data = request.decode()
    data_1 = data.splitlines()[0].split("/")
    #print(data_1)
    http_response = b"""\
HTTP/1.1 200 OK

Hello, World!
"""
    if data_1[1].find("=")!=-1:
        
        method = data_1[1].split("=")[1]
#样例输入

#http://127.0.0.1:38005/method=transaction/from=user1/to=user2/file=QmUdUzu61qmD8CSsiwsYJFLaRNVWD4e2WmLiNMP746yjfy/
        if method == "transaction":
            tx_detail = {
                "tx_id":"",
                "time":"",
                "initiator":str(data_1[2].split("=")[1]),
                "receiver":str(data_1[3].split("=")[1]),
                "file_hash":str(data_1[4].split("=")[1]),
                "file_name":"",
                "clearence":"0",
                "position":"default",
                "department":"default",
                "sec_level":"default",
                "success":"0",
                }
            
            upup = {"files":json.dumps(tx_detail).encode(encoding="utf-8")}
            r = requests.post(url,files=upup)
            #print(json.loads(r.text)["Hash"])
            tx_detail["tx_id"] = json.loads(r.text)["Hash"]
            tx_detail["file_name"]="a1234.txt"#file_list[tx_detail["file_hash"]]
            print(tx_detail)
            save_path = tx_detail["tx_id"]+".txt"
            with open(save_path,'w')as f:
                f.write(json.dumps(tx_detail))
                http_response = b"""\
HTTP/1.1 200 OK

<h1>transaction saved!!</h1>
<h2>please return to home page</h2>
"""
               
    
    client_connection.sendall(http_response)

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

