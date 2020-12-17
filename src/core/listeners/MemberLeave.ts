import { Listener } from "discord-akairo";
import { Message, MessageEmbed, GuildMember, TextChannel } from "discord.js";

export default class GuildMemberAdd extends Listener {
  public constructor() {
    super('guildMemberRemove', {
      emitter: "client",
      event: "guildMemberRemove"
    })
  }

  public async exec(member: GuildMember, message: Message) {
    const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(member.user.username, member.user.avatarURL())
        .setDescription(`${member.user.username} has left us :(`)

    const channel = this.client.channels.cache.get("788801256491057173") as TextChannel;
    channel.send(embed);
  }
}