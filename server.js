const express = require('express')
// const { EventEmitter } = require('stream')
const app = express()
const port = 3000 | process.env.port

// Event Emitter/Handler
const EventEmitter = require('events')
var eventEmitter = new EventEmitter()


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

app.get('/data1', (req, res) => {
    console.log("Endpoint (data-source-1) - works")
    eventEmitter.emit('myEvent', "data")
    res.status(200)

})


app.listen(port, () => console.log(`Server Listening on ${port}`))
