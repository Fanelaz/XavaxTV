const {
	PREFIX
} = require('../config.json');
const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const {
	Collection
} = require('discord.js')

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	category: 'Utilités',
	usage: 'help [command]',
	cooldown: 5,
	execute(message, args, commands) {

		if (!message.member.hasPermission('KICK_MEMBERS')){
			return message.channel.send('Tu n\'as pas les permissions')
		} else {

		const data = [];

		let categories = new Discord.Collection()

		if (!args.length) {
			message.client.commands.forEach(command => {
				const category = categories.get(command.category)
				if (category) {
					category.set(command.name, command)
				} else {
					categories.set(command.category, new Collection().set(command.name, command))
				}
			})

			const lines = categories.map((category, name) => `**${name}**: \n\`${category.map(command => command.name).join('`, `')}\``)

			let noArgEmbed = new Discord.MessageEmbed()
				.setThumbnail(message.guild.iconURL({
					dynamic: true
				}))
				.setDescription(`Voici le help`)
				.addField("Commandes: ", `${lines.join('\n')}`)
				.setColor(colors['Rouge clair'])
				.setAuthor(message.author.tag, message.author.avatarURL({
					dynamic: true
				}))
				.setFooter(message.client.user.username, message.client.user.avatarURL())
				.setTitle(`${message.client.user.username} Bot Help`)
				message.reply(`:newspaper: | Je vous ai envoyé la liste des commandes en MP !`)
			 message.author.send(noArgEmbed)
				.catch(error => {
					console.error(`Could not send help to ${message.author.tag}.\n`, error);
				});
		}}

	},
};