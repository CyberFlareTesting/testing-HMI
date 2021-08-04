const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/js"))
app.use(express.static(__dirname + "/other"))

// pages
app.get('/', function (req, res) {
    res.redirect('/Convert')
})

app.get('/Convert',function(req, res) {
    res.sendFile(__dirname + '/html/index.html')
})

app.get('/ConvertBack',function(req, res) {
    res.sendFile(__dirname + '/html/ConvertBack.html')
})

app.get('/xmlUpload',function(req, res) {
    res.sendFile(__dirname + '/html/xmlUpload.html')
})

app.get('/Overview',function(req, res) {
    res.sendFile(__dirname + '/html/overview.html')
})

app.get('/BatchCompare',function(req, res) {
    res.sendFile(__dirname + '/html/BatchUpload.html')
})

app.get('/Contact',function(req, res) {
    res.sendFile(__dirname + '/html/Contact.html')
})

app.get('/Form',function(req, res) {
    res.sendFile(__dirname + '/html/Form.html')
})

// server
app.listen(port, function () {
    console.log("Server is running on port "+ port);
});