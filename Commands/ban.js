const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')

module.exports = {
    name: 'ban',
    description: 'Bans a user from the server',
    usage: 'ban <user> [reason]',
    category: 'Staff',
    required: 'BAN_MEMBERS',
    guildOnly: true,
    async execute(message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Vous ne disposez pas les permissions nécessaires pour bannir un utilisateur.")
        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase());

        let noUser = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor(colors.red)
                .setDescription('Merci de mentionner un membre')
                .addField("Usage:", '`ban <membre> [raison]`')
                .setFooter(message.client.user.username, message.client.user.avatarURL())


        if (!User) return message.channel.send(noUser)

        let banReason = args.join(" ").slice(23)
        if (!banReason) {
            banReason = "Pas de raison"
        }
        
        let banDmEmbed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))
            .setColor(colors.red)
            .setDescription(`**Vous avez été bannit: \`${message.guild.name}\`**\n**Raison:** ${banReason}\n**Modérateur:** <@${message.author.id}> (${message.author.id})`)
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.avatarURL({
                dynamic: true
            }))
        User.ban({days: 7, reason: banReason})
        User.send(banDmEmbed)
        

        let messageChannelEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setDescription("<a:tickyes:743243992199725088>** " + User.user.username + " bannit | **" + banReason)
            .setColor(colors.green)
        await message.channel.send(messageChannelEmbed)

        User.send(banDmEmbed)
        }
    
}