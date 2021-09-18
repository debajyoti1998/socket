const express=require("express")
const app=express()
const fs=require('fs')
const options = {
    key: fs.readFileSync('./cert/key.pem'), // Replace with the path to your key
    cert: fs.readFileSync('./cert/cert.pem') // Replace with the path to your certificate
}
const https=require('https').createServer(options,app)


const PORT=process.env.PORT || 8000

app.use(express.static(__dirname + '/public'))

app.get('/',async(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})


https.listen(PORT,()=>{
    console.log(`started on port  https://localhost:${PORT}`)
})

// socket
const io=require('socket.io')(https)

io.on('connection',(socket)=>{
    console.log('connectted ...')
    socket.on('message',(msg)=>{
        // console.log(msg)
        socket.broadcast.emit('message',msg)
    })
})