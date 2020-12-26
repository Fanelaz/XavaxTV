const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "report",
    category: "Utils",
    description: "Reports a member",
    usage: "<mention, id>",
    async execute(message, args){
        if (message.deletable) message.delete();

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!rMember)
            return message.reply("Tu es sur que cette personne existe ?").then(m => m.delete(5000));

        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.channel.send("Je ne peut pas signaler ce membre").then(m => m.delete(5000));

        if (!args[1])
            return message.channel.send("Merci de mettre la raison de ce signalement").then(m => m.delete(5000));
        
        const channel = message.guild.channels.cache.find(c => c.id === "790019288190812175") // A changer
                    const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Membre signalé :", rMember.user.displayAvatarURL)
            .setDescription(stripIndents`**- Membres:** ${rMember} (${rMember.user.id})
            **- Signalé par:** ${message.member}
            **- Signalé dans:** ${message.channel}
            **- Raison:** ${args.slice(1).join(" ")}`);

        return channel.send(embed);
        
    }
}