const ms = require('ms');

module.exports = {
    name: "giveaway",
    description: "Starts a giveaway",
    aliases: ['gstart'],
	category: 'Staff',
	usage: '',

    async execute(message, args, client){
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'êtes pas autorisé à lancer des cadeaux");
        

        let channel = message.mentions.channels.first();

        if (!channel) return message.channel.send('Veuillez fournir une chaîne');

        let giveawayDuration = args[1];

        if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send('Veuillez fournir une durée valide');

        let giveawayWinners = args[2];
 
        if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.channel.send('Veuillez fournir un nombre valide de gagnants !');

        let giveawayPrize = args.slice(3).join(" ");

        if (!giveawayPrize) return message.channel.send('Ok alors, je ne donnerai rien');

        client.giveawaysManager.start(channel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayWinners,
            hostedBy: true ? message.author : null,

            messages: {
                giveaway: (true ? "@everyone\n\n" : "") ,
                embedColor: ('#2f3136'),
                giveawayEned: (true ? "@everyone\n\n" : "") + "GIVEAWAY ENDED",
                timeRemaining: "Temps restant : **{duration}**",
                inviteToParticipate: "Réagissez avec 🎉 ",
                winMessage: "Félicitations {winners}, qui gagne **{prize}**",
                embedFooter: "Temps ",
                noWinner: "Impossible de déterminer un gagnant",
                hostedBy: "Hébergé par {user}",
                winners: "Gagnant(s)",
                endedAt: "Fini à",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "heurs",
                    days: "jours",
                    pluralS: false
                }
            }
        })

        message.channel.send(`Giveaway à partir de ${channel}`);
    }
}