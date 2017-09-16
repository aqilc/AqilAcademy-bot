
const Discord = require("discord.js");
const client = new Discord.Client();
const Dash = require('rethinkdbdash')
const r = new Dash()
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
    if(said === prefix + "help") {
      msg.reply("There's no commands for me to show. Coming soon™");
    }
    
    if(said.startsWith(prefix + "activitylog-demo")) {
      msg.reply("Take a look at <#358352044094128128>")
      client.channels.get("358352044094128128").send("<:clydePromote:358682594080194560> **Shadow™#8337 has been promoted to Moderator!**")
      client.channels.get("358352044094128128").send("<:clydeDemote:358682632294236160> **Shadow™#8337 has been demoted from Moderator due to inactivity.**")
      client.channels.get("358352044094128128").send("<:Banhammer:358720547179200522> **Shadow™#8337 has been banned with reason:** `this is a reason for ban` **.**")
      client.channels.get("358352044094128128").send("\:mans_shoe: **Shadow™#8337 has been kicked with reason:** `this is a reason for kick` **.**")
      client.channels.get("358352044094128128").send("<:clydeWarn:358724078263336960> **Shadow™#8337 has been warned for** `spamming` **. This is Shadow™#8337's first warning.**")
      client.channels.get("358352044094128128").send("<:clydeWarnRed:358724931107684362> **Shadow™#8337 has been warned for** `spamming` **. This is Shadow™#8337's second warning.**\n<:clydeDemote:358682632294236160> **Shadow™#8337 has been demoted from Moderator due to number of warnings.**")
      client.channels.get("358352044094128128").send("This is a demo. No actions have been executed.")
    }

});

client.login(process.env.BOT_TOKEN);
