import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";

export default class KickCommand extends Command {
    public constructor() {
        super("kick", {
            aliases: ["kick"],
            description: {
                content: "kick someone"
            },
            category: "Moderation",
            ratelimit: 3,
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: (msg: Message) => `${msg.author} please provide a member to kick`,
                        retry: (msg: Message) => `${msg.author} please provide a valid member to kick`
                    }
                },
                {
                    id: "reason",
                    match: "rest",
                    default: "No Reason Provided"
                }
            ],
            userPermissions: ["KICK_MEMBERS"]
        })
    }

    public async exec(message: Message, { member, reason } : {member: GuildMember, reason: string}) {
        const cM = await message.guild.members.fetch(this.client.user.id);
        
        if (!member.kickable) return message.util.send(":x: This member cannot be kicked");
        if (!cM.permissions.has("KICK_MEMBERS")) return message.util.send(":x: I do not have permission to kick members");

        try {
            member.kick();
            message.util.send(`**${member.user.username}** was kicked by **${message.author.username}** for **${reason}**`)
        } catch (e) {
            return message.util.send(`There was an error while executing that command | Error ${e}`);
        };
    }
}