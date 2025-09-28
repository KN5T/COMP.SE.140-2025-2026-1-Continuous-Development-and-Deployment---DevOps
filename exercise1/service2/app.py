from flask import Flask
import time
import datetime
import shutil

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

@app.route("/")
def home():
    return "Welcome to Flask with Docker!"

@app.route("/status")
def status():
    record = createRecord()
    
    with open("/data/records.txt", "a") as f:
        f.write(record + "\n")

    return record

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
