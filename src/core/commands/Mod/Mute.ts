import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed } from "discord.js";

export default class MuteCommand extends Command {
    public constructor() {
        super("mute", {
            aliases: ["mute"],
            description: {
                content: "mute a user"
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

            if (!role) {
                role = await message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: "#505050",
                    },
                    reason: "Role needed for Mute System"
                })
            }

            channels.forEach(channel => {
                channel.updateOverwrite(role, {
                    SEND_MESSAGES: false,
                })
            })

            let MuteEmbed = new MessageEmbed()
                .setThumbnail(member.user.displayAvatarURL())
                .setTitle('User Was Muted!')
                .addField('Who Was Muted', member.user.tag)
                .addField('Muted By', message.author.tag)
                .addField('Reason', reason)
                .setColor("RANDOM")
                .setTimestamp()

            message.util.send(MuteEmbed)

            member.roles.add(role);
        } catch (e) {
            message.util.send(`There was an error while executing that command | ${e}`);
        };
    }
}
