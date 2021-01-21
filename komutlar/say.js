const Discord = require('discord.js');
String.prototype.replaceA = function (find, replace) {
  return this.replace(new RegExp(find, 'g'), replace);
}
const dcs = function(sayı) {
  let codeshare = sayı.toString().replace('0', '0a')
    .replaceA('1', '1a')
    .replaceA('2', '2a')
    .replaceA('3', '3a')
    .replaceA('4', '4a')
    .replaceA('5', '5a')
    .replaceA('6', '6a')
    .replaceA('7', '7a')
    .replaceA('8', '8a')
    .replaceA('9', '9a')
  
  codeshare = codeshare
    .replaceA("0a", '<a:0b:797497134093565963>')//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("1a", "<a:1b:797497136206970910>")//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("2a", "<a:2b:797497137793466389>")//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("3a", "<a:3b:797497137675894846>")//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("4a", '<a:4b:797497138921209886>')//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("5a", '<a:5b:797497137587290151>')//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("6a", '<a:6b:797497137822171136>')//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("7a", '<a:7b:797497137414799431>')//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("8a", '<a:8b:797497138811895848>')//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("9a", '<a:9b:797497138090082314>')//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
  
  return codeshare
}
exports.run = (client, message, args) => { 
 

  const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
  let count = 0;
  let boost = message.guild.members.filter(r=>r.roles.has('791255271384285206')).size //BOSTER ROLU
  let yetkili = message.guild.members.filter(r=>r.roles.has('792372266662232065')).size //HERKESTE OLAN BİR YETKİLİ ROL İDSİ
  let erkek = message.guild.members.filter(r=>r.roles.has('792372277407776778')).size //ERKEK PERMİ İDSİ
  let kiz = message.guild.members.filter(r=>r.roles.has('792372276644937738')).size //KIZ PERMİ İDSİ
  let kayıtsız = message.guild.members.filter(r=>r.roles.has('792372317513580555')).size //KAYITSIZ ROLU İDSİ
  let taglı = message.guild.members.filter(r=>r.roles.has('792699062263480350')).size //TAGLI ROLU İDSİ

  let çevrimiçi = message.guild.members.filter(m => m.presence.status !== "offline").size
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setAuthor(message.guild.name, message.guild.iconURL)
.setDescription(`
<a:kelebek2:793506021859262504> **Sunucuda Toplam**  ${dcs(message.guild.memberCount)} **Üye Bulunmaktadır.**
<a:kelebek2:793506021859262504> **Sunucuda Çevrimiçi**   ${dcs(çevrimiçi)} **Üye Bulunmaktadır.** 
<a:kelebek2:793506021859262504> **Ses Kanallarında** ${dcs(count)}  **Üye Bulunmaktadır.**
<a:kelebek2:793506021859262504> **Sunucuyu Boostlayan** ${dcs(boost)} **Üye Bulunmaktadır.**
<a:kelebek2:793506021859262504> **Sunucuda Yetkili** ${dcs(yetkili)} **Üye Bulunmaktadır.**
<a:kelebek2:793506021859262504> **Sunucuda Toplam** ${dcs(erkek)} **Erkek Üye Bulunmaktadır.**
<a:kelebek2:793506021859262504> **Sunucuda Toplam** ${dcs(kiz)} **Kadın Üye Bulunmaktadır.**
<a:kelebek2:793506021859262504> **Sunucuda Toplam** ${dcs(taglı)} **Taglı Üye Bulunmaktadır.**
<a:kelebek2:793506021859262504> **Sunucuda Toplam** ${dcs(kayıtsız)} **Kayıtsız Üye Bulunmaktadır.**

`)
.setFooter(`Vandella Family`, message.author.avatarURL).setTimestamp()
message.channel.send(embed)
  message.react("749951845866143774"); //tepki id eklersiniz.
};
//discord code share
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["say"]
};

exports.help = {
  name: 'say',
  description: 'Sunucunuzdaki Toplam ÜYE vb Bilgileri Atar',
  usage: '-say'
}; 

