const config = require("./config");
const Canvas = require("canvas");
const Discord = require("discord.js");

module.exports = function (client) {

    const description = {
        name: "ImageBVN",
        filename: "welcome.js",
        version: "1.0"
    }

    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)

    client.on("guildMemberAdd", async member => {

      if(!member.guild) return;

      const canvas = Canvas.createCanvas(1772, 633);

      const ctx = canvas.getContext('2d');

      const background = await Canvas.loadImage(`./welcome.png`);
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#f2f2f2';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      var textString3 = `${member.user.username}`;

      if (textString3.length >= 14) {
        ctx.font = 'bold 100px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }

      else {
        ctx.font = 'bold 150px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }


      var textString4 = `Membre #${member.guild.memberCount}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 750, canvas.height / 2 + 125);

      var textString4 = `${member.guild.name}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 700, canvas.height / 2 - 150);

      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();

      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
      const welcomeembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Bienvenue", member.guild.iconURL({ dynamic: true }))
        .setDescription(`**Bienvenue sur ${member.guild.name}!**`)
        .setImage("attachment://welcome-image.png")
        .attachFiles(attachment);
      const channel = member.guild.channels.cache.find(ch => ch.id === config.CHANNEL_WELCOME);
      channel.send(welcomeembed);
      let roles = config.ROLES_WELCOME;
      for(let i = 0; i < roles.length; i++ )
      member.roles.add("790558912973242399");
    })


}

//Coded by Tomato#6966!
