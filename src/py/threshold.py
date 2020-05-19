#!/usr/bin/python3
# -*- coding: utf-8 -*-
import cgi
import json
import sys

try:
    print('Content-Type: text/html')
    print('')
    
    ret = { "status": True, "contents": None }

    jfile = open('./conf.json', 'r')
    jsn   = json.load(jfile)
    jfile.close()
    
    post = cgi.FieldStorage()    
    if 0 == len(post):
        ret['contents'] = jsn['threshold']
        print(json.dumps(ret))
        sys.exit()
#    
#    #print (post.getvalue("threshold"))
#    
    jsn['threshold'] = post.getvalue("threshold")
    wfile = open('./conf.json', 'w')
    json.dump(jsn, wfile)
    wfile.close()
    
    print(json.dumps(ret))

except:
    import traceback
    traceback.print_exc()
