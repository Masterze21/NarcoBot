const Discord = require('discord.js')

const rn = require('random-number');

const client = new Discord.Client();

var prefix = "m!";

client.login(process.env.TOKEN);

client.on("ready", () => {
    console.log("Bot on")
    var nombre = client.guilds.size
client.user.setGame(`Serveurs : ${nombre}  | m!help`);
});

client.on('message', message => {

    if(message.content.startsWith(prefix + "ct")){
        message.reply("Pour me contacter : masterzey06@gmail.com ou Masterze 21#0001 ");
        console.log ('bot ct');
    }

    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#FF6600")
        .setTitle(":arrow_down_small: Voici les commandes disponible :arrow_down_small: ")
        .setDescription("Je suis un bot de Modérations :tools: et Utilitaires :gear: pour l'intant)")
        .addField("m!ct", "Pour me contacter:e_mail: ")
        .addField("m!help", "Affiche les commandes:hammer_pick: .")
        .addField("m!profil", "Affiche tes statistiques Discord:chart_with_upwards_trend: !")
        .addField("m!info", "Affiche les info Serveur:satellite: ")
        .addField("m!kick", "Kick la personne mentionné:door:")
        .addField("m!ban", "Ban la personne mentionné:hammer:")
        .addField("m!clear", "supprimer les message (:one:-:one::zero::zero:)")
        .addField("m!ping", "Temp de latence avec le serveur:ping_pong:")
        .setFooter("Par Masterze 21#0001")
        message.channel.sendMessage(help_embed);
        console.log ("commandes aide")
    }

    if(message.content === prefix + "info") {
        var info_embed = new Discord.RichEmbed()

        .setTitle("Voici les informations sur moi et le serveur !")
        .addField(":capital_abcd:Nom du serveur", message.guild.name, true)
        .addField(":crown:Propriétaire", message.guild.owner, true)
        .addField(":shield: Niveau de Vérification", message.guild.verificationLevel, true)
        .addField(":globe_with_meridians:Région", message.guild.region, true)
        .addField(":family:Nombres de membres.", message.guild.members.size, true)
        .addField (":robot:Bot", message.guild.members.filter(m => m.user.bot).size, true)
        .addField(":dividers:Nombre salons.", message.guild.channels.size, true)
        .addField(":open_file_folder:Le nombre de rôle :", message.guild.roles.size, true)
        .addField(":neutral_face:Nombre d'émojie", message.guild.emojis.size, true )
        .setFooter("Par Masterze 21#0001")
        .setColor("#FF6600")
        message.channel.send(info_embed).catch();
        console.log("info commands");
    }

    if(message.content.startsWith(prefix + "kick")) {
        if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Tu a pas la perm de faire cette commande");
       
        if(message.mentions.users.size === 0) {
            return message.channel.send("Tu dois mentionner la personne que tu veux kick");
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Je ne sais pas si l'utilisateur existe :/");;
        }
        
        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("j'ai pas la perm pour kick :/")
        }
        
       kick.kick().then(member => {
        message.channel.send(`${member.user.username}a était kick par ${message.author.username}`)
        console.log ('kick');
       });
    }

    if(message.content.startsWith(prefix + "ban")) {
        if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Tu a pas les perm x)");
       
        if(message.mentions.users.size === 0) {
            return message.channel.send("mais mentionne le pour le ban xD");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.sendMessage("Je ne sais pas si l'utilisateur existe :/");
        }
        
        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("j'ai pas la perm de ban");

        }
        ban.ban().then(member => {
            message.channel.sendMessage(`${member.user.username}est ban par ${member.author.username} !`)
            console.log ('ban');
        });

    }
    if(message.content.startsWith(prefix + "clear")){
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Tu a pas la permission pour clear les message :sob: !");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.sendMessage("précisément de 1 à 100 !")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.sendMessage(`${args[0]} messages ont été supprimés !`);
            console.log ('clear')
        }) 
    }

    
    
    if (!message.content.startsWith(prefix)) return;
    
    var args = message.content.substring(prefix.length).split(" ");
    
    switch (args[0].toLowerCase()) {
        case "profil":
        
        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;
        
        var stats_embed = new Discord.RichEmbed()
        
        .setColor("#FCDC12")
        .setTitle(`Compte : ${message.author.username}`)
        .addField("Pseudo", ` ${message.author.username} `)
        .addField(":hash:", `#${message.author.discriminator}`)
        .addField(`:id:`, msgauthor, true)
        .addField (":date:Date de création:date: :", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply(":page_facing_up: Voici tes information Discord:page_facing_up:  !")
        message.channel.sendMessage({embed: stats_embed});
        console.log ('stat');
        break;
    }
    if(message.content.startsWith(prefix + "ping"))  {
        let ping = Math.round(client.ping);
        console.log ('ping')

        message.channel.send(':ping_pong:Pong : '+ ` ${ping } ` +  'ms`');
        }
});
