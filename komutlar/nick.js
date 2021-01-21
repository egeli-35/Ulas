const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

module.exports.run = async (client, message, args) => {
  const yetkili_rol = message.guild.roles.get("792372266662232065"); //ALTINDAKİ VE BURDAKİ YERE KOMUTU KULLANCAK ROLUN İDSİN GRİN
  if (!message.member.roles.has("792372266662232065") && !message.member.hasPermission('ADMINISTRATOR'))
    return message.reply(
      `Bu Komutu Sadece ``${yetkili_rol}`` Rolüne Sahip Kişiler ve **Yöneticiler** Kullana Bilir!`
    ); //DCS
  
  const üye =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!üye) return message.reply("Bir Üye Etiketle Yada ID Sini Gir!");

  const isim = args[1];
  if (!isim) return message.reply("Bir İsim Girmelisin");

  const yaş = args[2];
  if (!yaş) return message.reply("Bir Yaş Girmelisin!");

  const üye_isim = `↡ ${isim} | ${yaş}`;
  üye.setNickname(üye_isim);

  message.channel.send(
    new Discord.RichEmbed()
      .setTitle(message.guild.name)
      .setThumbnail(üye.user.avatarURL)
      .setFooter(`Komutu kullanan yetkili : ${message.author.tag}`) //DCS
      .setTimestamp()
      .setColor("GREEN")
      .setDescription(
        `${üye} İsimli Kullanıcının İsmi Başarıyla \`${üye_isim}\` Olarak Değiştirildi!.`
      )
  );
};


module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["nick","isim"],
  permLevel: 0
}; //DCS

module.exports.help = {
  name: "isimm",
  description: "",
  usage: "isim <user> <name> <age>"
};

