const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
let talkedRecently = new Set();

module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
   if (cmd.conf.enabled === false) {
      if (!ayarlar.sahip.includes(message.author.id) && !ayarlar.sahip.includes(message.author.id)) {
        const embed = new Discord.RichEmbed()
                    .setDescription(`:x: **${cmd.help.name}** isimli komut şuanda geçici olarak kullanıma kapalıdır!`)
                    .setColor("RED")
                message.channel.send({embed})
                return
      }
    }
  const embed = new Discord.RichEmbed()
  .setColor('BLACK')
  .setDescription(`
\`Komut kullanılan sunucu\`
${message.guild.name} 

\`Komut kullanan kullanıcı\`
${message.author.tag}

\`Kullanılan komut\`
${cmd.help.name}`)
  .setThumbnail(message.author.avatarURL)
.setFooter("Buğra Developer")
client.guilds.get('790395908520149002').channels.get('792372420559896597').send(embed)
    
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};
