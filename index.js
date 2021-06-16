const Discord = require('discord.js');
const bot = new Discord.Client();
const server = require('./server');

server.ws.on("connection", function(ws, req)
{
  console.log("websocket connection open")

  ws.send("OK", function() { })
  ws.on('message', function(message) {
    const channel = await bot.channels.fetch(process.env.CHANNEL_ID);
    await channel.send(message);
  });

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
    message.reply('pong!')
  }
})

bot.login(process.env.BOT_TOKEN)