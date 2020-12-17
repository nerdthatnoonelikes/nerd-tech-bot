import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";

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
            member.roles.add("789166221018529843");
            message.util.send(`${member.user.username} was muted by **${message.author.username}** for **${reason}**`);
        } catch (e) {
            message.util.send(`There was an error while executing that command | ${e}`);
        };
    }
}