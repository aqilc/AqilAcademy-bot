const Discord = require("discord.js");
const client = new Discord.Client();
const sql = require("sqlite");
sql.open("./score");
const prefix = "."

client.on('ready', () => {
  client.user.setStatus('online');
  client.user.setPresence({ game: { name: 'Being Created', type: 0} });
  client.user.setUsername("Clyde")
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  var said = msg.content.toLowerCase();//declare said}
  if(msg.author.bot) return;
  if(!said.startsWith(prefix)) {
     sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, dayMsgCount, daysActive, warnings, isActive, highestRole, expBan, expFreeze) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [msg.author.id, 1, 0, 0, true, "None", false, false]);
    } else {
      sql.run(`UPDATE scores SET dayMsgCount = ${row.dayMsgCount + 1} WHERE userId = ${msg.author.id}`);
    }
  }).catch(() => {
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, dayMsgCount INTEGER, daysActive INTEGER, warnings INTEGER, isActive INTEGER, highestRole TEXT, expBan INTEGER, expFreeze INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, dayMsgCount, daysActive, warnings, isActive, highestRole, Ban, Freeze) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [msg.author.id, 1, 0, 0, true, "None", false, false]);
    });
  });
  }

  if (!msg.content.startsWith(prefix)) return;

  if (msg.content.startsWith(prefix + "stats")) {
    sql.get(`SELECT * FROM scores WHERE userId ="${msg.author.id}"`).then(row => {
      if (!row) return msg.reply("You don't have any stats here. Start chatting!");
      msg.reply("```Your have sent " + row.dayMsgCount + " Messages Today. Keep up the good work!");
      /*msg.author.send({embed: [
    {
      title: "AqilAcademy Server Stats for ${msg.author.name}",
      url: "https://discord.gg/Q776ADB",
      //color: 564300,
      fields: [
        {
          name: "Messages Today",
          value: '${row.daysActive}',
          inline: true
        },
        {
          name: "Consecutive Active Days",
          value: "${row.daysActive}",
          inline: true
        },
        {
          name: "Highest Role",
          value: "${row.highestRole}"
        },
        {
          name: "Ban/Freeze",
          value: ":snowflake: Freeze: ${row.expFreeze}\n<:Banhammer:358720547179200522> Ban: ${row.expBan}"
        }
      ],
      thumbnail: {
        url: msg.author.avatarUrl
      },
    }
  ]});*/
    });
  }
    if(said.startsWith(prefix + "speak")) {//Shadow Only
      var toSpeak = msg.content.slice(prefix.length+6, msg.length);
      if (msg.author.id !== "299150484218970113") {
        msg.delete();
        msg.reply("<:clydeWarnRed:358724931107684362> You do not have the correct permissions to use this command.").then(msg => msg.delete(3000));
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
      client.channels.get("358352044094128128").send("<:clydeWarn:358724078263336960> **Shadow™#8337 has been warned for** `spamming` **. This is Shadow™#8337's second warning.**\n<:clydeDemote:358682632294236160> **Shadow™#8337 has been demoted from Moderator due to number of warnings.**")
      client.channels.get("358352044094128128").send("This is a demo. No actions have been executed.")
    }

});

client.login(process.env.BOT_TOKEN);
