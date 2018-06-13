const Discord = require('discord.js')
const rn = require('random-number');
const yt = require('ytdl-core');
const fb = require('ffmpeg-binaries')
const os = require('opusscript')
const msmute = require('ms');
const client = new Discord.Client();
const bot = new Discord.Client();

var dispatcher;

var prefix = "m!";

client.login(process.token");

client.on("ready", () => {
    console.log("Bot on")
    var nombre = client.guilds.size
client.user.setGame(`Serveurs : ${nombre}  | m!help`);
});

client.on('message', message => {

    if(message.content.startsWith(prefix + "ct")) {
        message.delete().catch();
        message.reply("Pour me contacter : masterzey06@gmail.com ou Masterze 21#0001 ");
        console.log ('bot ct');
    }

    if(message.content === prefix + "help"){
        message.delete().catch();
        var help_embed = new Discord.RichEmbed()
        
        .setColor(" #FFFFFF")
        .setTitle(":arrow_down_small: Voici les commandes disponible :arrow_down_small: ")
        .setDescription("Je suis un bot de Modérations :tools:, Amusants :tada:, Utilitaires :gear:! Passe un bon moment ! :smiley:!")
        .addField(":tools: Modération:", " ``kick`` ``ban`` ``clear``")
        .addField(":gear: Utilitaire :", " ``profil`` ``info`` ``ping``")
        .addField(":tada: Fun :", " ``8ball`` ``say``")
        .addField(":smile: Important :", " ``support`` ``bot`` ``credit``")
        .setFooter("Par Masterze 21#0001")
        message.channel.sendMessage(help_embed);
        console.log ("commandes aide")
    }


    if(message.content === prefix + "info") {
        message.delete().catch();
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
        .setColor("#FFFFF")
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
        
        .setColor("#FFFFF")
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
        message.delete().catch();
        let ping = Math.round(client.ping);
        console.log ('ping')

        message.channel.send(':ping_pong:Pong:`' + `${ping}` + ' ms`');
        }
        
        if(message.content.startsWith(prefix + "8ball"))  { 
               message.delete().catch();
        if(!args[2])return message.reply("s'il vous plaît poser une question complète")
        let replies = ["Oui", "Non", "Je ne sais pas", "demandez plus tard :D"]

        let result = Math.floor((Math.random() * replies.length))
        let question = args.slice(1).join(" ");

        let ball_embed = new Discord.RichEmbed()
        .setTitle("8ball :8ball:")
        .setColor("#00000" )
        .addField("Question", question)
        .addField("Réponse", replies[result])
        message.channel.send(ball_embed)
        console.log ('8ball')
    };
    
        if(message.content.startsWith(prefix + "say"))  {
   sayMessage = message.content.substring(prefix.length + 4);
    message.delete().catch();
    message.channel.send(sayMessage);
    }
    if(message.content.startsWith(prefix + "support")) {
        message.delete().catch();

            var support_embed = new Discord.RichEmbed()


            .setColor("#FFFFFF")
            .setTitle(":link: Support")
            .setDescription("Venez pour que on vous aide a développer aussi :wink: ")
            .setURL("https://discord.gg/KZt8AS5")
            .setFooter('©NarcoBot', `https://cdn.discordapp.com/attachments/455412321880375296/455734120719581185/dd8de6ee6dfa67495dd05f64b26f978cdb8e0029_full.jpg`)
            message.channel.send(support_embed)
            console.log ('bot support');
    }
    if(message.content.startsWith(prefix + "bot")) {
        message.delete().catch();

            var nombre = client.guilds.size
            var bot_embed = new Discord.RichEmbed()

        .setColor("#FFFFFF")
        .setTitle('Clique ici si tu me veux')
        .setURL("https://discordapp.com/oauth2/authorize?client_id=440337798990528514&scope=bot&permissions=2146958591")
        .addField(":hash:| Tag ", `#${client.user.discriminator}`, true)
        .addField(":id:| ID", `${client.user.id}`, true)
        .addField(":crown: | Owner", " ``Masterze 21#0001`` ", true)
        .addField(":file_cabinet: Serveurs :", `${nombre}`, true)
        .setFooter('©NarcoBot', `https://cdn.discordapp.com/attachments/455412321880375296/455734120719581185/dd8de6ee6dfa67495dd05f64b26f978cdb8e0029_full.jpg`)
        .setThumbnail(client.user.avatarURL)
        message.channel.sendMessage(bot_embed);
        console.log ('Bot');
    }
    if(message.content.startsWith(prefix + "credit")) {
        message.delete().catch();

            var credit_embed = new Discord.RichEmbed()

            .setColor("#00000")
            .setTitle("LES PERSONNE QUI MON AIDER :")
            .setDescription("Merci à vous tous :heart: ")
            .setImage("https://cdn.discordapp.com/attachments/455479163323678730/455836838863831061/Sans_titre-1.png")
            .setFooter('©NarcoBot', `https://cdn.discordapp.com/attachments/455412321880375296/455734120719581185/dd8de6ee6dfa67495dd05f64b26f978cdb8e0029_full.jpg`)
            message.channel.sendMessage(credit_embed);
        console.log ('Thx');
    } 
});
