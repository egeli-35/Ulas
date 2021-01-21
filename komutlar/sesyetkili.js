const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu komutu kullanmaya yetkin yok.");  
  let m = "**Sesli Kanalda Olan Yetkililer:\n**";
  let m2 = "**Sesli Kanalda Olmayan Yetkililer:\n**";
  message.guild.roles.get("792372266662232065").members.map(e => { //HERKESTE OLAN BİR YETKİLİ ROLUNUN İDSİ
    m += e.voiceChannel ? " <a:renkli:792863137782038538>  <@" + e.user.id + ">\n" : "";
    m2 += !e.voiceChannel ? " <a:renkli:792863137782038538>  <@" + e.user.id + ">\n" : "";
  });

  const dcse = new Discord.RichEmbed()
    .setTitle(message.guild.name)
    .setColor("GREEN")
    .setTimestamp()
    .setFooter("Kullanan: " + message.member.displayName)
    .setDescription("" + m + "\n\n" + m2 + "")
    .setThumbnail(message.guild.iconURL);
  message.channel.send(dcse).then(a => a.s);
};
module.exports.conf = {
  aliases: ["sesyetkili"]
};

module.exports.help = {
  name: "sesteki-yetkililer"
};