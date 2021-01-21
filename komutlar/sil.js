const Discord = require('discord.js');
exports.run = function(client, message, args) {
          if (message.channel.type === "dm") return;
if(!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Bu komutu kullanmak için ne zaman izin aldın aslan parçası?**");
if(!args[0]) return message.channel.send("🚫 **Lütfen Silinicek Mesaj Miktarını Yazın!** 🚫");
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(` ${args[0]} Adet Mesajı Sildim. :put_litter_in_its_place:`);
    let messagecount = parseInt(args.join(' '));
  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));
    const sChannel = message.guild.channels.find(c=> c.id ==="751057815807983696") //LOGUNU ATACAĞI KANALIN İDSİ
    const sohbetsilindi = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .addField('<a:bjornsagok:749963454651301952> Eylem: <a:bjornsolok:749963457947893827>', 'Sohbet silme')
    .addField('<a:bjornsagok:749963454651301952> Yetkili: <a:bjornsolok:749963457947893827> ', message.author.username)
    .addField('<a:bjornsagok:749963454651301952> Sonuç: <a:bjornsolok:749963457947893827> ', `Başarılı`)
    .addField('<a:bjornsagok:749963454651301952> Silinen Adet: <a:bjornsolok:749963457947893827> ', + messagecount)
    message.channel.sendEmbed(sohbetsilindi);
console.log("**Sohbet " + message.member + " tarafından silindi! **").then(msg => msg.delete(9000));
      
  sChannel.send(sohbetsilindi)

  const sil = new Discord.RichEmbed()
      .setColor('RANDOM')
    .setTimestamp()
    .addField('❯ Eylem:', 'Sohbet silme')
    .addField('❯ Yetkili: ', message.author.username)
    .addField('❯ Sonuç: ', `Başarılı`)
    .addField('❯ Silinen Adet', + messagecount)
    console.log("**Sohbet " + message.member + " tarafından silindi! **") .then(msg => msg.delete(9000));
  
})
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 2
};

exports.help = {
  name: 'clear',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'sil <silinicek mesaj sayısı>'
};
//Clyde