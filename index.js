//const config = require(__dirname + '/config/config.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
const server = require('./server');
var http = require("http");

server.ws.on("connection", function(ws, req)
{
  var options = {
    host: 'ipv4bot.whatismyipaddress.com',
    port: 80,
    path: '/'
  };
  
  var addrExternal = "";

  http.get(options, function(res) {
    console.log("status: " + res.statusCode);
    
    res.on("data", function(chunk) {
      addrExternal += chunk;
    });
  }).on('error', function(e) {
    console.log("error: " + e.message);
  });

  let addrServer = req.socket.localAddress;
  let addrRemote = req.socket.remoteAddress;

  var id = setInterval(function() {
    let msg = "<div>Server time: " + JSON.stringify(new Date()) + "</div><br/>";
    msg += "<div>Server address: " + addrServer + "</div>";
    msg += "<div>External address: " + addrExternal + "</div>";
    msg += "<div>Remote address: " + addrRemote + "</div>";
    ws.send(msg, function() { })
  }, 1000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})

bot.on('ready', function () {
  console.log("Logged into Discord!")
})

bot.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong !')
  }
})

bot.login(process.env.BOT_TOKEN)