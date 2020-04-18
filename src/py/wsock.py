#!/usr/bin/env python

# WS server that sends messages at random intervals
import os
import json
import base64
import socket
import asyncio
import datetime
import random
import websockets


def get_thermo():
    try:
        with open(os.path.dirname(os.path.abspath(__file__)) + "/../../img/thermo.bmp", "rb") as img:
            data = base64.b64encode(img.read())
            return data.decode('utf-8')
    except:
        import traceback
        traceback.print_exc()

async def time(websocket, path):
    global client_count

    if 0 == client_count:
        print("start thermo")
    
    client_count = client_count + 1
    
    while True:
        #now = datetime.datetime.utcnow().isoformat() + "Z"
        try:
            result = { 'image': get_thermo(), 'temp': 35.5 }
            await websocket.send(json.dumps(result))
        except:
            client_count = client_count - 1
            if 0 == client_count:
                print("stop thermo")
            break
        await asyncio.sleep(random.random() * 3)
    

if __name__ == "__main__":
    client_count = 0

    host = socket.gethostname()
    start_server = websockets.serve(time, socket.gethostbyname(host), 5000)

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
