const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(` **Bu komudu kullanabilmek için "Sunucuyu Yönet" yetkisine sahip olman gerek.**`)
  if (!args[0]) return message.channel.send(`:x: **Reklam-Engel Filtresini Ayarlamak İçin \`b!reklam-engel aç\` | Kapatmak İstiyorsanız \`a!reklam-engel kapat\` Yazabilirsiniz**`)
  if (args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send(`:x: Reklam Filtresini Ayarlamak İçin \`a!reklam aç\` | Kapatmak İstiyorsanız \`a!reklam kapat\` Yazabilirsiniz`)

    if (args[0] == 'aç') {
    db.set(`küfürFiltre_${message.guild.id}`, 'acik')
    let i = await db.fetch(`küfürFiltre_${message.guild.id}`)
  message.channel.send(`:white_check_mark: **Reklam Filtresi başarıyla ayarlandı.**`)    
     
  } 

  if (args[0] == 'kapat') {
    
    let üye = await db.fetch(`küfürFiltre_${message.guild.id}`)
    if (!üye) return message.channel.send(`**Reklam filtresini açtığına emin misin?.**`)
    
    
    db.delete(`küfürFiltre_${message.guild.id}`)
    
    message.channel.send(`**:white_check_mark: Reklam Filtresini Kapattım.**`)
  }
 
};


exports.conf = {
 enabled: true,
 guildOnly: false,
  aliases: ['reklam', 'reklam-filtresi', 'reklamfiltresi', 'reklam-filtre', 'reklamfiltre'],
 permLevel: 4
};

exports.help = {
 name: 'reklam-engel',
 description: 'küfür',
 usage: 'gkanal'
};