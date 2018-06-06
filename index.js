const Discord = require('discord.js')

const rn = require('random-number');

const client = new Discord.Client();

var prefix = "m!";

client.login("NDQwMzM3Nzk4OTkwNTI4NTE0.Dfh1MQ.zkPbtHo5wlpXqhFcjIXENUFpVw8");

client.on("ready", () => {
    console.log("Bot on")
    client.user.setGame(" par Masterze 21#3970 (m!aide)");
});

client.on('message', message => {

    if(message.content.startsWith(prefix + "ct")){
        message.reply("Bot crée par Masterze 21#3970");
        console.log ('bot ct');
    }

    if(message.content === prefix + "aide"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#FF6600")
        .setTitle("m!ct")
        .setDescription("Essaye tu vera ;)")
        .addField("m!aide", "Affiche les commands.")
        .addField("m!stat", "Afiche tes statistiques Discord !")
        .addField("m!Info", "Affiche le nombre de membre, de catégories et de salons !")
        .addField("m!kick", "m!kick @user")
        .addField("m!ban", "m!ban @user")
        .addField("m!clear", "supprimer les message (1-100)")
        .setFooter("Menu des - Commandes")
        message.channel.sendMessage(help_embed);
        console.log ("commandes aide activer")
    }

    if(message.content === prefix + "Info") {
        var info_embed = new Discord.RichEmbed()
        .setColor("#FF6600")
        .setTitle("Voici les informations sur moi et le serveur !")
        .addField(" :robot: Nom :", `${client.user.tag}`, true)
        .addField("discriminateur du bot :hash:", `#${client.user.discriminator}`)
        .addField(":id:", `${client.user.id}`)
        .addField(":busts_in_silhouette:Nombres de membres.:busts_in_silhouette: ", message.guild.members.size)
        .addField(":dividers:Nombre de catégories et de salons.:dividers:", message.guild.channels.size)
        .setFooter("Info")
        message.channel.sendMessage(info_embed)
        console.log ("info commands")
    }

    if(message.content.startsWith(prefix + "kick")) {
        if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu a pas les perm x)");
        console.log ('kick no perm');
       
        if(message.mentions.users.size === 0) {
            return message.channel.sendMessage("mais mentionne le pour le kick xD");
            console.log ('kick no mention');
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.sendMessage("Je ne sais pas si l'utilisateur existe :/");
            console.log ('kick no user');
        }
        
        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.sendMessage("j'ai pas la perm pour kick :/")
            console.log ('kick no bot perm');
        }
        
       kick.kick().then(member => {
        message.channel.sendMessage(`${member.user.username}a était kick par ${message.author.username}`)
        console.log ('kick');
       });
    }

    if(message.content.startsWith(prefix + "ban")) {
        if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Tu a pas les perm x)");
        console.log ('ban no perm');
       
        if(message.mentions.users.size === 0) {
            return message.channel.send("mais mentionne le pour le ban xD");
            console.log ('ban no mention');
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.sendMessage("Je ne sais pas si l'utilisateur existe :/");
            console.log ('ban no user');
        }
        
        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("j'ai pas la perm de ban");
            console.log ('ban no bot perm');
        }
        ban.ban().then(member => {
            message.channel.sendMessage(`${member.user.username}est ban par ${member.author.username} !`)
            console.log ('ban');
        });
    }
    if(message.content.startsWith(prefix + "clear")){
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Tu a pas la permission pour clear les message :sob: !");
        console.log ('clear no numbers')

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
        case "stat":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()

        .setColor("#FCDC12")
        .setTitle(`Statistiques de l'utilisateur : ${message.author.username}`)
        .addField(`ID de l'utilisateur :id:`, msgauthor, true)
        .addField ("Date de création :", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Voici stat Discord !")
        message.channel.sendMessage({embed: stats_embed});
        console.log ('stat');
        break;
    }
});