const Discord = require("discord.js");
const client = new Discord.Client({ autoReconnect: true });
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
function removePunctuation(str) {
    var m = '!@#$%^&*()_+-=~`.,></?"\':;}{[]\\☺☻';
    var r = '';
    for(var i = 0; i < str.length; i++){
        if (m.indexOf(str[i]) === -1) {
            r += str[i];
        }
    }
    return r;
}
function contains(a, b) {
    for (var i = 0; i < a.length; i++) {
        if (a.slice(i, i + b.length) === b) {
            return true;
        }
    }
};

var rbRole = ["<@&364725306478821388>"];

var badWords = "fuck,shit,yoy,cock,dick,sex,porn,fucker,mother fucker,bitch,asshole,tit,vagina,pussy,ass".split(",");
var goodWords = "class,cows,oyoy,glass".split(",");


client.on('message', msg => {
    /*if(badWords.some(word => removePunctuation(msg.content.toLowerCase()).includes(word.toLowerCase())) && !goodWords.some(word => removePunctuation(msg.content.toLowerCase()).includes(word.toLowerCase()))) {
            if(msg.author.id === client.user.id) return;
            msg.delete();
            msg.reply("Please control your language! <:stop:364887308782272512>");
            let member = msg.author;
            member.send("**You've been warned in AqilAcademy:**\nPlease do not use words that go against the language filter. Thank you!\n\n_If you believe this word was filtered in error, please contact <@299150484218970113>._");
            client.channels.get("358352044094128128").send({
                embed: {
                    color: 16753920,
                    fields: [{
                        name: "<:blobpolice:364194401783775252> Member Warned",
                        value: "Member: " + msg.author.username + "#" + msg.author.discriminator + "\nMember ID: " + msg.author.id + "\nModerator: Clyde#5067" + "\nWarning: Please do not use words that go against the language filter. Thank you!"
                    }],

                }
            })
            client.channels.get("373559262095343616").send("!!infract " + msg.author.id)
            client.channels.get("360909001346514954").send("**Filtered Message:** " + msg.content)
        }*/
    
    
var said = msg.content.toLowerCase(); //declare said
    if (msg.content.startsWith(prefix + "cookpie")) {
          /*const responses = ["burnt", "perfect", "undercooked"]
                  let toSay = Math.floor(Math.random() * responses.length)
                  console.log(toSay)
                  if(toSay === 0) {
                      msg.reply("Your pie is cooking!").then(msg => {
                          msg.delete(3000)
                      })
                      msg.channel.send("<:cookingpie:378570967171072010>\n:fire:").then(msg => {
                          setTimeout(function() {
                      msg.edit("<:perfectpie:378571086436237315>\n:fire:")

                  }, 1500)
                          setTimeout(function() {
                      msg.edit("<:burntpie:378570967170940928>")

                  }, 3000)


                      })
                      setTimeout(function() {
                        msg.reply("Oh no! Your pie burnt!")
                      }, 3000)
                  } else if(toSay === 1) {
                      msg.reply("Your pie is cooking!").then(msg => {
                          msg.delete(3000)
                      })
                      msg.channel.send("<:cookingpie:378570967171072010>\n:fire:").then(msg => {
                          setTimeout(function() {
                      msg.edit("<:perfectpie:378571086436237315>")

                  }, 3000)


                      })
                      setTimeout(function() {
                        msg.reply("Your pie was cooked to perfection! Yum!")
                      }, 3000)
                  } else if (toSay === 2) {
                      msg.reply("Your pie is cooking!").then(msg => {
                          msg.delete(3000)
                      })
                      msg.channel.send("<:cookingpie:378570967171072010>\n:fire:").then(msg => {
                          setTimeout(function() {
                      msg.edit("<:cookingpie:378570967171072010>")

                  }, 3000)


                      })
                      setTimeout(function() {
                        msg.reply("Oh no! Your pie was undercooked!")
                      }, 3000)
                  }*/
        msg.reply("Something went wrong. Please try again.")
      }
    if(msg.content.startsWith(prefix + "tag")) {
        let saidTag = said.split(" ")
        switch(saidTag[1]) {
            case "offtopic":
                msg.delete()
                msg.channel.send("Woah, that's getting off topic! Please move to <#325046144495255552>!")

            break;
            case "clydeadmins":
                msg.channel.send("The Clyde Admins are Shadow™#8337 and Aqil#4788. ")
            break;
            case "banme":
                if(msg.author.id === "325070981158928393") {
                msg.reply("<:clydeWarnRed:358724931107684362> Something went wrong. The Clyde Admins have been notified. Please try again later.")
                } else {
                    msg.reply("`ERROR`\nYou are not <@325070981158928393>")
                    return;
                }
            break;
            case "invite":
               msg.reply("Here's an invite to this server! https://discord.gg/RKESYJ6\nShare it with everyone you know! :smiley:") 
            break;
            case "noping":
                msg.channel.send("DO NOT PING SHADOW. or else... https://cdn.discordapp.com/attachments/356496172203900928/374705013462794240/Screen_Shot_2017-10-30_at_7.41.50_PM.png")
            break;
            case "soontm":
                msg.channel.send("<:soontm:375600364373934081>\nsoon™ does not represent any time in the past present or future. We do not guarantee that soon™ will be here before the end of time.").then(msg => msg.react(":soontm:375600364373934081"))
            break;
            case "nospam":
                if(!msg.mentions.members.first()) {
                msg.channel.send("Don't spam... or else: https://cdn.discordapp.com/attachments/356496172203900928/377580622312636453/Screen_Shot_2017-11-07_at_5.10.08_PM.png")
                } else {
                let target = msg.mentions.members.first()
                let targetID = target.user.id
                msg.channel.send("<:AGONY:377581582979956738> HEY <@" + targetID + "> - Don't spam... or else: https://cdn.discordapp.com/attachments/356496172203900928/377580622312636453/Screen_Shot_2017-11-07_at_5.10.08_PM.png")
                
                }
            break;
            case "breaksilence":
                const responses = ["<:kek:370319189640216599> :microphone2: :loudspeaker: **_BREAKS SILENCE, EVERYONE'S EARS, AND ALL NEARBY WINDOWS ) ) )_**", ":loudspeaker: **_BREAKS SILENCE_ )))**", "Breaking silence almost never works, I'm not going to do that.", "<:hyperthink:370891041458618370>", ":sleeping: ask me later", "nah - not in the mood to do that right now", ":hammer: TIME TO BREAK THE SILENCE!!! :smiling_imp:", ":thinking: Maybe an <@&377601228714147846> ping will help!"]
                let toSay = Math.floor(Math.random() * responses.length)
                msg.channel.send(`${responses[toSay]}`).then(msg => {
                    if(toSay === 7) {
                        msg.react(":WHOPINGEDME:377279438028800000")
                    }
                })
            break;
            default:
                msg.channel.send("<:clydeDeny:361217772220448769> That tag was not found. Please check your spelling or suggest it be added by posting a comment at https://github.com/ShadowKA/AqilAcademy-bot/issues/6 or contacting Shadow.")

        }
    }
    if (msg.content === prefix + "restart") {
        if (msg.author.id === "299150484218970113" || msg.author.id === "316313763513106434") {
            if(electionOn === true) {
                msg.channel.send("**<@299150484218970113> Election Data to Input After Bot Restart**\n\nRunning: " + running + "\nDisqualified: " + disqualified)
            }
            msg.reply("Bot restarting...")
            client.user.setStatus("dnd")
            setTimeout(function() {
                process.exit()
            }, 5000)
            
        } else {
            msg.delete(7000)
            msg.reply("`ERROR`\nIncorrect Permissions").then(msg => msg.delete(7000))
        }
    }
    if (msg.content.startsWith(prefix + "requestemoji")) {
        let requestedEmoji = msg.attachments.first()
        if(!requestedEmoji) {
            msg.reply("You must attach the emoji you would like to request.")
            return;
        }
        msg.reply("Your request has been sent.")
        const embed = new Discord.RichEmbed();
        embed.setTitle("New Emoji Request: " + requestedEmoji.filename)
        embed.setDescription("Requested by " + msg.author.tag)
        embed.setThumbnail(requestedEmoji.url)
        client.channels.get("373956780746866688").send({ embed })
        client.channels.get("373956780746866688").send("<@&373963937026277376>")
    }
    if (msg.content.startsWith(prefix + "eval")) {
        if (msg.author.id !== "299150484218970113") return msg.reply("`ERROR`\nIncorrect Permissions");
        let args = msg.content.split(" ").slice(1);

        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            msg.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
    
    if (msg.author.bot && !client.user) return;
    
    for (var i = 0; i < rbRole.length; i++) {
        if (contains(msg.content.toLowerCase(), rbRole[i].toLowerCase())) {
            if(!msg.member.bannable) return msg.author.send(":tired_face: I can't ban you on AqilAcademy! But I'm just letting you know that YOU SHOULD NEVER PING THE HYPERTHINKS EVER. Kthxbai.")
            msg.channel.send("<:blobhammer:364493777882185728> " + msg.author.tag + " has been banned for `PINGED THE HYPERTHINKS 😡`.")
            client.channels.get("358352044094128128").send({
                embed: {
                    color: 16711680,
                    fields: [{
                        name: "<:blobhammer:364493777882185728> Member Banned",
                        value: "Member: " + msg.author.tag + "\nMember ID: " + msg.author.id + "\nModerator: Hyperthinks Everywhere\nReason: PINGED THE HYPERTHINKS 😡"
                    }],

                }
            })
            msg.member.ban("PINGED THE HYPERTHINKS 😡")
        }
    }   
    
    
    if (msg.content === prefix + "suggest party-instructions") {
        msg.delete()
        msg.channel.send(":scream: _A new channel just appeared for me! What is it???_\nThis is the place to submit your suggestions for parties in the next AqilAcademy election.\n\n**Okay, I just had this great idea for a party! How do I submit it?**\nIt's simple! Just use the `.suggestparty` command anywhere on this server. It will appear here and can be voted on by other members.\n```Example: .suggestparty The Party of ™Ness```\n**I see some great suggestions here, how do I support them?** OR **I don't like this suggestion, how do I downvote it?**\nReact with either <:upvote:361166616081203200> or <:downvote:361166591943114752>.")
    }

    if (said.startsWith(prefix + "speak")) { //Shadow Only
        var toSpeak = msg.content.slice(prefix.length + 6, msg.length);
        if (msg.author.id === "299150484218970113" || msg.author.id === "316313763513106434") {
            msg.delete()
            if (msg.author.id === "299150484218970113") {
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
    if (said.startsWith(prefix + "timeout")) {
        let member = msg.mentions.members.first();
        let modRole = msg.guild.roles.find("name", "Moderator")
        let cp = msg.guild.roles.find("name", "Complete Power")
        if (msg.member.roles.has(modRole.id)) {
            if (msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
                let member = msg.mentions.members.first()
                if (!member) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a member to put in timeout.").then(msg => msg.delete(7000));
                    return;
                }
                let muteRole = msg.guild.roles.find("name", "Timeout")
                if (!muteRole) {
                    msg.delete(7000);
                    msg.reply(":thinking: It seems that something went wrong. Your error has been reported to the Clyde admins.").then(msg => msg.delete(7000));
                    return;
                }
                if (member.roles.has(muteRole.id)) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nThis user is already in timeout.").then(msg => msg.delete(7000));
                    return;
                }
                let params = msg.content.split(" ").slice(1);
                let reason = msg.content.split(/\s+/g).slice(3).join(" ");

                let time = params[1];

                console.log(reason)

                if (!time) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a duration for the timeout.").then(msg => msg.delete(7000));
                    return;
                }

                if (!reason[0]) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a reason for the timeout.").then(msg => msg.delete(7000));
                    return;
                }
                member.addRole(muteRole.id, reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator)
                msg.delete();
                msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been given a timeout for `" + reason + "` that will last " + ms(ms(time), { long: true }) + ".")
                client.channels.get("358352044094128128").send({
                    embed: {
                        color: 16753920,
                        fields: [{
                            name: "<:blobpolice:364194401783775252> Member Given Timeout",
                            value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason + "\nTime: " + ms(ms(time), { long: true })
                        }],

                    }
                })
                client.channels.get("373559262095343616").send("!!infract " + member.user.id)
                member.send("<:blobpolice:364194401783775252> You were put in timeout on AqilAcademy with the reason `" + reason + "`. This will last for " + ms(ms(time), { long: true }) + ". While you're waiting, you should take a look over <#325380886394568704>.")
                setTimeout(function() {
                    if (!member.roles.has(muteRole.id)) return;
                    member.removeRole(muteRole.id, "Timeout Ended")
                    client.channels.get("358352044094128128").send({
                        embed: {
                            color: 16753920,
                            fields: [{
                                name: "<:blobpolice:364194401783775252> Member Timeout Ended",
                                value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Timeout"
                            }],

                        }
                    })

                }, ms(time))
            } else if (msg.member.roles.has(cp.id)) {
                let member = msg.mentions.members.first()
                if (!member) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a member to put in timeout.").then(msg => msg.delete(7000));
                    return;
                }
                if (member.roles.has(cp.id)) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\Members with Complete Power cannot be put in timeout.").then(msg => msg.delete(7000));
                    return;
                }
                let muteRole = msg.guild.roles.find("name", "Timeout")
                if (!muteRole) {
                    msg.delete(7000);
                    msg.reply(":thinking: It seems that something went wrong. Your error has been reported to the Clyde admins.").then(msg => msg.delete(7000));
                    return;
                }
                if (member.roles.has(muteRole.id)) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nThis user is already in timeout.").then(msg => msg.delete(7000));
                    return;
                }
                let params = msg.content.split(" ").slice(1);
                let reason = msg.content.split(/\s+/g).slice(3).join(" ");

                let time = params[1];

                console.log(reason)

                if (!time) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a duration for the timeout.").then(msg => msg.delete(7000));
                    return;
                }

                if (!reason[0]) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a reason for the timeout.").then(msg => msg.delete(7000));
                    return;
                }
                member.addRole(muteRole.id, reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator)
                msg.delete();
                msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been given a timeout for `" + reason + "` that will last " + ms(ms(time), { long: true }) + ".")
                client.channels.get("358352044094128128").send({
                    embed: {
                        color: 16753920,
                        fields: [{
                            name: "<:blobpolice:364194401783775252> Member Given Timeout",
                            value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason + "\nTime: " + ms(ms(time), { long: true })
                        }],

                    }
                })
                client.channels.get("373559262095343616").send("!!infract " + member.user.id)
                member.send("<:blobpolice:364194401783775252> You were put in timeout on AqilAcademy with the reason `" + reason + "`. This will last for " + ms(ms(time), { long: true }) + ". While you're waiting, you should take a look over <#325380886394568704>.")
                setTimeout(function() {
                    if (!member.roles.has(muteRole.id)) return;
                    member.removeRole(muteRole.id, "Timeout Ended")
                    client.channels.get("358352044094128128").send({
                        embed: {
                            color: 16753920,
                            fields: [{
                                name: "<:blobpolice:364194401783775252> Member Timeout Ended",
                                value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Timeout"
                            }],

                        }
                    })

                }, ms(time))
            } else {

                let member = msg.mentions.members.first()
                if (!member) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a member to put in timeout.").then(msg => msg.delete(7000));
                    return;
                }
                if (member.roles.has(modRole.id)) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nModerators cannot be put in timeout.").then(msg => msg.delete(7000));
                    return;
                }
                let muteRole = msg.guild.roles.find("name", "Timeout")
                if (!muteRole) {
                    msg.delete(7000);
                    msg.reply(":thinking: It seems that something went wrong. Your error has been reported to the Clyde admins.").then(msg => msg.delete(7000));
                    return;
                }
                if (member.roles.has(muteRole.id)) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nThis user is already in timeout.").then(msg => msg.delete(7000));
                    return;
                }
                let params = msg.content.split(" ").slice(1);
                let reason = msg.content.split(/\s+/g).slice(3).join(" ");

                let time = params[1];

                console.log(reason)

                if (!time) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a duration for the timeout.").then(msg => msg.delete(7000));
                    return;
                }

                if (!reason[0]) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a reason for the timeout.").then(msg => msg.delete(7000));
                    return;
                }
                member.addRole(muteRole.id, reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator)
                msg.delete();
                msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been given a timeout for `" + reason + "` that will last " + ms(ms(time), { long: true }) + ".")
                client.channels.get("358352044094128128").send({
                    embed: {
                        color: 16753920,
                        fields: [{
                            name: "<:blobpolice:364194401783775252> Member Given Timeout",
                            value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason + "\nTime: " + ms(ms(time), { long: true })
                        }],

                    }
                })
                member.send("<:blobpolice:364194401783775252> You were put in timeout on AqilAcademy with the reason `" + reason + "`. This will last for " + ms(ms(time), { long: true }) + ". While you're waiting, you should take a look over <#325380886394568704>.")
                client.channels.get("373559262095343616").send("!!infract " + member.user.id)
                setTimeout(function() {
                    if (!member.roles.has(muteRole.id)) return;
                    member.removeRole(muteRole.id, "Timeout Ended")
                    client.channels.get("358352044094128128").send({
                        embed: {
                            color: 16753920,
                            fields: [{
                                name: "<:blobpolice:364194401783775252> Member Timeout Ended",
                                value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Timeout"
                            }],

                        }
                    })

                }, ms(time))



            }
        } else {
            msg.reply("`ERROR`\nYou do not have the `Moderator` role.")
            return;
        }
    }

    if (said.startsWith(prefix + "mute")) {
        let member = msg.mentions.members.first();
        let modRole = msg.guild.roles.find("name", "Moderator")
        let cp = msg.guild.roles.find("name", "Complete Power")
        if (msg.member.roles.has(modRole.id)) {
            if (msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
                let member = msg.mentions.members.first()
                if (!member) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a member to mute.").then(msg => msg.delete(7000));
                    return;
                }

                let muteRole = msg.guild.roles.find("name", "Muted")
                if (!muteRole) {
                    msg.delete(7000);
                    msg.reply(":thinking: It seems that something went wrong. Your error has been reported to the Clyde admins.").then(msg => msg.delete(7000));
                    return;
                }
                if (member.roles.has(muteRole.id)) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nThis user is already muted.").then(msg => msg.delete(7000));
                    return;
                }
                let params = msg.content.split(" ").slice(1);
                let reason = msg.content.split(/\s+/g).slice(3).join(" ");

                let time = params[1];

                console.log(reason)

                if (!time) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a duration for the mute.").then(msg => msg.delete(7000));
                    return;
                }

                if (!reason[0]) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a reason for the mute.").then(msg => msg.delete(7000));
                    return;
                }
                member.addRole(muteRole.id, reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator)
                msg.delete();
                msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been muted for " + ms(ms(time), { long: true }) + " with reason `" + reason + "`.")
                client.channels.get("358352044094128128").send({
                    embed: {
                        color: 16753920,
                        fields: [{
                            name: "<:blobpolice:364194401783775252> Member Muted",
                            value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason + "\nTime: " + ms(ms(time), { long: true })
                        }],

                    }
                })
                member.send("<:blobpolice:364194401783775252> You were muted on AqilAcademy with the reason `" + reason + "`. This will last for " + ms(ms(time), { long: true }) + ". While you're waiting, you should take a look over <#325380886394568704>.")
                client.channels.get("373559262095343616").send("!!infract " + member.user.id)
                setTimeout(function() {
                    if (!member.roles.has(muteRole.id)) return;
                    member.removeRole(muteRole.id, "Mute Ended")
                    client.channels.get("358352044094128128").send({
                        embed: {
                            color: 16753920,
                            fields: [{
                                name: "<:blobpolice:364194401783775252> Member Unmuted",
                                value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Mute"
                            }],

                        }
                    })

                }, ms(time))
            } else if (msg.member.roles.has(cp.id)) {
                let member = msg.mentions.members.first()
                if (!member) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a member to mute.").then(msg => msg.delete(7000));
                    return;
                }
                if (member.roles.has(cp.id)) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nMembers with Complete Power cannot be muted.").then(msg => msg.delete(7000));
                    return;
                }
                let muteRole = msg.guild.roles.find("name", "Muted")
                if (!muteRole) {
                    msg.delete(7000);
                    msg.reply(":thinking: It seems that something went wrong. Your error has been reported to the Clyde admins.").then(msg => msg.delete(7000));
                    return;
                }
                if (member.roles.has(muteRole.id)) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nThis user is already muted.").then(msg => msg.delete(7000));
                    return;
                }
                let params = msg.content.split(" ").slice(1);
                let reason = msg.content.split(/\s+/g).slice(3).join(" ");

                let time = params[1];

                console.log(reason)

                if (!time) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a duration for the mute.").then(msg => msg.delete(7000));
                    return;
                }

                if (!reason[0]) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a reason for the mute.").then(msg => msg.delete(7000));
                    return;
                }
                member.addRole(muteRole.id, reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator)
                msg.delete();
                msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been muted for " + ms(ms(time), { long: true }) + " with reason `" + reason + "`.")
                client.channels.get("358352044094128128").send({
                    embed: {
                        color: 16753920,
                        fields: [{
                            name: "<:blobpolice:364194401783775252> Member Muted",
                            value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason + "\nTime: " + ms(ms(time), { long: true })
                        }],

                    }
                })
                member.send("<:blobpolice:364194401783775252> You were muted on AqilAcademy with the reason `" + reason + "`. This will last for " + ms(ms(time), { long: true }) + ". While you're waiting, you should take a look over <#325380886394568704>.")
                client.channels.get("373559262095343616").send("!!infract " + member.user.id)
                setTimeout(function() {
                    if (!member.roles.has(muteRole.id)) return;
                    member.removeRole(muteRole.id, "Mute Ended")
                    client.channels.get("358352044094128128").send({
                        embed: {
                            color: 16753920,
                            fields: [{
                                name: "<:blobpolice:364194401783775252> Member Unmuted",
                                value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Mute"
                            }],

                        }
                    })

                }, ms(time))
            } else {

                let member = msg.mentions.members.first()
                if (!member) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a member to mute.").then(msg => msg.delete(7000));
                    return;
                }
                if (member.roles.has(modRole.id)) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nMembers with the Moderator role cannot be muted.").then(msg => msg.delete(7000));
                    return;
                }
                let muteRole = msg.guild.roles.find("name", "Muted")
                if (!muteRole) {
                    msg.delete(7000);
                    msg.reply(":thinking: It seems that something went wrong. Your error has been reported to the Clyde admins.").then(msg => msg.delete(7000));
                    return;
                }
                if (member.roles.has(muteRole.id)) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nThis user is already muted.").then(msg => msg.delete(7000));
                    return;
                }
                let params = msg.content.split(" ").slice(1);
                let reason = msg.content.split(/\s+/g).slice(3).join(" ");

                let time = params[1];

                console.log(reason)

                if (!time) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a duration for the mute.").then(msg => msg.delete(7000));
                    return;
                }

                if (!reason[0]) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a reason for the mute.").then(msg => msg.delete(7000));
                    return;
                }
                member.addRole(muteRole.id, reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator)
                msg.delete();
                msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been muted for " + ms(ms(time), { long: true }) + " with reason `" + reason + "`.")
                client.channels.get("358352044094128128").send({
                    embed: {
                        color: 16753920,
                        fields: [{
                            name: "<:blobpolice:364194401783775252> Member Muted",
                            value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason + "\nTime: " + ms(ms(time), { long: true })
                        }],

                    }
                })
                member.send("<:blobpolice:364194401783775252> You were muted on AqilAcademy with the reason `" + reason + "`. This will last for " + ms(ms(time), { long: true }) + ". While you're waiting, you should take a look over <#325380886394568704>.")
                client.channels.get("373559262095343616").send("!!infract " + member.user.id)
                setTimeout(function() {
                    if (!member.roles.has(muteRole.id)) return;
                    member.removeRole(muteRole.id, "Mute Ended")
                    client.channels.get("358352044094128128").send({
                        embed: {
                            color: 16753920,
                            fields: [{
                                name: "<:blobpolice:364194401783775252> Member Unmuted",
                                value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Mute"
                            }],

                        }
                    })

                }, ms(time))



            }
        } else {
            msg.reply("`ERROR`\nYou do not have the `Moderator` role.")
            return;
        }
    }
    if (said.startsWith(prefix + "unmute")) {
        let cp = msg.guild.roles.find("name", "Complete Power")
        let modRole = msg.guild.roles.find("name", "Moderator")
        if (msg.member.roles.has(modRole.id)) {
            if (msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
                let member = msg.mentions.members.first()
                if (!member) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a member to unmute.").then(msg => msg.delete(7000));
                    return;
                }

                let muteRole = msg.guild.roles.find("name", "Muted")
                if (!muteRole) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nIncorrect Mute Role Configuration").then(msg => msg.delete(7000));
                    return;
                }
                if (!member.roles.has(muteRole.id)) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nThis user is not currently muted.").then(msg => msg.delete(7000));
                    return;
                }
                let reason = msg.content.split(/\s+/g).slice(3).join(" ");


                if (!reason) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a reason.").then(msg => msg.delete(7000))
                    return;
                }
                member.removeRole(muteRole.id)
                msg.delete();
                msg.channel.send("<:clydeApprove:366662545504862211> " + member.user.username + "#" + member.user.discriminator + " has been umuted with reason `" + reason + "`.")
                client.channels.get("358352044094128128").send({
                    embed: {
                        color: 16753920,
                        fields: [{
                            name: "<:blobpolice:364194401783775252> Member Unmuted",
                            value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Mute"
                        }],

                    }
                })
            } else if (msg.member.roles.has(cp.id)) {
                let member = msg.mentions.members.first()
                if (!member) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a member to unmute.").then(msg => msg.delete(7000));
                    return;
                }
                if (member.roles.has(cp.id)) {
                    msg.delete(7000)
                    msg.reply("`ERROR`\nYou cannot unmute other members with Complete Power.")
                    return;
                }
                let muteRole = msg.guild.roles.find("name", "Muted")
                if (!muteRole) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nIncorrect Mute Role Configuration").then(msg => msg.delete(7000));
                    return;
                }
                if (!member.roles.has(muteRole.id)) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nThis user is not currently muted.").then(msg => msg.delete(7000));
                    return;
                }
                let reason = msg.content.split(/\s+/g).slice(3).join(" ");


                if (!reason) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a reason.").then(msg => msg.delete(7000))
                    return;
                }
                member.removeRole(muteRole.id)
                msg.delete();
                msg.channel.send("<:clydeApprove:366662545504862211> " + member.user.username + "#" + member.user.discriminator + " has been umuted with reason `" + reason + "`.")
                client.channels.get("358352044094128128").send({
                    embed: {
                        color: 16753920,
                        fields: [{
                            name: "<:blobpolice:364194401783775252> Member Unmuted",
                            value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Mute"
                        }],

                    }
                })
            } else {
                let member = msg.mentions.members.first()
                if (!member) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a member to unmute.").then(msg => msg.delete(7000));
                    return;
                }
                if (member.roles.has(modRole.id)) {
                    msg.delete(7000)
                    msg.reply("`ERROR`\nYou cannot unmute other Moderators.")
                    return;
                }
                let muteRole = msg.guild.roles.find("name", "Muted")
                if (!muteRole) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nIncorrect Mute Role Configuration").then(msg => msg.delete(7000));
                    return;
                }
                if (!member.roles.has(muteRole.id)) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nThis user is not currently muted.").then(msg => msg.delete(7000));
                    return;
                }
                let reason = msg.content.split(/\s+/g).slice(3).join(" ");


                if (!reason) {
                    msg.delete(7000);
                    msg.reply("`ERROR`\nYou must specify a reason.").then(msg => msg.delete(7000))
                    return;
                }
                member.removeRole(muteRole.id)
                msg.delete();
                msg.channel.send("<:clydeApprove:366662545504862211> " + member.user.username + "#" + member.user.discriminator + " has been umuted with reason `" + reason + "`.")
                client.channels.get("358352044094128128").send({
                    embed: {
                        color: 16753920,
                        fields: [{
                            name: "<:blobpolice:364194401783775252> Member Unmuted",
                            value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067" + "\nReason: Automatic End of Mute"
                        }],

                    }
                })
            }
        } else {
            msg.delete(7000);
            msg.reply("`ERROR` You do not have the `Moderator` role.").then(msg => msg.delete(7000));
        }
    }



    if (said.startsWith(prefix + "kick")) {

        if (msg.member.hasPermission("KICK_MEMBERS")) {
            let member = msg.mentions.members.first();
            let modRole = msg.guild.roles.find("name", "Moderator")
            let cp = msg.guild.roles.find("name", "Complete Power")
            if (msg.member.roles.has(modRole.id)) {
                if (msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
                    if (!member) {
                        msg.delete(3000);
                        msg.reply("`ERROR`\nPlease specify a member to kick.").then(msg => msg.delete(3000));
                        return;
                    }

                    let reason = msg.content.split(/\s+/g).slice(2).join(" ");
                    if (!reason) {
                        msg.reply("`ERROR`\nReason not specified.")
                        return;
                    }
                    msg.delete(3000)
                    msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been kicked for `" + reason + "`.")
                    client.channels.get("358352044094128128").send({
                        embed: {
                            color: 16711680,
                            fields: [{
                                name: "<:blobpolice:364194401783775252> Member Kicked",
                                value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason
                            }],

                        }
                    })
                    member.kick(reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator);

                    return;
                }

                if (msg.member.roles.has(cp.id)) {
                    if (member.roles.has(cp.id)) {
                        msg.reply("`ERROR`\nYou cannot kick someone with the Complete Power role.")
                        return;
                    } else {
                        if (!member) {
                            msg.delete(3000);
                            msg.reply("`ERROR`\nPlease specify a member to kick.").then(msg => msg.delete(3000));
                            return;
                        }

                        let reason = msg.content.split(/\s+/g).slice(2).join(" ");
                        if (!reason) {
                            msg.reply("`ERROR`\nReason not specified.")
                            return;
                        }
                        msg.delete(3000)
                        msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been kicked for `" + reason + "`.")
                        client.channels.get("358352044094128128").send({
                            embed: {
                                color: 16711680,
                                fields: [{
                                    name: "<:blobpolice:364194401783775252> Member Kicked",
                                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason
                                }],

                            }
                        })
                        member.kick(reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator);

                        return;
                    }
                } else {
                    if (member.roles.has(modRole.id)) {
                        msg.reply("`ERROR`\nThis user is a mod/admin, they cannot be kicked.")
                        return;
                    } else {
                        if (!member) {
                            msg.delete(3000);
                            msg.reply("`ERROR`\nPlease specify a member to kick.").then(msg => msg.delete(3000));
                            return;
                        }

                        let reason = msg.content.split(/\s+/g).slice(2).join(" ");
                        if (!reason) {
                            msg.reply("`ERROR`\nReason not specified.")
                            return;
                        }
                        msg.delete(3000)
                        msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been kicked for `" + reason + "`.")
                        client.channels.get("358352044094128128").send({
                            embed: {
                                color: 16711680,
                                fields: [{
                                    name: "<:blobpolice:364194401783775252> Member Kicked",
                                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason
                                }],

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

    if (said.startsWith(prefix + "ban")) {

        if (msg.member.hasPermission("BAN_MEMBERS")) {
            let member = msg.mentions.members.first();
            let modRole = msg.guild.roles.find("name", "Moderator")
            let cp = msg.guild.roles.find("name", "Complete Power")
            if (msg.member.roles.has(modRole.id)) {
                if (msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
                    if (!member) {
                        msg.delete(3000);
                        msg.reply("`ERROR`\nPlease specify a member to ban.").then(msg => msg.delete(3000));
                        return;
                    }

                    let reason = msg.content.split(/\s+/g).slice(2).join(" ");
                    if (!reason) {
                        msg.reply("`ERROR`\nReason not specified.")
                        return;
                    }
                    msg.delete(3000)
                    msg.channel.send("<:blobhammer:364493777882185728> " + member.user.username + "#" + member.user.discriminator + " has been banned for `" + reason + "`.")
                    client.channels.get("358352044094128128").send({
                        embed: {
                            color: 16711680,
                            fields: [{
                                name: "<:blobhammer:364493777882185728> Member Banned",
                                value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason
                            }],

                        }
                    })
                    member.ban(reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator);

                    return;
                }

                if (msg.member.roles.has(cp.id)) {
                    if (member.roles.has(cp.id)) {
                        msg.reply("`ERROR`\nYou cannot ban someone with the Complete Power role.")
                        return;
                    } else {
                        if (!member) {
                            msg.delete(3000);
                            msg.reply("`ERROR`\nPlease specify a member to ban.").then(msg => msg.delete(3000));
                            return;
                        }

                        let reason = msg.content.split(/\s+/g).slice(2).join(" ");
                        if (!reason) {
                            msg.reply("`ERROR`\nReason not specified.")
                            return;
                        }
                        msg.delete(3000)
                        msg.channel.send("<:blobhammer:364493777882185728> " + member.user.username + "#" + member.user.discriminator + " has been banned for `" + reason + "`.")
                        client.channels.get("358352044094128128").send({
                            embed: {
                                color: 16711680,
                                fields: [{
                                    name: "<:blobhammer:364493777882185728> Member Banned",
                                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason
                                }],

                            }
                        })
                        member.ban(reason + " - Responsible User: " + msg.author.username + "#" + msg.author.discriminator);

                        return;
                    }
                } else {
                    if (member.roles.has(modRole.id)) {
                        msg.reply("`ERROR`\nThis user is a mod/admin, they cannot be banned.")
                        return;
                    } else {
                        if (!member) {
                            msg.delete(3000);
                            msg.reply("`ERROR`\nPlease specify a member to ban.").then(msg => msg.delete(3000));
                            return;
                        }

                        let reason = msg.content.split(/\s+/g).slice(2).join(" ");
                        if (!reason) {
                            msg.reply("`ERROR`\nReason not specified.")
                            return;
                        }
                        msg.delete(3000)
                        msg.channel.send("<:blobhammer:364493777882185728> " + member.user.username + "#" + member.user.discriminator + " has been banned for `" + reason + "`.")
                        client.channels.get("358352044094128128").send({
                            embed: {
                                color: 16711680,
                                fields: [{
                                    name: "<:blobhammer:364493777882185728> Member Banned",
                                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nReason: " + reason
                                }],

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
    if (said.startsWith(prefix + "hello")) {
        msg.reply("Hey!");
    }
    if (said.startsWith(prefix + "warn")) {
        let modRole = msg.guild.roles.find("name", "Moderator")
        if (msg.member.roles.has(modRole.id)) {
            let member = msg.mentions.members.first();
            if (!member) {
                msg.delete(3000);
                msg.reply("`ERROR`\nNo member was specified.").then(msg => msg.delete(3000));
                return;
            }
            let warning = msg.content.split(/\s+/g).slice(2).join(" ");
            if (!warning) {
                msg.delete(3000)
                msg.reply("`ERROR`\nYou must specify a warning.").then(msg => msg.delete(3000))
            }
            msg.delete();
            member.send("**You've been warned in AqilAcademy:**\n" + warning);
            msg.channel.send("<:blobpolice:364194401783775252> " + member.user.username + "#" + member.user.discriminator + " has been warned for `" + warning + "`.")
            client.channels.get("358352044094128128").send({
                embed: {
                    color: 16753920,
                    fields: [{
                        name: "<:blobpolice:364194401783775252> Member Warned",
                        value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: " + msg.author.username + "#" + msg.author.discriminator + "\nWarning: " + warning
                    }],

                }
            })
            client.channels.get("373559262095343616").send("!!infract " + member.user.id)
        } else {

            msg.reply("`ERROR`\nYou are not a Moderator.")
            return;
        }
    }
    if (msg.content === prefix + "uptime") {
        msg.reply("I have been online for " + ms(client.uptime, { long: true }) + ".")
    }
    if (said.startsWith(prefix + "startelection")) {
        if (msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
            let params = msg.content.split(" ").slice(1);
            console.log(params)

            let time = params[0];
            console.log(time)
            if (!time) return msg.reply("Please specify a duration for the election.")
            electionOn = true;
            client.channels.get("372339686443843584").send("@everyone")
            client.channels.get("372339686443843584").send({
                embed: {
                    color: 7506394,
                    author: {
                        name: "New Election Started by " + msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    fields: [{
                            name: "How Do I Run?",
                            value: "Use the `run` command anywhere on this server.\n```Usage: .run [PARTY] | [VICE PRESIDENT MENTION] | [SLOGAN] | [MORE INFORMATION]```"
                        },
                        {
                            name: "How Do I Vote?",
                            value: "React with <:vote:351429308293578752> for the candidate of your choice.\n**You can only vote once, so choose wisely. Any user who votes multiple times will not have any of their votes counted.**\nThis election will last " + ms(ms(time), { long: true }) + ".\nCandidates can speak to the AqilAcademy users at any time in <#372465500581527558>, just don't spam."
                        },
                        {
                            name: "NOTE",
                            value: "Aqil may remove users from the election at any time if they have shown that they cannot handle the role of President."
                        },
                        {
                            name: "Parties",
                            value: "**You must specify your party as one of the following or else the bot will not work.**\nBlobhammer\nFederalists\nLeague\nBanhammers"
                        },
                        {
                            name: "New For This Election",
                            value: "Vice Presidents! The VP system will only work if you MENTION the user in the run command (as seen above)."
                        }
                    ],

                }
            })
            //ms(ms(time), {long: true})
            setTimeout(function() {
                electionOn = false;
                client.channels.get("372339686443843584").send("**The Election Has Ended!**")
            }, ms(time))
        }
    }
    if (said.startsWith(prefix + "run")) {
        if (electionOn !== true) return msg.reply("An election is not currently in progress.");
        if (disqualified.includes(msg.author.id) === true) return msg.reply("`ERROR`\nYou have been disqualified from the election.")
        if (running.includes(msg.author.id) === true) return msg.reply("`ERROR`\nYou have already entered the race.")
        let params1 = said.split(" ").slice(0)
        if(!params1[1]) return msg.reply("`ERROR`\nYou have not specified a party. Please try again.");
        params1[1] = params1[1].toLowerCase()
        console.log(params1)
        let params2 = msg.content.split(" | ").slice(1);
        //params2 = slogan and more info
        console.log(params2)

        if (params1[1] === "blobhammer") {
            params1[1] = "The <:blobhammer:364493777882185728>";
        } else if (params1[1] === "federalists") { params1[1] = "AqilAcademy Federalists"; } else if (params1[1] === "league") { params1[1] = "League of Discordians"; } else if (params1[1] === "banhammers") { params1[1] = "The Banhammers" } else {
            msg.reply("`ERROR`\nParty was not specified correctly. Please try again.").then(msg => msg.delete(3000))
            msg.delete(3000)
            return;
        }
        if (!msg.mentions.members.first()) return msg.reply("`ERROR`\nYou have not specified a vice president. Please try again.")
        if (!params2[1]) return msg.reply("`ERROR`\nYou have not specified a slogan. Please try again.")
        if (!params2[2]) return msg.reply("`ERROR`\nYou have not specified any more information. Please try again.")

        var party = params1[1]
        var vp = msg.mentions.members.first()
        var slogan = params2[1]
        var info = params2[2]




        client.channels.get("372339686443843584").send({
            embed: {
                color: 7506394,
                author: {
                    name: msg.author.username + " Is Running for President with " + vp.user.tag + " as Vice President!",
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
        vp.addRole(role.id, "VP")
    }
    if (said.startsWith(prefix + "dsq")) {
        if (msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
            var toDsq = msg.mentions.members.first()
            var role = msg.guild.roles.find("name", "Candidate")
            toDsq.removeRole(role.id, "Disqualified from Election")
            disqualified.push(toDsq.user.id)
            client.channels.get("358352044094128128").send("<:clydeWarnRed:358724931107684362> **" + toDsq.user.username + "#" + toDsq.user.discriminator + " has been disqualified from the election.**")
            msg.reply(toDsq.user.username + "#" + toDsq.user.discriminator + " has been disqualified from the election.")
        }
    }
    if (said === prefix + "help") {
        msg.reply("**Looking for info about Clyde? Want to know all of the commands?**\n\nHead on over to https://shadowka.gitbooks.io/clyde/content/ and you'll see info about all the different functions of Clyde.");
    }
    if (said.startsWith(prefix + "suggest ")) {
        var suggestion = msg.content.slice(prefix.length+8, msg.length);
        if(!suggestion) {
            msg.reply("`ERROR`\nYou have not specified a suggestion.")
            return;
        }
      msg.reply(":ok_hand: Your suggestion `" + suggestion + "` has been submitted!")
      client.channels.get("348533185094877214").send({embed: {
      color: 7506394,
      author: {
        name: "Server Suggestion from " + msg.author.username,
        icon_url: msg.author.avatarURL
      },
      fields: [{
          name: "Suggestion:",
          value: suggestion
        }
      ],
    }
  })
    }
    if (said.startsWith(prefix + "suggestparty")) {
        msg.reply("Party Suggestions are not being currently accepted.")
      /*var suggestion = msg.content.slice(prefix.length+13, msg.length);
      msg.reply(":ok_hand: Your suggestion `" + suggestion + "` has been submitted! It can now be found in <#372339752290091008>.")
      client.channels.get("372339752290091008").send({embed: {
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
    /*if(msg.channel.id === "372339752290091008") {
      if (msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {

        } else if (msg.author.id === client.user.id) {
            msg.react(":upvote:361166616081203200").then(msg.react(":downvote:361166591943114752"))
        } else {
            msg.delete()
            return;
        }
      
    }*/
    if (msg.channel.id === "372339686443843584") {
        if (msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {

        } else if (msg.author.id === client.user.id) {
            msg.react(":vote:351429308293578752")
        } else {
            msg.delete()
            return;
        }
    }
    if (msg.content.startsWith(prefix + "electionreset")) {
        if (msg.author.id === "299150484218970113" || msg.author.id === "294115380916649986") {
        let setting = said.slice(prefix.length + 14, msg.length);
        switch(setting){
            case "dsq":
                disqualified = [];
                msg.reply("<:clydeApprove:366662545504862211> I've reset the list of disqualified users.")
            break;
            case "running":
                running = [];
                msg.reply("<:clydeApprove:366662545504862211> I've reset the list of running users.")
            break;
            case "stats":
                running = [];
                disqualified = [];
                msg.reply("<:clydeApprove:366662545504862211> I've reset the list of running and disqualified users.")
            break;
            default:
                electionOn = false;
                running = [];
                disqualified = [];
                msg.reply("<:clydeApprove:366662545504862211> I've reset all election stats, there is now no election in progress.")
        }
        } else {
            msg.reply("`ERROR`\nOnly Aqil and Shadow can use this command.")
            return;
        }
        
    }
    if (msg.content === prefix + "listemoji") {
        msg.channel.send(msg.guild.emojis.map(r => r.toString()).join("  "));
    }
    if(msg.content.startsWith("!!kick") && msg.channel.id === "373559262095343616") {
        let userID = said.slice(prefix.length + 6, msg.length);
        let aqilacademy = client.guilds.get("294115797326888961")
        let member = aqilacademy.members.get(userID)
        if(!member.kickable) return member.send(":tired_face: I can't kick you from AqilAcademy! But I'm just letting you know that you have three or more infractions and should STOP doing stuff that gives you infractions. Kthxbai");
        member.kick("Auto Kick for 3 Infractions")
        client.channels.get("358352044094128128").send({
                            embed: {
                                color: 16711680,
                                fields: [{
                                    name: "<:blobpolice:364194401783775252> Member Kicked",
                                    value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id + "\nModerator: Clyde#5067\nReason: Auto Kick for 3 Infractions"
                                }],

                            }
                        })
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
client.on('error', error => {
    client.channels.get("371766267029356565").send("`ERROR`\n```" + error + "```")
});
client.on('warn', info => {
    client.channels.get("371766267029356565").send("`WARNING`\n```" + info + "```")
});
client.on('guildMemberAdd', member => {
    let regUser = client.guilds.get("294115797326888961").roles.find("name", "Regular User")
    let pings = client.guilds.get("294115797326888961").roles.find("name", "Pings")
    member.addRole(regUser.id)
    member.addRole(pings.id)
    client.channels.get("294115797326888961").send("<@" + member.id + "> Welcome! <:blobwave:364865411344236545>")
    member.send({
        embed: {
            //color: 16711680,
            fields: [{
                name: "<:blobwave:364865411344236545> Welcome to AqilAcademy!",
                value: "This is a server created by Aqil#4788.\nYou're going to want to check out <#325380886394568704> for more information about this server and what the rules are.\n\nHave a great time on AqilAcademy!"
            }],

        }
    })
    client.channels.get("358352044094128128").send({
        embed: {
            color: 65280,
            fields: [{
                name: "<:blobwave:364865411344236545> Member Joined",
                value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id
            }],

        }
    })

});
client.on('guildMemberRemove', member => {
    client.channels.get("294115797326888961").send(member.user.tag + " has left the server. <:blobsob:364864813161119764>")
    member.send("We're sorry to see you leave AqilAcademy. If you ever want to come back, here's an invite: https://discord.gg/RKESYJ6")
    client.channels.get("358352044094128128").send({
        embed: {
            color: 16711680,
            fields: [{
                name: "<:blobwave:364865411344236545> Member Left",
                value: "Member: " + member.user.username + "#" + member.user.discriminator + "\nMember ID: " + member.user.id
            }],

        }
    })
});
client.login(process.env.BOT_TOKEN);
