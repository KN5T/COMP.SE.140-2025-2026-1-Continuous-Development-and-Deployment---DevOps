const express = require("express");
const app = express();

const fs = require('fs')

app.use(express.text())

app.get("/log", (req, res) => {
    const records = fs.readFileSync("/storage/records.txt", "utf8")
    return res.send(records)
})

app.post("/log", (req, res) => {
    try {
        const record = req.body
        console.log("record", record)

        if(!record) {
            return res.status(400).send("Record was not provided")
        }

        fs.appendFileSync("/storage/records.txt", record + "\n")
        return res.sendStatus(201)
    } catch(e) {
        return res.status(500).send("Failed to store the record")
    }
})

app.listen(5001, function(){
    console.log('Listening on port 5001')
})