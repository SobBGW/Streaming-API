const express = require('express')
// const { EventEmitter } = require('stream')
const app = express()
const port = 3000 | process.env.port

// Event Emitter/Handler
const EventEmitter = require('events')
const { json } = require('body-parser')
var eventEmitter = new EventEmitter()

app.use(json())


app.get('/', (req, res) => {

    res.setHeader("content-type", "text/html; charset=utf-8")
    res.setHeader("Transfer-Encording", "chunked")

    console.log("Endpoint (/) - works")
    res.write("Hello")
    res.write("Hello")

    eventEmitter.on('myEvent', (msg) => {
        console.log(msg)
        res.write(msg)
    })
})

app.post('/data1', (req, res) => {
    console.log("Endpoint (data-source-1) - works")
    var formattedJson = req.body.data
    eventEmitter.emit('myEvent',formattedJson )
    res.send("okay").status(200)

})


app.listen(port, () => console.log(`Server Listening on ${port}`))
