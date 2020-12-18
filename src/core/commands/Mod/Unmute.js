import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed } from "discord.js";

export default class MuteCommand extends Command {
    public constructor() {
        super("unmute", {
            aliases: ["unmute"],
            description: {
                content: "unmute a user"
            },
            category: "Moderation",
            ratelimit: 3,
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: (msg: Message) => `${msg.author} please provide a user to mute`,
                        retry: (msg: Message) => `${msg.author} please provide a valud user to mute`
                    }
                },
                {
                    id: "reason",
                    match: "rest",
                    default: "No reason provided"
                }
            ],
            userPermissions: ["ADMINISTRATOR"]
        })
    }

    public async exec(message: Message, {member, reason}: {member: GuildMember, reason: string}) {
        try {

            let channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
            let role = message.guild.roles.cache.find((x) => x.name === "Muted");

            if (!role) return message.channel.send("That user has not been muted.")

            let UnmuteEmbed = new MessageEmbed()
              .setThumbnail(user.user.displayAvatarURL())
              .setTitle('User Was Unmuted!')
              .addField('Who Was Unmuted', user.user.tag)
              .addField('Unmuted By', message.author.tag)
              .addField('Reason', reason)
              .setColor("BLUE")
              .setTimestamp()

            message.channel.send(UnmuteEmbed)

            member.roles.remove(role);
        } catch (e) {
            message.util.send(`There was an error while executing that command | ${e}`);
        };
    }
}
