const Discord = require("discord.js");
const client = new Discord.Client({autoReconnect:true});
const ms = require("ms")
const prefix = "."
var electionOn;
var running = [];
var disqualified = [];

client.on('ready', () => {
  client.user.setStatus('online');
  console.log(`Logged in as ${client.user.tag}!`);
});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
var contains = function(a, b) {
  for(var i = 0; i < a.length; i++) {
    if (a.slice(i, i+b.length) === b){
      return true;
    }
  }
};

var badWords = " fuck , shit , ass , yoy , cock , dick , sex , porn , fucker , mother fucker , bitch , asshole , tit , vagina , pussy ".split(",");



client.on('message', msg => {

if(msg.author.id === "188350841600606209") return;
if (msg.content.startsWith(prefix + "eval")) {
  if(msg.author.id !== "299150484218970113") return msg.reply("`ERROR`\nIncorrect Permissions");
  let args = msg.content.split(" ").slice(1);

  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

    msg.channel.send(clean(evaled), {code:"xl"});
  } catch (err) {
    msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
}
  var said = msg.content.toLowerCase();//declare said}
  if(msg.author.bot && !client.user) return;


    /*for(var i = 0; i < badWords.length; i++) {
      if (contains(msg.content.toLowerCase(), badWords[i].toLowerCase())) {
        msg.delete();
        msg.reply("Please control your language! <:stop:364887308782272512>");
        let member = msg.author;
        member.send("**You've been warned in AqilAcademy:**\nPlease do not use words that go against the language filter. Thank you!");
        client.channels.get("358352044094128128").send({embed: {
        color: 16753920,
        fields: [{
            name: "<:blobpolice:364194401783775252> Member Warned",
            value: "Member: " + msg.author.username + "#" + msg.author.discriminator + "\nMember ID: " + msg.author.id + "\nModerator: Clyde#5067" + "\nWarning: Please do not use words that go against the language filter. Thank you!"
          }
        ],

      }
    })
      }
    }*/
 /*   if(said.startsWith(prefix + "tag")) {
      var say;
      var toTag = msg.content.slice(prefix.length+4, msg.length);
   
        switch(toTag) {
    case rolerewards:
        say = "**WHAT DO I GET FOR CHATTING HERE**\nTake a look at the role rewards! https://shadowka.gitbooks.io/clyde/content/#rolerewards"
        break;
    case clydeadmins:
        say = "The Clyde Admins are Aqil#4788 and Shadow™#8337."
        break;
    default:
        say = "`ERROR`\nTag unavailable."
            
}
      msg.channel.send(say)
    }*/
    if(msg.content === prefix + "suggest party-instructions") {
      msg.delete()
      msg.channel.send(":scream: _A new channel just appeared for me! What is it???_\nThis is the place to submit your suggestions for parties in the next AqilAcademy election.\n\n**Okay, I just had this great idea for a party! How do I submit it?**\nIt's simple! Just use the `.suggestparty` command anywhere on this server. It will appear here and can be voted on by other members.\n```Example: .suggestparty The Party of ™Ness```\n**I see some great suggestions here, how do I support them?** OR **I don't like this suggestion, how do I downvote it?**\nReact with either <:upvote:361166616081203200> or <:downvote:361166591943114752>.")
    }

    if(said.startsWith(prefix + "speak")) {//Shadow Only
      var toSpeak = msg.content.slice(prefix.length+6, msg.length);
      if (msg.author.id === "299150484218970113" || msg.author.id === "316313763513106434") {
        msg.delete()
        if(msg.author.id === "299150484218970113") {
        msg.channel.send(toSpeak)
      } else {
        msg.channel.send(toSpeak + "\nSpoken by " + msg.author.username)
      }
      } else {

        msg.delete();
        msg.reply("<:clydeWarnRed:358724931107684362> You do not have the correct permissions to use this command.").then(msg => msg.delete(3000));
        return;
      }
    }
    if(said.startsWith(prefix + "timeout")) {
      let member = msg.mentions.members.first();
      let modRole = msg.guild.roles.find("name", "Moderator")
      let cp = msg.guild.roles.find("name", "Complete Power")
      if(msg.member.roles.has(modRole.id)) {
            if(msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
              let member = msg.mentions.members.first()
              if(!member) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a member to put in timeout.").then(msg => msg.delete(7000));
                return;
              }
              let muteRole = msg.guild.roles.find("name", "Timeout")
              if(!muteRole) {
                msg.delete(7000);
                msg.reply(":thinking: It seems that something went wrong. Your error has been reported to the Clyde admins.").then(msg => msg.delete(7000));
                return;
              }
              if(member.roles.has(muteRole.id)) {
                msg.delete(7000);
                msg.reply("`ERROR`\nThis user is already in timeout.").then(msg => msg.delete(7000));
                return;
              }
              let params = msg.content.split(" ").slice(1);
              let reason = msg.content.split(/\s+/g).slice(3).join(" ");

              let time = params[1];

  console.log(reason)

              if(!time) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a duration for the timeout.").then(msg => msg.delete(7000));
                return;
              }

              if(!reason[0]) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a reason for the timeout.").then(msg => msg.delete(7000));
                return;
              }
              member.addRole(muteRole.id, reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator)
              msg.delete();
              msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been given a timeout for `" + reason + "` that will last " + ms(ms(time), {long: true}) + ".")
              client.channels.get("358352044094128128").send({embed: {
              color: 16753920,
              fields: [{
                  name: "<:blobpolice:364194401783775252> Member Given Timeout",
                  value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason + "\nTime: " + ms(ms(time), {long: true})
                }
              ],

            }
          })
            member.send("<:blobpolice:364194401783775252> You were put in timeout on AqilAcademy with the reason `" + reason + "`. This will last for " + ms(ms(time), {long: true}) + ". While you're waiting, you should take a look over <#325380886394568704>.")
              setTimeout(function() {
                if(!member.roles.has(muteRole.id)) return;
                member.removeRole(muteRole.id, "Timeout Ended")
                client.channels.get("358352044094128128").send({embed: {
                color: 16753920,
                fields: [{
                    name: "<:blobpolice:364194401783775252> Member Timeout Ended",
                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Timeout"
                  }
                ],

              }
            })

              }, ms(time))
            }
            else if(msg.member.roles.has(cp.id)) {
              let member = msg.mentions.members.first()
              if(!member) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a member to put in timeout.").then(msg => msg.delete(7000));
                return;
              }
              if(member.roles.has(cp.id)) {
                msg.delete(7000);
                msg.reply("`ERROR`\Members with Complete Power cannot be put in timeout.").then(msg => msg.delete(7000));
                return;
              }
              let muteRole = msg.guild.roles.find("name", "Timeout")
              if(!muteRole) {
                msg.delete(7000);
                msg.reply(":thinking: It seems that something went wrong. Your error has been reported to the Clyde admins.").then(msg => msg.delete(7000));
                return;
              }
              if(member.roles.has(muteRole.id)) {
                msg.delete(7000);
                msg.reply("`ERROR`\nThis user is already in timeout.").then(msg => msg.delete(7000));
                return;
              }
              let params = msg.content.split(" ").slice(1);
              let reason = msg.content.split(/\s+/g).slice(3).join(" ");

              let time = params[1];

  console.log(reason)

              if(!time) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a duration for the timeout.").then(msg => msg.delete(7000));
                return;
              }

              if(!reason[0]) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a reason for the timeout.").then(msg => msg.delete(7000));
                return;
              }
              member.addRole(muteRole.id, reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator)
              msg.delete();
              msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been given a timeout for `" + reason + "` that will last " + ms(ms(time), {long: true}) + ".")
              client.channels.get("358352044094128128").send({embed: {
              color: 16753920,
              fields: [{
                  name: "<:blobpolice:364194401783775252> Member Given Timeout",
                  value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason + "\nTime: " + ms(ms(time), {long: true})
                }
              ],

            }
          })
            member.send("<:blobpolice:364194401783775252> You were put in timeout on AqilAcademy with the reason `" + reason + "`. This will last for " + ms(ms(time), {long: true}) + ". While you're waiting, you should take a look over <#325380886394568704>.")
              setTimeout(function() {
                if(!member.roles.has(muteRole.id)) return;
                member.removeRole(muteRole.id, "Timeout Ended")
                client.channels.get("358352044094128128").send({embed: {
                color: 16753920,
                fields: [{
                    name: "<:blobpolice:364194401783775252> Member Timeout Ended",
                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Timeout"
                  }
                ],

              }
            })

              }, ms(time))
            } else {

            let member = msg.mentions.members.first()
            if(!member) {
              msg.delete(7000);
              msg.reply("`ERROR`\nYou must specify a member to put in timeout.").then(msg => msg.delete(7000));
              return;
            }
            if(member.roles.has(modRole.id)) {
              msg.delete(7000);
              msg.reply("`ERROR`\nModerators cannot be put in timeout.").then(msg => msg.delete(7000));
              return;
            }
            let muteRole = msg.guild.roles.find("name", "Timeout")
            if(!muteRole) {
              msg.delete(7000);
              msg.reply(":thinking: It seems that something went wrong. Your error has been reported to the Clyde admins.").then(msg => msg.delete(7000));
              return;
            }
            if(member.roles.has(muteRole.id)) {
              msg.delete(7000);
              msg.reply("`ERROR`\nThis user is already in timeout.").then(msg => msg.delete(7000));
              return;
            }
            let params = msg.content.split(" ").slice(1);
            let reason = msg.content.split(/\s+/g).slice(3).join(" ");

            let time = params[1];

console.log(reason)

            if(!time) {
              msg.delete(7000);
              msg.reply("`ERROR`\nYou must specify a duration for the timeout.").then(msg => msg.delete(7000));
              return;
            }

            if(!reason[0]) {
              msg.delete(7000);
              msg.reply("`ERROR`\nYou must specify a reason for the timeout.").then(msg => msg.delete(7000));
              return;
            }
            member.addRole(muteRole.id, reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator)
            msg.delete();
            msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been given a timeout for `" + reason + "` that will last " + ms(ms(time), {long: true}) + ".")
            client.channels.get("358352044094128128").send({embed: {
            color: 16753920,
            fields: [{
                name: "<:blobpolice:364194401783775252> Member Given Timeout",
                value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason + "\nTime: " + ms(ms(time), {long: true})
              }
            ],

          }
        })
          member.send("<:blobpolice:364194401783775252> You were put in timeout on AqilAcademy with the reason `" + reason + "`. This will last for " + ms(ms(time), {long: true}) + ". While you're waiting, you should take a look over <#325380886394568704>.")
            setTimeout(function() {
              if(!member.roles.has(muteRole.id)) return;
              member.removeRole(muteRole.id, "Timeout Ended")
              client.channels.get("358352044094128128").send({embed: {
              color: 16753920,
              fields: [{
                  name: "<:blobpolice:364194401783775252> Member Timeout Ended",
                  value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Timeout"
                }
              ],

            }
          })

            }, ms(time))



}
    } else {
      msg.reply("`ERROR`\nYou do not have the `Moderator` role.")
      return;
    }
      }
  
  if(said.startsWith(prefix + "mute")) {
      let member = msg.mentions.members.first();
      let modRole = msg.guild.roles.find("name", "Moderator")
      let cp = msg.guild.roles.find("name", "Complete Power")
      if(msg.member.roles.has(modRole.id)) {
            if(msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
              let member = msg.mentions.members.first()
              if(!member) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a member to mute.").then(msg => msg.delete(7000));
                return;
              }
              
              let muteRole = msg.guild.roles.find("name", "Muted")
              if(!muteRole) {
                msg.delete(7000);
                msg.reply(":thinking: It seems that something went wrong. Your error has been reported to the Clyde admins.").then(msg => msg.delete(7000));
                return;
              }
              if(member.roles.has(muteRole.id)) {
                msg.delete(7000);
                msg.reply("`ERROR`\nThis user is already muted.").then(msg => msg.delete(7000));
                return;
              }
              let params = msg.content.split(" ").slice(1);
              let reason = msg.content.split(/\s+/g).slice(3).join(" ");

              let time = params[1];

  console.log(reason)

              if(!time) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a duration for the mute.").then(msg => msg.delete(7000));
                return;
              }

              if(!reason[0]) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a reason for the mute.").then(msg => msg.delete(7000));
                return;
              }
              member.addRole(muteRole.id, reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator)
              msg.delete();
              msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been muted for " + ms(ms(time), {long: true}) + " with reason `" + reason + "`.")
              client.channels.get("358352044094128128").send({embed: {
              color: 16753920,
              fields: [{
                  name: "<:blobpolice:364194401783775252> Member Muted",
                  value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason + "\nTime: " + ms(ms(time), {long: true})
                }
              ],

            }
          })
            member.send("<:blobpolice:364194401783775252> You were muted on AqilAcademy with the reason `" + reason + "`. This will last for " + ms(ms(time), {long: true}) + ". While you're waiting, you should take a look over <#325380886394568704>.")
              setTimeout(function() {
                if(!member.roles.has(muteRole.id)) return;
                member.removeRole(muteRole.id, "Mute Ended")
                client.channels.get("358352044094128128").send({embed: {
                color: 16753920,
                fields: [{
                    name: "<:blobpolice:364194401783775252> Member Unmuted",
                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Mute"
                  }
                ],

              }
            })

              }, ms(time))
            }
            else if(msg.member.roles.has(cp.id)) {
              let member = msg.mentions.members.first()
              if(!member) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a member to mute.").then(msg => msg.delete(7000));
                return;
              }
              if(member.roles.has(cp.id)) {
                msg.delete(7000);
                msg.reply("`ERROR`\nMembers with Complete Power cannot be muted.").then(msg => msg.delete(7000));
                return;
              }
              let muteRole = msg.guild.roles.find("name", "Muted")
              if(!muteRole) {
                msg.delete(7000);
                msg.reply(":thinking: It seems that something went wrong. Your error has been reported to the Clyde admins.").then(msg => msg.delete(7000));
                return;
              }
              if(member.roles.has(muteRole.id)) {
                msg.delete(7000);
                msg.reply("`ERROR`\nThis user is already muted.").then(msg => msg.delete(7000));
                return;
              }
              let params = msg.content.split(" ").slice(1);
              let reason = msg.content.split(/\s+/g).slice(3).join(" ");

              let time = params[1];

  console.log(reason)

              if(!time) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a duration for the mute.").then(msg => msg.delete(7000));
                return;
              }

              if(!reason[0]) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a reason for the mute.").then(msg => msg.delete(7000));
                return;
              }
              member.addRole(muteRole.id, reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator)
              msg.delete();
              msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been muted for " + ms(ms(time), {long: true}) + " with reason `" + reason + "`.")
              client.channels.get("358352044094128128").send({embed: {
              color: 16753920,
              fields: [{
                  name: "<:blobpolice:364194401783775252> Member Muted",
                  value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason + "\nTime: " + ms(ms(time), {long: true})
                }
              ],

            }
          })
            member.send("<:blobpolice:364194401783775252> You were muted on AqilAcademy with the reason `" + reason + "`. This will last for " + ms(ms(time), {long: true}) + ". While you're waiting, you should take a look over <#325380886394568704>.")
              setTimeout(function() {
                if(!member.roles.has(muteRole.id)) return;
                member.removeRole(muteRole.id, "Mute Ended")
                client.channels.get("358352044094128128").send({embed: {
                color: 16753920,
                fields: [{
                    name: "<:blobpolice:364194401783775252> Member Unmuted",
                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Mute"
                  }
                ],

              }
            })

              }, ms(time))
            } else {

            let member = msg.mentions.members.first()
              if(!member) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a member to mute.").then(msg => msg.delete(7000));
                return;
              }
              if(member.roles.has(modRole.id)) {
                msg.delete(7000);
                msg.reply("`ERROR`\nMembers with the Moderator role cannot be muted.").then(msg => msg.delete(7000));
                return;
              }
              let muteRole = msg.guild.roles.find("name", "Muted")
              if(!muteRole) {
                msg.delete(7000);
                msg.reply(":thinking: It seems that something went wrong. Your error has been reported to the Clyde admins.").then(msg => msg.delete(7000));
                return;
              }
              if(member.roles.has(muteRole.id)) {
                msg.delete(7000);
                msg.reply("`ERROR`\nThis user is already muted.").then(msg => msg.delete(7000));
                return;
              }
              let params = msg.content.split(" ").slice(1);
              let reason = msg.content.split(/\s+/g).slice(3).join(" ");

              let time = params[1];

  console.log(reason)

              if(!time) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a duration for the mute.").then(msg => msg.delete(7000));
                return;
              }

              if(!reason[0]) {
                msg.delete(7000);
                msg.reply("`ERROR`\nYou must specify a reason for the mute.").then(msg => msg.delete(7000));
                return;
              }
              member.addRole(muteRole.id, reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator)
              msg.delete();
              msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been muted for " + ms(ms(time), {long: true}) + " with reason `" + reason + "`.")
              client.channels.get("358352044094128128").send({embed: {
              color: 16753920,
              fields: [{
                  name: "<:blobpolice:364194401783775252> Member Muted",
                  value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason + "\nTime: " + ms(ms(time), {long: true})
                }
              ],

            }
          })
            member.send("<:blobpolice:364194401783775252> You were muted on AqilAcademy with the reason `" + reason + "`. This will last for " + ms(ms(time), {long: true}) + ". While you're waiting, you should take a look over <#325380886394568704>.")
              setTimeout(function() {
                if(!member.roles.has(muteRole.id)) return;
                member.removeRole(muteRole.id, "Mute Ended")
                client.channels.get("358352044094128128").send({embed: {
                color: 16753920,
                fields: [{
                    name: "<:blobpolice:364194401783775252> Member Unmuted",
                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Mute"
                  }
                ],

              }
            })

              }, ms(time))



}
    } else {
      msg.reply("`ERROR`\nYou do not have the `Moderator` role.")
      return;
    }
      }
      if(said.startsWith(prefix + "unmute")) {
        let cp = msg.guild.roles.find("name", "Complete Power")
        let modRole = msg.guild.roles.find("name", "Moderator")
        if (msg.member.roles.has(modRole.id)) {
          if(msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
            let member = msg.mentions.members.first()
          if(!member) {
            msg.delete(7000);
            msg.reply("`ERROR`\nYou must specify a member to unmute.").then(msg => msg.delete(7000));
            return;
          }
    
          let muteRole = msg.guild.roles.find("name", "Muted")
          if(!muteRole) {
            msg.delete(7000);
            msg.reply("`ERROR`\nIncorrect Mute Role Configuration").then(msg => msg.delete(7000));
            return;
          }
          if(!member.roles.has(muteRole.id)) {
            msg.delete(7000);
            msg.reply("`ERROR`\nThis user is not currently muted.").then(msg => msg.delete(7000));
            return;
          }
          let reason = msg.content.split(/\s+/g).slice(3).join(" ");


          if(!reason) {
            msg.delete(7000);
            msg.reply("`ERROR`\nYou must specify a reason.").then(msg => msg.delete(7000))
            return;
          }
          member.removeRole(muteRole.id)
          msg.delete();
          msg.channel.send("<:clydeApprove:366662545504862211> " + member.user.username + "#" + member.user.discriminator + " has been umuted with reason `" + reason + "`.")
          client.channels.get("358352044094128128").send({embed: {
                color: 16753920,
                fields: [{
                    name: "<:blobpolice:364194401783775252> Member Unmuted",
                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Mute"
                  }
                ],

              }
            })
          }
          else if(msg.member.roles.has(cp.id)) {
            let member = msg.mentions.members.first()
          if(!member) {
            msg.delete(7000);
            msg.reply("`ERROR`\nYou must specify a member to unmute.").then(msg => msg.delete(7000));
            return;
          }
          if(member.roles.has(cp.id)) {
            msg.delete(7000)
            msg.reply("`ERROR`\nYou cannot unmute other members with Complete Power.")
            return;
          }
          let muteRole = msg.guild.roles.find("name", "Muted")
          if(!muteRole) {
            msg.delete(7000);
            msg.reply("`ERROR`\nIncorrect Mute Role Configuration").then(msg => msg.delete(7000));
            return;
          }
          if(!member.roles.has(muteRole.id)) {
            msg.delete(7000);
            msg.reply("`ERROR`\nThis user is not currently muted.").then(msg => msg.delete(7000));
            return;
          }
          let reason = msg.content.split(/\s+/g).slice(3).join(" ");


          if(!reason) {
            msg.delete(7000);
            msg.reply("`ERROR`\nYou must specify a reason.").then(msg => msg.delete(7000))
            return;
          }
          member.removeRole(muteRole.id)
          msg.delete();
          msg.channel.send("<:clydeApprove:366662545504862211> " + member.user.username + "#" + member.user.discriminator + " has been umuted with reason `" + reason + "`.")
          client.channels.get("358352044094128128").send({embed: {
                color: 16753920,
                fields: [{
                    name: "<:blobpolice:364194401783775252> Member Unmuted",
                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Mute"
                  }
                ],

              }
            })
          } else {
          let member = msg.mentions.members.first()
          if(!member) {
            msg.delete(7000);
            msg.reply("`ERROR`\nYou must specify a member to unmute.").then(msg => msg.delete(7000));
            return;
          }
          if(member.roles.has(modRole.id)) {
            msg.delete(7000)
            msg.reply("`ERROR`\nYou cannot unmute other Moderators.")
            return;
          }
          let muteRole = msg.guild.roles.find("name", "Muted")
          if(!muteRole) {
            msg.delete(7000);
            msg.reply("`ERROR`\nIncorrect Mute Role Configuration").then(msg => msg.delete(7000));
            return;
          }
          if(!member.roles.has(muteRole.id)) {
            msg.delete(7000);
            msg.reply("`ERROR`\nThis user is not currently muted.").then(msg => msg.delete(7000));
            return;
          }
          let reason = msg.content.split(/\s+/g).slice(3).join(" ");


          if(!reason) {
            msg.delete(7000);
            msg.reply("`ERROR`\nYou must specify a reason.").then(msg => msg.delete(7000))
            return;
          }
          member.removeRole(muteRole.id)
          msg.delete();
          msg.channel.send("<:clydeApprove:366662545504862211> " + member.user.username + "#" + member.user.discriminator + " has been umuted with reason `" + reason + "`.")
          client.channels.get("358352044094128128").send({embed: {
                color: 16753920,
                fields: [{
                    name: "<:blobpolice:364194401783775252> Member Unmuted",
                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Mute"
                  }
                ],

              }
            })
          }
        } else {
          msg.delete(7000);
          msg.reply("`ERROR` You do not have the `Moderator` role.").then(msg => msg.delete(7000));
        }
      }
    


    if(said.startsWith(prefix + "kick")) {

      if (msg.member.hasPermission("KICK_MEMBERS")) {
          let member = msg.mentions.members.first();
          let modRole = msg.guild.roles.find("name", "Moderator")
          let cp = msg.guild.roles.find("name", "Complete Power")
          if(msg.member.roles.has(modRole.id)) {
            if(msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
              if(!member) {
                msg.delete(3000);
                msg.reply("`ERROR`\nPlease specify a member to kick.").then(msg => msg.delete(3000));
                return;
              }

              let reason = msg.content.split(/\s+/g).slice(2).join(" ");
              if(!reason) {
                msg.reply("`ERROR`\nReason not specified.")
                return;
              }
              msg.delete(3000)
              msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been kicked for `" + reason + "`.")
              client.channels.get("358352044094128128").send({embed: {
              color: 16711680,
              fields: [{
                  name: "<:blobpolice:364194401783775252> Member Kicked",
                  value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason
                }
              ],

            }
          })
              member.kick(reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator);

              return;
            }

            if(msg.member.roles.has(cp.id)) {
              if(member.roles.has(cp.id)) {
                msg.reply("`ERROR`\nYou cannot kick someone with the Complete Power role.")
                return;
              } else {
                if(!member) {
                  msg.delete(3000);
                  msg.reply("`ERROR`\nPlease specify a member to kick.").then(msg => msg.delete(3000));
                  return;
                }

                let reason = msg.content.split(/\s+/g).slice(2).join(" ");
                if(!reason) {
                  msg.reply("`ERROR`\nReason not specified.")
                  return;
                }
                msg.delete(3000)
                msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been kicked for `" + reason + "`.")
                client.channels.get("358352044094128128").send({embed: {
                color: 16711680,
                fields: [{
                    name: "<:blobpolice:364194401783775252> Member Kicked",
                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason
                  }
                ],

              }
            })
                member.kick(reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator);

                return;
              }
            } else {
              if(member.roles.has(modRole.id)) {
              msg.reply("`ERROR`\nThis user is a mod/admin, they cannot be kicked.")
              return;
            } else {
              if(!member) {
                msg.delete(3000);
                msg.reply("`ERROR`\nPlease specify a member to kick.").then(msg => msg.delete(3000));
                return;
              }

              let reason = msg.content.split(/\s+/g).slice(2).join(" ");
              if(!reason) {
                msg.reply("`ERROR`\nReason not specified.")
                return;
              }
              msg.delete(3000)
              msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been kicked for `" + reason + "`.")
              client.channels.get("358352044094128128").send({embed: {
              color: 16711680,
              fields: [{
                  name: "<:blobpolice:364194401783775252> Member Kicked",
                  value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason
                }
              ],

            }
          })
              member.kick(reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator);

              return;
            }
          }
        } else {
          msg.reply("`ERROR`\nYou do not have the `KICK_MEMBERS` permission.")
        }
        }
}

if(said.startsWith(prefix + "ban")) {

  if (msg.member.hasPermission("BAN_MEMBERS")) {
      let member = msg.mentions.members.first();
      let modRole = msg.guild.roles.find("name", "Moderator")
      let cp = msg.guild.roles.find("name", "Complete Power")
      if(msg.member.roles.has(modRole.id)) {
        if(msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
          if(!member) {
            msg.delete(3000);
            msg.reply("`ERROR`\nPlease specify a member to ban.").then(msg => msg.delete(3000));
            return;
          }

          let reason = msg.content.split(/\s+/g).slice(2).join(" ");
          if(!reason) {
            msg.reply("`ERROR`\nReason not specified.")
            return;
          }
          msg.delete(3000)
          msg.channel.send("<:blobhammer:364493777882185728> " + member.user.username + "#" + member.user.discriminator + " has been banned for `" + reason + "`.")
          client.channels.get("358352044094128128").send({embed: {
          color: 16711680,
          fields: [{
              name: "<:blobhammer:364493777882185728> Member Banned",
              value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason
            }
          ],

        }
      })
          member.ban(reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator);

          return;
        }

        if(msg.member.roles.has(cp.id)) {
          if(member.roles.has(cp.id)) {
            msg.reply("`ERROR`\nYou cannot ban someone with the Complete Power role.")
            return;
          } else {
            if(!member) {
              msg.delete(3000);
              msg.reply("`ERROR`\nPlease specify a member to ban.").then(msg => msg.delete(3000));
              return;
            }

            let reason = msg.content.split(/\s+/g).slice(2).join(" ");
            if(!reason) {
              msg.reply("`ERROR`\nReason not specified.")
              return;
            }
            msg.delete(3000)
            msg.channel.send("<:blobhammer:364493777882185728> " + member.user.username + "#" + member.user.discriminator + " has been banned for `" + reason + "`.")
            client.channels.get("358352044094128128").send({embed: {
            color: 16711680,
            fields: [{
                name: "<:blobhammer:364493777882185728> Member Banned",
                value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason
              }
            ],

          }
        })
            member.ban(reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator);

            return;
          }
        } else {
          if(member.roles.has(modRole.id)) {
          msg.reply("`ERROR`\nThis user is a mod/admin, they cannot be banned.")
          return;
        } else {
          if(!member) {
            msg.delete(3000);
            msg.reply("`ERROR`\nPlease specify a member to ban.").then(msg => msg.delete(3000));
            return;
          }

          let reason = msg.content.split(/\s+/g).slice(2).join(" ");
          if(!reason) {
            msg.reply("`ERROR`\nReason not specified.")
            return;
          }
          msg.delete(3000)
          msg.channel.send("<:blobhammer:364493777882185728> " + member.user.username + "#" + member.user.discriminator + " has been banned for `" + reason + "`.")
          client.channels.get("358352044094128128").send({embed: {
          color: 16711680,
          fields: [{
              name: "<:blobhammer:364493777882185728> Member Banned",
              value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason
            }
          ],

        }
      })
          member.ban(reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator);

          return;
        }
      }
    } else {
      msg.reply("`ERROR`\nYou do not have the `BAN_MEMBERS` permission.")
    }
    }
}
if(said.startsWith(prefix + "warn")) {
  let modRole = msg.guild.roles.find("name", "Moderator")
  if (msg.member.roles.has(modRole.id)) {
      let member = msg.mentions.members.first();
      if(!member) {
        msg.delete(3000);
        msg.reply("`ERROR`\nNo member was specified.").then(msg => msg.delete(3000));
        return;
      }
      let warning = msg.content.split(/\s+/g).slice(2).join(" ");
      if(!warning) {
        msg.delete(3000)
        msg.reply("`ERROR`\nYou must specify a warning.").then(msg => msg.delete(3000))
      }
      msg.delete();
      member.send("**You've been warned in AqilAcademy:**\n" + warning);
      msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been warned for `" + warning + "`.")
      client.channels.get("358352044094128128").send({embed: {
      color: 16753920,
      fields: [{
          name: "<:blobpolice:364194401783775252> Member Warned",
          value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nWarning: " + warning
        }
      ],

    }
  })
  } else {

      msg.reply("`ERROR`\nYou are not a Moderator.")
      return;
  }
}
    if(msg.content === prefix + "uptime") {
      msg.reply("I have been online for " + ms(client.uptime, {long: true}) + ".")
    }
    if(said.startsWith(prefix + "startelection")) {
        if(msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
      let params = msg.content.split(" ").slice(1);
      console.log(params)

      let time = params[0];
      console.log(time)
      if(!time) return msg.reply("Please specify a duration for the election.")
      electionOn = true;
      client.channels.get("361157929988128768").send("@everyone")
      client.channels.get("361157929988128768").send({embed: {
      color: 7506394,
      author: {
        name: "New Election Started by " + msg.author.username,
        icon_url: msg.author.avatarURL
      },
      fields: [{
          name: "How Do I Run?",
          value: "Use the `run` command anywhere on this server.\n```Usage: .run [PARTY] | [SLOGAN] | [MORE INFORMATION]```"
        },
        {
            name: "How Do I Vote?",
            value: "React with <:vote:351429308293578752> for the candidate of your choice.\n**You can only vote once, so choose wisely. Any user who votes multiple times will not have any of their votes counted.**\nThis election will last " + ms(ms(time), {long: true}) + ".\nCandidates can speak to the AqilAcademy users at any time in <#361158521770999808>, just don't spam."
          },
          {
            name: "NOTE",
            value: "Aqil may remove users from the election at any time if they have shown that they cannot handle the role of President."
          },
          {
            name: "Parties",
            value: "**You must specify your party as one of the following or else the bot will not work.**\nThonkers\nWizards\nBreakers\nDestroyers"
          }
      ],

    }
  })
      //ms(ms(time), {long: true})
      setTimeout(function() {
        electionOn = false;

      }, ms(time))
    }
    }
    if(said.startsWith(prefix + "run")) {
      if(electionOn !== true) return msg.reply("An election is not currently in progress.");
      if(disqualified.includes(msg.author.id) === true) return msg.reply("`ERROR`\nYou have been disqualified from the election.")
      if(running.includes(msg.author.id) === true) return msg.reply("`ERROR`\nYou have already entered the race.")
      let params1 = said.split(" ").slice(0)
      //params[1] = party
      console.log(params1)
      let params2 = msg.content.split(" | ").slice(1);
      //params2 = slogan and more info
      console.log(params2)

      if(params1[1] === "thonkers") {
        params1[1] = "The Thonkers <:thonk:358630992355000342>";
      } else if(params1[1] === "wizards") {params1[1] = "Tech Wizards";}
      else if(params1[1] === "breakers") {params1[1] = "ServerBreakers";}
      else if(params1[1] === "destroyers") {params1[1] = "The Destroyers"}
      else {msg.reply("`ERROR`\nParty was not specified correctly. Please try again.").then(msg => msg.delete(3000))
      msg.delete(3000)
    return;
  }
    if(!params2[0]) return msg.reply("`ERROR`\nYou have not specified a slogan. Please try again.")
    if(!params2[1]) return msg.reply("`ERROR`\nYou have not specified any more information. Please try again.")

    var party = params1[1]
    var slogan = params2[0]
    var info = params2[1]




      client.channels.get("361157929988128768").send({embed: {
      color: 7506394,
      author: {
        name: msg.author.username + " Is Running for President!",
        icon_url: msg.author.avatarURL
      },
      fields: [{
          name: "Party",
          value: party
        },
        {
          name: "Slogan",
          value: slogan
        },
        {
          name: "More Information",
          value: info
        },
        {
          name: "How to Vote for " + msg.author.username,
          value: "Use the <:vote:351429308293578752> reaction on this message to vote."
        }

      ],

    }
  })
  var role = msg.guild.roles.find("name", "Candidate")
  running.push(msg.author.id)
  var member = msg.member;
  member.addRole(role.id, "Entered Election")
    }
    if(said.startsWith(prefix + "dsq")) {
      if(msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
      var toDsq = msg.mentions.members.first()
      var role = msg.guild.roles.find("name", "Candidate")
      toDsq.removeRole(role.id, "Disqualified from Election")
      disqualified.push(toDsq.user.id)
      client.channels.get("358352044094128128").send("<:clydeWarnRed:358724931107684362> **" + toDsq.user.username + "#" + toDsq.user.discriminator + " has been disqualified from the election.**")
      msg.reply(toDsq.user.username + "#" + toDsq.user.discriminator + " has been disqualified from the election.")
    }
    }
    if(said === prefix + "help") {
      msg.reply("**Looking for info about Clyde? Want to know all of the commands?**\n\nHead on over to https://shadowka.gitbooks.io/clyde/content/ and you'll see info about all the different functions of Clyde.");
    }
    if(said.startsWith(prefix + "suggestparty")) {
      msg.reply("Party Suggestions are not being currently accepted.")
      /*var suggestion = msg.content.slice(prefix.length+13, msg.length);
      msg.reply(":ok_hand: Your suggestion `" + suggestion + "` has been submitted! It can now be found in <#361167250280939520>.")
      client.channels.get("361167250280939520").send({embed: {
      color: 7506394,
      author: {
        name: "Suggestion from " + msg.author.username,
        icon_url: msg.author.avatarURL
      },
      fields: [{
          name: "Suggestion: " + suggestion,
          value: "Vote with the <:upvote:361166616081203200> and <:downvote:361166591943114752> reactions on this message."
        }
      ],

    }
  })*/
    }
    /*if(msg.channel.id === "361167250280939520") {
      if(msg.author.id !== client.user.id) return msg.delete();
      msg.react(":upvote:361166616081203200").then(msg.react(":downvote:361166591943114752"))
    }*/
    if(msg.channel.id === "361157929988128768") {
      if(msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {

      } else if (msg.author.id === client.user.id){
      msg.react(":vote:351429308293578752")
    } else {
      msg.delete()
      return;
    }
    }
  /*  if(said.startsWith(prefix + "activitylog-demo")) {
      msg.reply("Take a look at <#358352044094128128>")
      client.channels.get("358352044094128128").send("<:clydePromote:358682594080194560> **Shadow™#8337 has been promoted to Moderator!**")
      client.channels.get("358352044094128128").send("<:clydeDemote:358682632294236160> **Shadow™#8337 has been demoted from Moderator due to inactivity.**")
      client.channels.get("358352044094128128").send("<:Banhammer:358720547179200522> **Shadow™#8337 has been banned with reason:** `this is a reason for ban` **.**")
      client.channels.get("358352044094128128").send("\:mans_shoe: **Shadow™#8337 has been kicked with reason:** `this is a reason for kick` **.**")
      client.channels.get("358352044094128128").send("<:clydeWarn:358724078263336960> **Shadow™#8337 has been warned for** `spamming` **. This is Shadow™#8337's first warning.**")
      client.channels.get("358352044094128128").send("<:clydeWarn:358724078263336960> **Shadow™#8337 has been warned for** `spamming` **. This is Shadow™#8337's second warning.**\n<:clydeDemote:358682632294236160> **Shadow™#8337 has been demoted from Moderator due to number of warnings.**")
      client.channels.get("358352044094128128").send("This is a demo. No actions have been executed.")
    }*/

});
client.on('guildMemberAdd', member => {
      client.channels.get("294115797326888961").send("<@" + member.id + "> Welcome! <:blobwave:364865411344236545>")
      member.send({embed: {
      //color: 16711680,
      fields: [{
          name: "<:blobwave:364865411344236545> Welcome to AqilAcademy!",
          value: "This is a server created by Aqil#4788.\nYou're going to want to check out <#325380886394568704> for more information about this server and what the rules are.\n\nHave a great time on AqilAcademy!"
        }
      ],

    }
  })
  client.channels.get("358352044094128128").send({embed: {
  color: 65280,
  fields: [{
      name: "<:blobwave:364865411344236545> Member Joined",
      value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id
    }
  ],

}
})

});
client.on('guildMemberRemove', member => {
      client.channels.get("294115797326888961").send("<@" + member.id + "> has left the server. <:blobsob:364864813161119764>")
      member.send("We're sorry to see you leave AqilAcademy. If you ever want to come back, here's an invite: https://discord.gg/9mWvJsH")
      client.channels.get("358352044094128128").send({embed: {
      color: 16711680,
      fields: [{
          name: "<:blobwave:364865411344236545> Member Left",
          value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id
        }
      ],

    }
  })
});
client.login(process.env.BOT_TOKEN);
