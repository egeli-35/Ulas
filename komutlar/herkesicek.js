const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
//Dcs 

exports.run = async (client ,message ,args) => {
  if (message.author.id != 667810949582815302) return message.channel.send(`Üzgünüm, bu komutu sadece **__BUĞRA__** Kullanabilir.`)
const id = args[0]
if (!id)
return message.reply("Üyelerin Çekileceği Bir Sesli Kanal Id Si Gir")
message.guild.members.filter(a => a.voiceChannel).forEach(x => x.setVoiceChannel(id))
message.channel.send(`Bütün Sesli Kanaldaki Üyeler <#${id}> İsimli Odaya Taşındı!`)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["herkesicek"],
  permLevel: 3
};
//Dcs
exports.help = {
  name: "allcek"
};