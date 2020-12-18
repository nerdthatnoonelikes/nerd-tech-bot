import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed } from "discord.js";

export default class UnmuteCommand extends Command {
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
                        start: (msg: Message) => `${msg.author} please provide a user to unmute`,
                        retry: (msg: Message) => `${msg.author} please provide a valid user to unmute`
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
            member.roles.add("789166221018529843");
            message.util.send(`${member.user.username} was unmuted by **${message.author.username}** for **${reason}**`);
        } catch (e) {
            message.util.send(`There was an error while executing that command | ${e}`);
        };
    }
}
