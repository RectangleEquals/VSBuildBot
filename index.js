//const config = require(__dirname + '/config/config.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
const server = require('./server');

server.ws.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
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

bot.login(config.token)