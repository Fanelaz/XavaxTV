const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require("ms");

module.exports = {
    name: 'embed',
    description: 'Créé un embed',
    usage: 'embed <texte>',
    category: 'Staff',
    guildOnly: true,
    async execute(message, args){

        if(!message.member.roles.cache.has('790668756279623770')) {
            return message.channel.send('Tu n\'a pas les permissions !')
        } else {

        const sayMessage = args.join(" ");

        let embed = new Discord.MessageEmbed()
        .setTitle(message.author.username)
        .setDescription(sayMessage)

        message.delete()
        message.channel.send(embed)

        }
}}
