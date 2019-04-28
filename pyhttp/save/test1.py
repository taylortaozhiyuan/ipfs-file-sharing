import json
def table_create(res):
    if res.find("name数组")!=-1:
        p = 0
        data = res
        table = []
        s_str =""
        while p!=-1:
            data_1 = data[data.find("{",p):data.find("}",p+1)+1]
            p = data.find("}",p+1)
            if data.find("{",p)!=-1:
                data_2 = data[p+1:data.find("{",p)]
            else:
                data_2 = data[p+1:]
            data_3 =json.loads(data_1)
            aaa=list(data_3.values())
            aaa.append(data_2)
            print(aaa)
            bbb = ["<tr><td>"+str(each)+"</td></tr>" for each in aaa]
            for each in bbb:
                s_str+=each
            table.append(bbb)
            p = data.find("{",p)
        
        
        print(s_str)   
        #print(table)
res = 'sample.json name数组： {"last_revised_time":"2019-4-2 20:12:57","file_version":1,"user":"sample_user"} data: QmZMmEYonkmQkgP9NQFU1j7RhGdgA7izYaiCFTPVwwLRSc {"last_revised_time":"2019-4-2 10:25:35","file_version":0,"user":"sample_user"} data: root_node,established_by_Taylor_Tao'
table_create(res)
