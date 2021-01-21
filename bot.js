const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
const ms = require("ms");
var önEk = ayarlar.prefix;
var prefix = ayarlar.prefix;

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

///////////// KOMUTLAR BAŞ

// OTO ROL

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`küfürFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const küfür = [
      "discord.gg",
      "https://discordapp.com/invite/",
    ];
    if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          msg.delete();
          let embed = new Discord.RichEmbed()
            .setColor(0xffa300)
            .setFooter("VANDELLA Reklam Sistemi", client.user.avatarURL)
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL
            )
            .setDescription(
              "VANDELLA, " +
                `***${msg.guild.name}***` +
                " adlı sunucunuzda Reklam yakaladım."
            )
            .addField(
              "Reklam Uapan Kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(
              `${msg.author}, Reklam Yapmak Yasak! Senin Mesajını Özelden Kurucumuza Gönderdim.`
            )
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});


////////////////////////////////////////////////////
client.on("message", msg => {
  if (msg.content.toLowerCase() === "!link") {
    //		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {

    msg.reply("  https://discord.gg/DGB7mBEUQt");
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", msg => {
  if (msg.content.toLowerCase() === "link") {
    //		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {

    msg.channel.send("   hhttps://discord.gg/DGB7mBEUQt");
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////// ALTI ELLEME

require("./util/eventLoader")(client);

client.login(ayarlar.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//////////////////////
client.on("message", async msg => { 
const as = require('./ayarlar.json')
const dcskelime = [client.user.id, client.user.username, "<@"+client.user.id+">"]; 
if (dcskelime.some(dcss => msg.content.includes(dcss))) {
msg.reply("Prefixim: "+as.prefix) 
}})  
/////

                         

/////sesmute
client.on('voiceStateUpdate', async (oldMember, newMember) => {// chimp ♡'b#0308
if(oldMember.voiceChannel == undefined) {
let oldUser = oldMember.user;
let newUser = newMember.user;
const data = require('quick.db')
if(await data.fetch(`kaldır.${oldUser.id}.${oldMember.guild.id}`)) {
let author = oldMember.guild.members.get(await data.fetch(`kaldır.${oldUser.id}.${oldMember.guild.id}`))
data.delete(`kaldır.${oldUser.id}.${oldMember.guild.id}`)
newMember.setMute(false)
client.channels.get('792878367480479794').send(new Discord.RichEmbed().setColor('#494459').setAuthor(author.user.tag, author.user.avatarURL).setDescription(`${oldMember} üyesinin ses susturulması, ${author} tarafından kaldırıldı.`))
} } //client.channels.get e logun atılacağı kanalın idsi yazılacak
})// codare ♥

client.on('voiceStateUpdate', async (oldMember, newMember) => {// chimp ♡'b#0308
let oldUser = oldMember.user;
let newUser = newMember.user;
const data = require('quick.db')
const ms = require('ms')
const moment = require('moment')

if(oldMember.voiceChannel == undefined) {

let sistem;
if(await data.fetch(`atılamadı.${oldUser.id}.${oldMember.guild.id}.atılma`)) { sistem = 'açık' } else if(await data.fetch(`atılamadı.${oldUser.id}.${oldMember.guild.id}.bitiş`)) { sistem = 'açık' }
if(sistem === 'açık') {
  
  const atan1 = await data.fetch(`atılamadı.${oldUser.id}.${oldMember.guild.id}.atan1`)
  const atan2 = await data.fetch(`atılamadı.${oldUser.id}.${oldMember.guild.id}.atan2`)
  const süre = await data.fetch(`atılamadı.${oldUser.id}.${oldMember.guild.id}.süre`)
  const sebep = await data.fetch(`atılamadı.${oldUser.id}.${oldMember.guild.id}.sebep`)
  const timereplace = await data.fetch(`atılamadı.${oldUser.id}.${oldMember.guild.id}.timereplace`)
  
  var tarih = new Date(Date.now())
  var tarih2 = ms(timereplace)
  var tarih3 = Date.now() + tarih2 + 10800000

  let atılmaay = moment(Date.now()+10800000).format("MM")
  let atılmagün = moment(Date.now()+10800000).format("DD")
  let atılmasaat = moment(Date.now()+10800000).format("HH:mm:ss")
  let bitişay = moment(tarih3).format("MM")
  let bitişgün = moment(tarih3).format("DD")
  let bitişsaat = moment(tarih3).format("HH:mm:ss")
  let muteatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
  let mutebitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``
 
  newMember.setMute(true)
  client.channels.get('792878367480479794').send(new Discord.RichEmbed().setColor('RED').setAuthor(atan1, atan2).setDescription(`${oldMember} (\`${oldUser.id}\`) üyesi ses kanallarında susturuldu.

• Mute Atılma: ${muteatılma}
• Mute Bitiş: ${mutebitiş}
• Süre: \`${süre}\`

• Sebep: \`${sebep}\`
`))
//client.channels.get e logun atılacağı kanalın idsi yazılacak
      setTimeout(() => {
    if(newMember.voiceChannel == undefined) {
  client.channels.get('792878367480479794').send(new Discord.RichEmbed().setColor('RED').setAuthor(atan1, atan2).setDescription(`${oldMember} (\`${newUser.id}\`) üyesi susturulması biteceği süre içinde sesli kanallarda bulunmadığı için süresi sıfırlandı, bir kanala girerse tekrar başlayacak.

• Süre: \`${süre}\`
• Sebep: \`${sebep}\`
`))
  } else if(newMember.voiceChannel) {
  data.delete(`seslide2.${newMember.user.id}.${newMember.guild.id}`)
  newMember.setMute(false)
  client.channels.get('792878367480479794').send(new Discord.RichEmbed().setColor('GREEN').setAuthor(atan1, atan2).setDescription(`${newMember} (\`${newUser.id}\`) üyesinin ses kanallarında bulunan susturulması kaldırıldı.

• Mute Atılma: ${muteatılma}
• Mute Bitiş: ${mutebitiş}
• Süre: \`${süre}\`

• Sebep: \`${sebep}\`
`)) 

 data.delete(`atılamadı.${oldUser.id}.${oldMember.guild.id}.atan1`) 
 data.delete(`atılamadı.${oldUser.id}.${oldMember.guild.id}.atan2`) 
 data.delete(`atılamadı.${oldUser.id}.${oldMember.guild.id}.süre`) 
 data.delete(`atılamadı.${oldUser.id}.${oldMember.guild.id}.sebep`) 
 data.delete(`atılamadı.${oldUser.id}.${oldMember.guild.id}.timereplace`) 
 data.delete(`atılamadı.${oldUser.id}.${oldMember.guild.id}.atılma`) 
 data.delete(`atılamadı.${oldUser.id}.${oldMember.guild.id}.bitiş`) 
  }

  }, ms(timereplace))
  

} else if(await data.fetch(`kaldırılamadı.${oldUser.id}.${oldMember.guild.id}.atılma`) && await data.fetch(`kaldırılamadı.${oldUser.id}.${oldMember.guild.id}.bitiş`)) {
    const atan1 = await data.fetch(`atılamadı.${oldUser.id}.${oldMember.guild.id}.atan1`)
  const atan2 = await data.fetch(`atılamadı.${oldUser.id}.${oldMember.guild.id}.atan2`)
  const süre = await data.fetch(`atılamadı.${oldUser.id}.${oldMember.guild.id}.süre`)
  const sebep = await data.fetch(`atılamadı.${oldUser.id}.${oldMember.guild.id}.sebep`)
    const muteatılma = await data.fetch(`kaldırılamadı.${oldUser.id}.${oldMember.guild.id}.atılma`)
      const mutebitiş = await data.fetch(`kaldırılamadı.${oldUser.id}.${oldMember.guild.id}.bitiş`)
    data.delete(`seslide2.${newMember.user.id}.${newMember.guild.id}`)
  newMember.setMute(false)
  client.channels.get('776166998400958465').send(new Discord.RichEmbed().setColor('GREEN').setAuthor(atan1, atan2).setDescription(`${newMember} (\`${newUser.id}\`) üyesinin ses kanallarında bulunan susturulması kaldırıldı.

• Mute Atılma: ${muteatılma}
• Mute Bitiş: ${mutebitiş}
• Süre: \`${süre}\`

• Sebep: \`${sebep}\`
`)) 
   data.delete(`atılamadı.${oldUser.id}.${oldMember.guild.id}.atan1`) 
 data.delete(`atılamadı.${oldUser.id}.${oldMember.guild.id}.atan2`) 
 data.delete(`atılamadı.${oldUser.id}.${oldMember.guild.id}.süre`) 
 data.delete(`atılamadı.${oldUser.id}.${oldMember.guild.id}.sebep`) 
 data.delete(`atılamadı.${oldUser.id}.${oldMember.guild.id}.timereplace`) 
 data.delete(`atılamadı.${oldUser.id}.${oldMember.guild.id}.atılma`) 
 data.delete(`atılamadı.${oldUser.id}.${oldMember.guild.id}.bitiş`) 
  data.delete(`kaldırılamadı.${oldUser.id}.${oldMember.guild.id}.atılma`)
  data.delete(`kaldırılamadı.${oldUser.id}.${oldMember.guild.id}.bitiş`)
}
}
})// codare ♥

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\  

client.on("guildMemberAdd", (member, message) => {
  if (member.guild.id !== "790395908520149002") return; //sunucu ıd
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;
  let user = client.users.get(member.id);
  require("moment-duration-format");
  let eskiNick = member.user.username;
  const id = "792372370971033610"; //kanal ıd
  const channel = member.guild.channels.get(id);
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol;
  if (gün < 7) kontrol = "Güvenilir Değil! <a:guvensiz:793481850889961502>";
  if (gün > 7) kontrol = "Güvenilir Gözüküyor! <a:guvenli:793481786797457438>";
  channel.send(
    `<a:pavyon:793481913205129217> Hoşgeldin ${member} seninle **${
      member.guild.members.size
    }** kişiyiz! <a:pavyon:793481913205129217> \n\n <a:kalp2:797591873731821638> Kaydının yapılması için **Confirm Room** odalarından birine gelip ses teyit vermen gerekli. \n\n <a:morr:793877699796926494> Hesap Kuruluş Zamanı: **${moment(
      user.createdAt
    ).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment(
      user.createdAt
    ).format(
      "YYYY HH:mm:ss"
    )}** \n\n <a:elmass:793878009449938985> Bu Kullanıcı: **${kontrol}**\n\n <a:kelebek3:797504511181848576> <@&792372265919971368> Rolündeki yetkililer seninle ilgilenecektir. <a:kelebek3:797504511181848576> \n\n https://media.giphy.com/media/xSAhxg8CVjQ7mYtHuJ/giphy.gif`



   );
});





// OTO ROL
client.on("guildMemberAdd", async (member) => {
  member.addRole("7792372317513580555") //UNREGİSTERR ROL İD alt tarafada aynı id yazılacak
  const logChannel = member.guild.channels.find(
    channel => channel.id === "792372420006248478" //LOGUN ATILCAĞI KANALIN İDSİ
  );
  const embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .addField(`VANDELLA` , `- ${member} adlı üye sunucumuza katıldı, <@&792372317513580555> rolünü verdim!\n- Sunucumuz artık \`${member.guild.memberCount}\` üyeye sahip.! `
    );
  logChannel.send(embed);
  });
//////////////
client.on('guildMemberAdd', async(member) => {
 let mute = member.guild.roles.find(r => r.name === "Muted"); //MUTE ROLUNUN İSMİ
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi == "muteli") {
member.addRole(mute.id)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten açıldı.`)
    member.removeRole(mute.id);
  }, ms(süre));
}
})


////AFK
client.on("message",async message => {
   if (message.author.bot || message.channel.type === "dm") return;
 
    var afklar =await db.fetch(`afk_${message.author.id}, ${message.guild.id}`)
    
  if(afklar){
    
    db.delete(`afk_${message.author.id}, ${message.guild.id}`)
    db.delete(`afk-zaman_${message.author.id}, ${message.guild.id}`)
    
    message.reply(`Artık afk değilsin. Tekrardan hoş geldin.`).then(msg => msg.delete(9000))
       try{
    let takma_ad = message.member.nickname.replace("[AFK]", "")
    message.member.setNickname(takma_ad).catch(err => console.log(err));
       }catch(err){   

 console.log(err.message)
  }
  }
  var kullanıcı = message.mentions.users.first()
  if(!kullanıcı) return
   let zaman =  await db.fetch(`afk-zaman_${kullanıcı.id}, ${message.guild.id}`)
  
   
    var süre = ms(Date.now() - zaman)
    
    
   var sebep = await db.fetch(`afk_${kullanıcı.id}, ${message.guild.id}`)
  if(await db.fetch(`afk_${message.mentions.users.first().id}, ${message.guild.id}`)){
  if(süre.days !== 1){
     message.channel.send(`**${kullanıcı}** Kullanıcısı  **[AFK]** \n Afk Nedeni: **${sebep}**`)
   return
   }
  
  if(süre.hours !== 1){
     message.channel.send(`**${kullanıcı}** Kullanıcısı  **[AFK]** \n Afk Nedeni: **${sebep}**`)
   return
   }
  if(süre.minutes !== 1){
     message.channel.send(`**${kullanıcı}** Kullanıcısı  **[AFK]** \n Afk Nedeni: **${sebep}**`)
   return
   }
   if(süre.seconds !== 1){
     message.channel.send(`**${kullanıcı}** Kullanıcısı  **[AFK]** \n Afk Nedeni: **${sebep}**`)
   return
   }
  }

})

///
client.on('guildMemberAdd', async(member) => {
 let mute = member.guild.roles.find(r => r.name === "Muted"); //MUTE ROLUNUN İSMİ
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi == "muteli") {
member.addRole(mute.id)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten açıldı.`)
    member.removeRole(mute.id);
  }, ms(süre));
}
})



//MESAJ LOGS

client.on("message", message => {
  if (message.channel.type === "dm") {
    if (message.author.bot) return;
    const dmlog = new Discord.RichEmbed()
      .setTitle(`${client.user.username}'a Özelden Mesaj Gönderildi!`)
      .setColor("RANDOM")
      .addField("Mesajı Gönderen", ` \`\`\` ${message.author.tag} \`\`\` `)
      .addField("Mesajı Gönderenin ID", ` \`\`\`${message.author.id}\`\`\` `)
      .addField(`Gönderilen Mesaj`, message.content)
      .setThumbnail(message.author.avatarURL);
    client.channels.get("793615890779340811").send(dmlog); //LOGUN ATILACAĞI KANAL İDSİ YAZINIZ
  }
});

//SİLİNEN

	client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
  
  if (message.author.bot) return;
  
  var user = message.author;
  
  let sChannel2 = message.guild.channels.find(c => c.id === "793615890779340811")//LOGUN ATILACAĞI KANAL İDSİ YAZINIZ
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Mesaj silindi.`, message.author.avatarURL)
  .addField("Kullanıcı Tag", message.author.tag, true)
  .addField("Kanal Adı", message.channel.name, true)
  .addField("Silinen Mesaj", "```" + message.content + "```")
  .setThumbnail(message.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${message.createdAt.getHours()+3}:${message.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel2.send(embed);
  
});

//Düzenlenen

client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let sChannel3 = newMessage.guild.channels.find(c => c.id === "793615890779340811")//LOGUN ATILACAĞI KANAL İDSİ YAZINIZ
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.RichEmbed()
  .setColor("BLUE")
  .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
  .addField("Kullanıcı", newMessage.author)
  .addField("Eski Mesaj", oldMessage.content, true)
  .addField("Yeni Mesaj", newMessage.content, true)
  .addField("Kanal Adı", newMessage.channel.name, true)
  .setThumbnail(newMessage.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel3.send(embed)
});

//KK AÇIKLAMA


  client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(3, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
   var rol = member.guild.roles.get("776323014702399498")  //FAKE HESAPLARA VERİLECEK ROL İDSİ
   var kayıtsız = member.guild.roles.get("776197085754032150") // KAYITSIZ ROL İD
   member.addRole(rol)
setTimeout(() => {

        member.removeRole(kayıtsız.id);

}, 1000)

  
    
   }
        else {

        }  
    });


client.on('ready', ()=>{
if(client.channels.get('776210115728375858')) { //2 YEREDE SESTE DURACAĞI KANALIN İDSİNİ YAZIN
client.channels.get('776210115728375858').join()
} 
})

client.on("message", async msg => {


  const i = await db.fetch(`ssaass_${msg.guild.id}`);
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 's.a' || msg.content.toLowerCase() == 'selamun aleyküm'|| msg.content.toLowerCase() == 'selamın aleyküm'|| msg.content.toLowerCase() == 'sea')  {
          try {

                  return msg.reply('**Ve Aleyküm Selam, Hoş geldin Kardeşim :)** ')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (i == 'kapali') {
    
    }
    if (!i) return;

    });


client.on("message", async msg => {
  
  
 const i = await db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "s2ş", "S2ş", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("messageUpdate", msg => {
  
  
 const i = db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});



client.on("ready", () => {
var voice = client.channels.get("792372358807027712")
if(!voice) return
try {
voice.join()
} catch(err) {
console.log(err)
}
});


client.on(`guildMemberAdd`, async member => {
  const devtr = new Discord.RichEmbed()
    .setImage(`https://media.giphy.com/media/p9CUMzaroyT8Ne0vea/giphy.gif`)
  .setTitle("HOŞGELDİN")
   .setColor("RANDOM")
.setThumbnail(member.guild.iconURL)
.setDescription(`**• ${member.guild.name} Sunucumuza Hoş Geldin! **

• **Sesli Sohbetlerimize katılarak bizlerle birlikte hem sohbet edip hemde eğlenebilirsin.**

• **Hadi ne duruyorsun koş ve ailemizin bir parçası ol.**`)
    .setFooter(`Vandella Ailesi`)
  member.send(devtr);
});

client.on('guildMemberAdd', (member) => {
var tag = "↡"//Tagınız
member.setNickname(`${tag} | ${member.user.username}`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "tag") 
    return message.channel.send(`↡`)
});

client.on('userUpdate', async user => {
  let sunucuid = "790395908520149002"; //Buraya sunucunuzun IDsini yazın
  let tag = "↡"; //Buraya tagınızı yazın
  let rol = "792699062263480350"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.get(sunucuid).channels.find(x => x.name == '↡・tag-log'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
  if (!tag) return;
  if (!rol) return;
  if (!channel) return;
  let member = client.guilds.get(sunucuid).members.get(user.id);
  if (!member) return;
  if (!member.roles.has(rol)) {
    if (member.user.username.includes(tag)) {
      member.addRole(rol)
      const tagalma = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını aldığından dolayı <@&${rol}> rolünü kazandı.`)
      .setTimestamp()
      channel.send(tagalma)
    }
  }else{
    if (!member.user.username.includes(tag)) {
      member.removeRole(rol)
      const tagsilme = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını sildiğinden dolayı <@&${rol}> rolünü kaybetti.`)
      .setTimestamp()
      channel.send(tagsilme)
    }
  }
});