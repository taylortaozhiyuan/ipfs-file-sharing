import socket
import requests 
SERVER_ADDRESS = (HOST, PORT) = '', 38005
REQUEST_QUEUE_SIZE = 5
import os

def handle_request(client_connection):
    request = client_connection.recv(1024)
    #print(request.decode())
    data = request.decode()
    data_1 = data.splitlines()[0].split("/")
    if data!=None:
        name = data_1[1].split("=")[1]
        hash0 = data_1[2].split("=")[1]
        print(name,hash0)
        down_file(name,hash0)
        
    http_response = b"""\
HTTP/1.1 200 OK

Hello, World!
"""
    client_connection.sendall(http_response)

def down_file(name,hash1):
    #将文件下载到本地再运行main1.js
    url = 'http://127.0.0.1:5001/api/v0/cat/'+ hash1
    r = requests.get(url) 
    file_path='/home/taylor/share1/pyhttp/'+name
    with open(file_path, "wb+") as f:
        print(str(r.content,'utf-8'))
        f.write(r.content)
        f.close()
        cmdStr = "node /home/taylor/share1/retro_js/main1.js "
        cmdStr1 = cmdStr + file_path
        print(cmdStr1)
        print(os.popen(cmdStr1).read().strip())
    
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
