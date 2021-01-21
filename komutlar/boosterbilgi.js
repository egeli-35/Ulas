 const Discord = require("discord.js");
module.exports.run = async (client, message) => {
  const dcsb = message.guild.roles.get("791255271384285206") //EGER KENDINIZ BOOSTER ROLU ACTIYSANIZ KESINLIKLE ONUN ID SINI YAZMAYIN DISCORDUN AUTO OLUSTURDUGU BOOSTER ROLUNUN ID SINI YAZIN

  const dcsu = dcsb.members.map(dcsus => dcsus.displayName).join("\n");

  const dcsuc = dcsb.members.size;
  const dcse = new Discord.RichEmbed()
    .setTitle(message.guild.name + " Boost Bilgileri")
    .setColor(dcsb.hexColor)
    .setTimestamp()
    .addField(
      "Sunucu Boost Seviyesi",
      "```" + message.guild.premiumTier + "```"
    )
    .addField(
      "Boost Sayısı",
      "```" + message.guild.premiumSubscriptionCount + "```"
    )
    .addField("Booster Sayısı", "```" + dcsuc + "```")
    .addField("Boost Basanların İsmi", "```" + dcsu + "```");
  message.channel.send(dcse).then(msg => msg.delete(12000));
};
module.exports.conf = {
  aliases: ["boosterbilgi"],
  permLevel: 3

};
module.exports.help = {
  name: "booster"
};