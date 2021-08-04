const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + "/css"));
//app.use(express.static(__dirname + "/js"))
//app.use(express.static(__dirname + "/other"))

// pages
app.get('/', function (req, res) {
    res.redirect('/Convert')
})

app.get('/Convert',function(req, res) {
    res.sendFile(__dirname + '/html/index.html')
})

// server
app.listen(port, function () {
    console.log("Server is running on port "+ port);
});