#createCert方法
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import os

def marble_create():
    if 'HTTP_PROXY' in os.environ: del os.environ['HTTP_PROXY']
    dr=webdriver.Chrome()
    dr.maximize_window()              #最大化，否则无法看到页面底端元素
    time.sleep(1)
    #file_path='file:///'+os.path.abspath('buggon_group.html')
    #dr.get("https://www.baidu.com/")
    #url="http://127.0.0.1:5001/api/v0/bootstrap"
    url = "http://192.168.56.102:3001/admin"
    #print(url)
    dr.get(url)
    time.sleep(3)                       #睡三秒等页面加载
    button=dr.find_element_by_class_name('addMarble')   #先找加号
    '''
    for btn in buttons:
        #print(btn.text)#=='second': print 'find second button'
        time.sleep(3)
        btn.click()
    '''

    button.click()                      #点加号
    with open("/home/taylor/share1/pyWeb-master/proof_temp.txt",'r',encoding="utf-8")as ft:
        list_w=ft.read().split(",")
        list_w[1]=list_w[0][23:]
        list_w[0]=list_w[0][0:22]
    #print(list_w)
    #table = dr.find_element_by_id("certs")
    for i in range(0,13):
        dr.find_element_by_name(str(i+1)).send_keys(list_w[i])
    button1=dr.find_element_by_id("createCertButton")   #找create
    button1.click()                         #点create
    #print(button)
    #time.sleep(1)
    dr.quit()
    return "上传成功"
    
if __name__=="__main__":
    marble_create()