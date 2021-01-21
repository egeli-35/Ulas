const Discord = require("discord.js")
module.exports.run= async(client, message, args) => {
let rol 
const etiket = message.mentions.roles.first()
const id = message.guild.roles.get(args[0])
const isim = message.guild.roles.find(m => m.name === args.slice(0).join(" "))
if( !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu komutu kullanmaya yetkin yok.");  

if(etiket){
rol = etiket
}
if(id){
rol = id
}
if(isim){
rol = isim
}
if(!etiket && !id && !isim){
message.reply("Bir Rol İ ID'si Yazmalısın veya Rolün İsmini!")
}
const aktif = rol.members.filter(m => m.presence.status !== "offline").size
const toplam = rol.members.size
if(rol.members.size >= 30){
message.channel.send(new Discord.RichEmbed()
.setTitle("Bu Rolde 30'dan Fazla Kişi Var Rolde Olanların İsimlerini Veremem!")
.setColor("GREEN")
.setDescription("Roldeki Aktif Üye Sayısı: "+aktif+"\nRoldeki Toplam Üye Sayısı: "+toplam))
}
if(rol.members.size < 30){
message.channel.send(new Discord.RichEmbed()
.setTitle("Rol Istatistik")
.setColor("GREEN")
.setDescription("Roldeki Aktif Üye Sayısı: "+aktif+"\nRoldeki Toplam Üye Sayısı: "+toplam+"\n\nBu Role Sahip Olanlar:\n"+rol.members.map(m => m).join("\n")))
}
}
module.exports.conf = {
aliases: ["roldekiler"]
}

module.exports.help = {
name: "roldekileri-say"
}