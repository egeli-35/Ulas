const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  let sunucu = client.guilds.get("734208665313083452") //SUNUCU İDSİ
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
if(!message.member.roles.has("776219538043043852") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu komutu kullanmaya yetkin yok.");  //KOMUTU KULLANACAĞI ROL İDSİ
  let guild = message.guild
  let user = message.mentions.users.first();
  let sebep = args.slice(1).join(" ") || `Belirtilmemiş.`
  let yasaklayankisi = `Yasaklayan : ${message.author.tag} - ${message.author.id}`
  if (!user) return message.channel.send(`Kimi banlıyacaksın?`)
  if(sunucu.members.get(user.id).roles.has("667810949582815302") && sunucu.members.get(user.id).roles.has("667810949582815302")) return message.channel.send("Bu kişiyi banlayamazsın!").then(m => m.delete(9000));
if (user == message.author) return message.channel.send(`Banlayacağın kişiyi etiketlemelisin kanka`)
   message.react('749952289707393084') //EMOJİ İDSİ TİK İDSİ
  let embed2 = new Discord.RichEmbed()
  .addField( `**Yasaklayan :** ${message.author.tag} \n **Yasaklanan :** ${user.tag}\n **Yasaklama Nedeni :** ${sebep} `)
  .setImage('https://cdn.discordapp.com/attachments/680092218777927778/683607360115310630/image0.gif')
  let userembed = new Discord.RichEmbed()
  .setColor("BLUE")
  .setAuthor(`Sunucuda ki halkın gözü önünde banlandın kanka`, user.avatarURL)
  .setDescription(`**${guild.name}** sunucusundan **${sebep}** sebebiyle banlandın.`)
  .setImage('https://cdn.discordapp.com/attachments/680092218777927778/683607360115310630/image0.gif')
  user.send(userembed)
 message.guild.member(user).ban(`${sebep} | ${yasaklayankisi}`).catch(error => message.reply("Üyeyi yasaklamak için yetkim yetmiyor."))  
 message.channel.send(embed2).then(m => m.delete(9000));
    let embed4 = new Discord.RichEmbed()
    .setColor("#000000")
    .setDescription("`"+user.tag+"`"+` Kullanıcısı ${message.author} Tarafından **${sebep}** Nedeniyle banlandı.`)
    .setFooter(`${client.user.tag}` , `${client.user.displayAvatarURL}`)
    .setTimestamp()  
    let kanal1 = message.guild.channels.get("776166998400958465") //LOGUN ATILACAĞI KANAL İDSİ
    if(!kanal1) return
    kanal1.send(embed4)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ban' , 'yak'],
  permLevel: 0
};
exports.help = {
  name: 'as',
  description: 'Belirttiğiniz kullanıcıyı sunucudan yasaklar.',
  usage: 'yasakla <@kullanıcı>'
};