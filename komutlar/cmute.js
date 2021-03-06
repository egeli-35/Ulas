const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require("../ayarlar.json");
const prefix = ayarlar.prefix;
var mutelirolu = "Muted";
module.exports.run = async (bot, message, args) => {
  if (
    !message.member.roles.find("792372264376074250") && //KULLANICAK ROLUN İDSİ
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("Muted")
        .setColor("RED")
        .setDescription("**Bu komutu kullanmak için Mute Yetkilisi rolüne sahip olmalısın!**")
    );
  let mutekisi = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!mutekisi) return message.reply(`**Bir kullanıcı etiketler misin bebeğim?** `);
  let muterol = message.guild.roles.find(`name`, mutelirolu);
  if (!muterol) {
    try {
      //Edited by Andromeda.
      muterol = await message.guild.createRole({
        name: mutelirolu,
        color: "#000000",
        permissions: []
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  let mutezaman = args[1]
    .replace(`s`, `s`)
    .replace(`m`, `m`)
    .replace(`h`, `h`)
    .replace(`d`, `d`);
  if (!mutezaman) return message.reply(`Doğru bi zaman gir`);
  let guild = message.guild;
  let reason = args.slice(2).join(" ");
  const member = message.guild.member(mutekisi);
  if (reason.length < 1)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("Mute")
        .setColor("RED")
        .setDescription("**• Mute sebebini girermisin.**")
    );
  if (message.mentions.users.size < 1)
    return message.channel
      .send(
        new Discord.RichEmbed()
          .setTitle("Mute")
          .setColor("RED")
          .setDescription("**• Kime mute atacağını yazarmısın.**")
      )
      .catch(console.error);
  if (member.hasPermission("ADMINISTRATOR"))
    return message.channel
      .send(
        new Discord.RichEmbed()
          .setTitle("Mute")
          .setColor("RED")
          .setDescription("**• Yetkili bir kişiyi muteleyemezsin!**")
      )
      .then(msg => {
        msg.delete(9000), message.delete(9000);
      });
  await mutekisi.addRole(muterol.id);
  message.react("tik");
  message.channel.send(
    new Discord.RichEmbed()
      .setTitle(``, new Discord.RichEmbed())
      .setTitle("Mute")
      .setColor("RED")
      .setDescription(
        `<@${mutekisi.id}> adlı kullanıcı **"${
          args[1]
        }"** süresi boyunca **${reason}** sebebiyle susturuldu.`
      )
  );
  mutekisi.send(
    new Discord.RichEmbed()

      .setTitle("Mute")
      .setColor("BLACK")
      .setDescription(
        `\`BJQRN\` adlı sunucuda **${
          args[1]
        }** süresi boyunca **${reason}** sebebiyle susturuldunuz.**`
      )
  );

  const sChannel = message.guild.channels.find(
    c => c.id === "792878367480479794" //KANAL İD
  );
  let modlog = new Discord.RichEmbed()
    .setColor("RED")
    .setTitle("Mute")
    .setDescription(
      `<@${
        mutekisi.id
      }> adlı kullanıcı Mutelendi\n Sebebi : **"${reason}"** \n Zamanı : **__${
        args[1]
      }__**  `
    )
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`);
  sChannel.send(modlog);
  setTimeout(function() {
    mutekisi.removeRole(muterol.id);
    mutekisi.send(
      `\`VANDELLA\` adlı sunucudaki susturman kaldırıldı! Umarım bir daha hata yapmazsın...`
    );
    const sChannel = message.guild.channels.find(
      c => c.id === "776166998400958465" //KANAL İD
    );
    let modlog = new Discord.RichEmbed()
      .setColor("RED") //Edit by Amerikan. & Clerance.
      .setTitle(" Mute")
      .setDescription(
        `<@${mutekisi.id}> adlı kullanıcının susturulması kaldırıldı! Umarım bir daha hata yapmazsın...`
      )
      .setFooter(`Yetkili : ${message.author.username}`);
    sChannel.send(modlog);
  }, ms(mutezaman));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["cmute"],
  permLevel: 0
};
exports.help = {
  name: "mute"
};
