const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')

module.exports = {
    name: 'kick',
    description: 'kick a user from the server',
    usage: 'kick <user> [reason]',
    category: 'Staff',
    required: 'KICK_MEMBERS',
    guildOnly: true,
    async execute(message, args) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Vous ne disposez pas les permissions nécessaires pour bannir un utilisateur.")
        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase());

        let noUser = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setColor(colors.red)
                .setDescription('Merci de mentionner un membre')
                .addField("Usage:", '`kick <membre> [raison]`')
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
            .setDescription(`**Vous avez été expulsé: \`${message.guild.name}\`**\n**Raison:** ${banReason}\n**Modérateur:** <@${message.author.id}> (${message.author.id})`)
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.avatarURL({
                dynamic: true
            }))
        User.kick(banReason)
        User.send(banDmEmbed)
        

        let messageChannelEmbed = new Discord.MessageEmbed()
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setDescription("**" + User.user.username + " Expulé | **" + banReason)
            .setColor(colors.green)
        await message.channel.send(messageChannelEmbed)

        User.send(banDmEmbed)
        }
    }
