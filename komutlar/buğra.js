const Discord = require('discord.js');
exports.run = function(client, message, args) {
  if(message.author.id !== '667810949582815302') return message.reply('Kardeşim Bu Komutu Sadece "Bugra" Kullanibilir! ');
      const sayMessage = args.join(` `);
      client.user.setGame(sayMessage);
      message.channel.send(`Oyun ismi **${sayMessage}** olarak değiştirildi :ok_hand:`)
    }
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["buğra"],
  permLevel: 0
};

exports.help = {
  name: 'bugra',
  description: 'Botun pingini gösterir.',
  usage: 'oyundeğiş'
};