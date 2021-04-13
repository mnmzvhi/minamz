const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You\'re not an admin dummy");
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = new Discord.MessageEmbed()
      .setTitle(`You were kicked from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#FF0000")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL());

    if (!args[0]) return message.channel.send("Who am I kicking?");
    if (!mentionedMember) return message.channel.send("The member mentioned is not in this server.");
    try {
      await mentionedMember.send(kickEmbed);
    } catch (err) {
      console.log(`I was unable to message the member.`);
    }

    try {
      await mentionedMember.kick(reason)
    } catch (err) {
      console.log(err)
      message.channel.send("I was unable to kick the member mentioned.")
    }
  }
}