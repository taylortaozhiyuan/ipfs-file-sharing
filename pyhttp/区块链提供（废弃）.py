
import socket
import requests
import urllib
import requests
import json

SERVER_ADDRESS = (HOST, PORT) = '', 38005
REQUEST_QUEUE_SIZE = 5
import os
url = 'http://192.168.56.1:5001/api/v0/add'
#with open("/home/taylor/share1/IPFS_HTTP/file_list.json","utf-8")as f:
#       file_list = JSON.loads(f)
def handle_request(client_connection):
    request = client_connection.recv(1024)
    #print(request.decode())
    data = request.decode()
    http_response = "HTTP/1.1 200 OK\r\n"+"Server: My server\r\n\r\n"+"<h1>Python HTTP Test</h1>"
    print(data)
    with open(r"C:\Users\taylor\Documents\share\pyWeb-master\proof_temp.txt","r")as f:
        f_data = f.read()
    #allow='<meta http-equiv="Access-Control-Allow-Origin" content="http://192.168.11.128">'
    allow='Access-Control-Allow-Origin: *'
    http_response = "HTTP/1.1 200 OK\r\n"+"Server: My server\r\n"+allow+"\r\n\r\n"+f_data
                
    #http_response = "HTTP/1.1 200 OK\r\n"+"Server: My server\r\n\r\n"+res#"<h1>Python HTTP Test</h1>"
    print("hhhhhhhhhhhhhhhhhttp",http_response)
    client_connection.sendall(bytes(http_response,"utf-8"))


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
