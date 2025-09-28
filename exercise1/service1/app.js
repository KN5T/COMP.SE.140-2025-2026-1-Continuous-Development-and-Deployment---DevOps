const express = require("express");
const app = express();

const checkDiskSpace = require("check-disk-space").default
const fs = require('fs');

const secondsToHours = (seconds) => {
    const date = new Date(null)
    date.setSeconds(seconds)
    return date.toISOString().substring(11, 19)
}

const createRecord = async () => {
    const timeStamp = new Date().toISOString().split(".")[0] + "Z"
    const upTime = secondsToHours(process.uptime())
    const diskSpace = await checkDiskSpace("/") 
    const freeSpaceMB = diskSpace.free / (1024*1024)
    return `${timeStamp}: uptime ${upTime} hours, free disk in root: ${freeSpaceMB.toFixed(2)} MBytes`
}

const getRecord = async () => {
    const response = await fetch("http://service2:5000/status")
    const data = await response.text()
    return data
}


app.get("/", function(req, res) {
    return res.send("Hello World!");
});

app.get("/status", async function(req, res) {
    const record1 = await createRecord()
    // await POSTrecordToStorage()
    fs.appendFileSync("/data/records.txt", record1 + "\n")

    const record2 = await getRecord()

    console.log("record1", record1)
    console.log("record2", record2)
    
    return res.type("text").send(`${record1}\n${record2}`);
});

app.get("/log", function(req, res) {
    return res.send("Log route");
});

app.listen(8199, function(){
    console.log('Listening on port 8199');
});