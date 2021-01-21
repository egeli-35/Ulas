const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

module.exports.run = async (client, message, args) => {

if (!message.member.voiceChannel)
    return message.reply("Ilk Once Sesli Bir Kanala Gir!");

  const ids = args[0];
  if (!ids)
    return message.reply(
      "Hangi Kanaldaki Uyeler Cekilecek O Kanalin ID sini Yaz"
    );
  const kk = message.guild.channels.get(ids);

  
  kk.members
    .filter(a => a.voiceChannel)
    .forEach(x => x.setVoiceChannel(message.member.voiceChannelID));
  message.channel.send(`
<${ids}> Kanalındaki Uyeler Yanina  Taşındı!`);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
//Dcs
exports.help = {
  name: "kanalcek"
};
   