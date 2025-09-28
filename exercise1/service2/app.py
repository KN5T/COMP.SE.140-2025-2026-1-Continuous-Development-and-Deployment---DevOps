from flask import Flask
import time
import datetime
import shutil
import requests

startTime = time.time()

app = Flask(__name__)

#remember to fix external acess to the app

def secondsToHours(seconds):
    return time.strftime("%H:%M:%S", time.gmtime(seconds))

def getFreeDiskSpace():
    total, used, free = shutil.disk_usage("/")
    return free / (1024*1024)

def createRecord():
    timestamp = datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ')
    uptime = time.time() - startTime
    freeDiskSpace = getFreeDiskSpace()
    return f"{timestamp}: uptime {secondsToHours(uptime)} hours, free disk in root: {freeDiskSpace:.2f} MBytes"

def sendRecordToStorage(record):
    response = requests.post("http://storage:5001/log", data=record, headers={"Content-Type": "text/plain"})

    if not response.ok:
        print("Failed to store the record")
    else:
        print("Record stored succesfully")

@app.route("/status")
def status():
    record = createRecord()
    sendRecordToStorage(record)
    
    with open("/data/records.txt", "a") as f:
        f.write(record + "\n")

    return record

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
