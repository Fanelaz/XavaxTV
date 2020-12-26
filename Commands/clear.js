const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require("ms");

module.exports = {
    name: 'clear',
    description: 'Supprime des messages',
    usage: 'clear <nombre_de_messages>',
    category: 'Staff',
    guildOnly: true,
    async execute(message, args){

        if(message.member.hasPermission("MANAGER_MESSAGES")) { 

                message.delete();
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Tu n'as pas la permission...`);
            if(!args[0]) return message.channel.send("Tu dois spécifier un nombre de messages à supprimer !");
            message.channel.bulkDelete(args[0]).then(() => {
                message.channel.send(`À ton service! (${args[0]}) `).then(msg => {
                    msg.delete({ timeout: 3000 })
                  })
        
            })}}}
