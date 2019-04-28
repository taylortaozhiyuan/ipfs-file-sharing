# coding:utf-8
#在IPFS网关执行的服务
import socket
import requests 

from multiprocessing import Process


def handle_client(client_socket):
    """
    处理客户端请求
    """
    request_data = client_socket.recv(1024)
    print("request data:", request_data)
    if str(request_data,'utf-8')!=None:
        data = str(request_data,'utf-8').splitlines()[0]
        data1= data.split('/')
        name = data1[1].split("=")[-1]
        hash = data1[2].split("=")[-1]
        print(name,hash)
        down_file(name,hash)

    # 构造响应数据
    response_start_line = "HTTP/1.1 200 OK\r\n"
    response_headers = "Server: My server\r\n"
    response_body = "<h1>Python HTTP Test</h1>"
    response = response_start_line + response_headers + "\r\n" + response_body

    # 向客户端返回响应数据
    client_socket.send(bytes(response, "utf-8"))

    # 关闭客户端连接
    client_socket.close()
        
def down_file(name,hash):
    #将文件下载到本地再运行main1.js
    url = 'http://127.0.0.1:5001/api/v0/cat/'+ hash
    r = requests.get(url) 
    file_path='/home/taylor/share1/pyhttp/'+name
    with open(file_path, "wb+") as f:
        print(str(r.content,'utf-8'))
        f.write(r.content)
        f.close()
    #运行main1.js
    

if __name__ == "__main__":
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(("", 38004))
    server_socket.listen(128)

    while True:
        client_socket, client_address = server_socket.accept()
        print("[%s, %s]用户连接上了" % client_address)
        handle_client_process = Process(target=handle_client, args=(client_socket,))
        handle_client_process.start()
        client_socket.close()
