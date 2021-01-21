const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.roles.has("792372265207463976") && !message.member.hasPermission('ADMINISTRATOR')) //KOMUTU KULLANCAĞI ROLÜN İDSİ
    return message.channel
      .send(
        "**Üzgünüm bu komutu kullanmak için ` Transport ✈️` yetkisine sahip olmalısınız**"
      )
      .then(msg => msg.delete(5000));
  if (!message.member.voiceChannel) {
    return message.channel.send("**Ses kanalında olman lazım!**");
  }
  let kullanıcı = message.mentions.users.first()|| message.guild.members.get(args[0]);
  if (!kullanıcı)
    return message.channel.send("**__Çekmek İstedğiniz Kullanıcıyı Etiketlemen Gerek.__**");
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  if (!member.voiceChannel)
    return message.channel
      .send("**__Etiketlenen kullanıcı bir ses kanalında değil__**")
      .then(m => m.delete(5000));
  const voiceChannel = message.member.voiceChannel.id;
  if (!voiceChannel) return;
  member.setVoiceChannel(voiceChannel);
  message.react("797601614100824064"); // EMOJİ İDSİ
  const voiceChannel1 = message.member.voiceChannel.name;
  let embed = new Discord.RichEmbed()
    .setAuthor(
      "Odaya Çekme!",
      `https://cdn.discordapp.com/icons/741508945222434836/a_0e2e8fe85f76b03bee442edd038775c3.gif?size=2048`
    )
    .setColor("#000000")
    .setDescription(
      message.author +
        " **Tarafından** " +
        kullanıcı +
        " **Kullanıcısı** `" +
        voiceChannel1 +
        "`** Sesli Kanalına Çekildi.**"
    )
    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`);
  message.channel.send(embed).then(m => m.delete(10000));
  await client.channels.get("792372421734432778").send(embed); //LOGUN ATILACAĞI KANAL İDSİ
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
};
exports.help = {
  name: "çek",
  description: " ",
  usage: " "
};
