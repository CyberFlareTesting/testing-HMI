const express = require("express")
const app = express()
    app.use(express.urlencoded({extended: true})); 
    app.use(express.json());

const Discord = require("discord.js");
const Client = new Discord.Client();

const DicordChannel = "872545688121131105"
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
app.post('/Submit', (req, res) => {
    const value = req.body
    const pingValue = (value.Severity < 1)? "<@&872579999381733426>\n": ""

    value.name = value.name || "Blank"
    value.contact = value.contact || "Blank"
    value.message = value.message || "Blank"

    embed = MakeEmbed(value, pingValue)
    Client.channels.cache.get(DicordChannel).send(embed)
    res.redirect('/Contact')
})

function MakeEmbed(value, pingValue){
    return {
  
        "embed": {
          "title": `${value.name}`,
          "color": 11521782,
          "author": {
            "name": "Help Requested for HMI by"
          },
          "fields": [
            {
              "name": "Contact",
              "value": `${value.contact}`
            },
            {
              "name": "Question",
              "value": `${pingValue}${value.message}`
            }
          ]
        }
      }
}




// server
app.listen(port, function () {
    console.log("Server is running on port "+ port);
    Client.login("ODcyNTcyNTU2MDY1MDA1NTk5.Y"+"Qr0hA.qosI_1CNbK-16BL-BE5WVU9ryUM")
});
