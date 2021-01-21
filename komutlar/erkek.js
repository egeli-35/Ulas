const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");


module.exports.run = async (bot, message, args, member, client, level) => {


  if(!message.member.roles.has("792372265919971368")&& !message.member.hasPermission('ADMINISTRATOR')) 
  return message.channel.send(new Discord.RichEmbed()
  .setDescription("Komutu kullanmak için yetkin yok.")
  .setColor("RED"))

  const genelchat = message.guild.channels.find(c => c.id === "792372399164227584")

  const isim = args[1]
  if(!isim)
  return message.channel.send(new Discord.RichEmbed()
  .setDescription(`Bir İsim Gir Örnek: \`${ayarlar.prefix}erkek <@KİŞİ> <isim> <yaş>\``)
  .setColor("RED"))

  const yaş = args[2]
  if(!yaş)
  return message.channel.send(new Discord.RichEmbed()
  .setDescription(`Bir Yaş Gir Örnek: \`${ayarlar.prefix}erkek <@KİŞİ> <isim> <yaş>\``)
  .setColor("RED"))

  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!user)
  return message.channel.send(new Discord.RichEmbed()
  .setDescription("Etiket atmayı unuttun.")
  .setColor("RED"))


  const embed01 = new Discord.RichEmbed()
  .setAuthor(`VANDELLA Kayıt Sistemi`)
  .setDescription(`<a:siyahtac:797601653456896040> **Kayıt Eden Yetkili Adı :** ${message.author}  \n <a:siyahkalp:797601612369362975> **Kayıt edilen kullanıcı :** ${user}  \n <a:siyahelmas:797601617880416326> **Yeni İsim:** \` ${isim} | ${yaş}\` \n <a:maviasa:797601612407242752> **Kayıt işleminde verilen roller :** <@&792372277407776778>, <@&792372278217670686>    \n <a:siyahkelebek:797603909992316989> **Kayıt işleminde alınan rol :** <@&792372317513580555> `)
  .setColor("GREEN")
  .setThumbnail(message.author.avatarURL)
  message.channel.send(embed01).then(() => message.react("792372370971033610"));
user.addRole('792372277407776778') //ERKEK1
user.addRole('792372278217670686') //ERKEK 2
user.removeRole('792372317513580555') //UNREG
user.removeRole('792372276644937738') //KADIn1
user.removeRole('792372279031103488') //KADIn2
user.setNickname(`↡ ${isim} | ${yaş}`)
  db.add('erkekteyit.'+message.author.id , 1)


const tedoa = new Discord.RichEmbed()
.setColor('BLACK')
.setDescription(`${user} **Aramıza yeni katıldı... Bi hoş geldin diyelim.** <a:opucuk:798710132053639218>`)
genelchat.send(tedoa)


} 



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["e"],
    permLevel: 0
}
exports.help = {
    name: 'erkek',
    description: 'kayıt',
    usage: 'kayıt'
}

