const express = require("express");
const app = express();

const checkDiskSpace = require("check-disk-space").default

const secondsToHours = (seconds) => {
    const date = new Date(null)
    date.setSeconds(seconds)
    return date.toISOString().substring(11, 19)
}

app.get("/", function(req, res) {
    return res.send("Hello World!");
});

app.get("/status", async function(req, res) {
    const timeStamp = new Date().toISOString()
    const upTime = secondsToHours(process.uptime())
    const diskSpace = await checkDiskSpace("/") 
    const freeSpaceMB = diskSpace.free / (1024*1024)
    return res.send(`${timeStamp}: uptime ${upTime} hours, free disk in root: ${freeSpaceMB.toFixed(2)} MBytes`);
});

app.get("/log", function(req, res) {
    return res.send("Log route");
});

app.listen(3000, function(){
    console.log('Listening on port 8199');
});