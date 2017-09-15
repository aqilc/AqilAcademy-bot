
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "."

client.on('ready', () => {
  client.user.setStatus('online');
  client.user.setPresence({ game: { name: 'Being Created', type: 0} });
  client.user.setUsername("Clyde")
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  var said = msg.content.toLowerCase();//declare said
    if(said.startsWith(prefix + "speak")) {//Shadow Only
      var toSpeak = msg.content.slice(prefix.length+6, msg.length);
      if (msg.author.id !== "299150484218970113") {
        msg.delete();
        msg.reply("<:dynoError:346729278102175754> You do not have the correct permissions to use this command.").then(msg => msg.delete(3000));
        return;
      } else {
        msg.delete()
        msg.channel.send(toSpeak)
      }
    }

});

client.login(process.env.BOT_TOKEN);
