const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {

    const emoji = client.emojis.find("name", "BJORN_BEYAZTIK");
    const emoji2 = client.emojis.find("name" , "BJORN_UNLEM")
  
if (!message.member.roles.has('740626457226772570') && !message.member.hasPermission('ADMINISTRATOR')) //KOMUTU KULLANICAK ROL İD
    return message.channel.send(`Bu komudu kullanabilmek için gerekli yetkiye sahip değilsiniz!`).then(msg => msg.delete(5000));

  let kişi = message.mentions.users.first()
  if (!kişi) return message.react(emoji2)
  let member = message.guild.member(kişi)

  if(!member.roles.has(`792372272580526080`)) { //KOMUTLA VERİLECEK OLAN PERMİN İDSİ
    member.addRole(`792372272580526080`)
    let kayıt = new Discord.RichEmbed()
    .setColor("BLACK")
   .addField(`BJORN`, `${kişi} **adlı üyeye** <@&792372272580526080> **rolü verildi!**`)
   .setFooter(`Komutu kullanan yetkili : ${message.author.username}`) 
            .setThumbnail(`https://cdn.discordapp.com/icons/770625627987378196/a_4466da3ef6682183c5302d9f3b4c5570.webp?size=128`)

    return message.channel.send(kayıt).then(msg => msg.delete(5000)).then(() => message.react(emoji));
  } else {
    member.removeRole(`792372272580526080`)
    let kayıt = new Discord.RichEmbed()
    .setColor("BLACK")
    .addField(`BJORN`, `${kişi} **adlı üyeden** <@&792372272580526080> **rolü alındı!**`)
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`) 
            .setThumbnail(`https://cdn.discordapp.com/icons/770625627987378196/a_4466da3ef6682183c5302d9f3b4c5570.webp?size=128`)

    return message.channel.send(kayıt).then(msg => msg.delete(5000)).then(() => message.react(emoji));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['unmarvelous'],
  permLevel: 0
};

exports.help = {
  name: 'marvelous',
};