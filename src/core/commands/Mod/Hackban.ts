
import { Command } from "discord-akairo"
import { MessageEmbed, Message, GuildMember } from "discord.js"

export default class BanCommand extends Command {
    public constructor() {
        super('hackban', {
            aliases: ['hackban', 'hb'],
            description: {
                content: 'hackban a user'
            },
            category: 'Moderation',
            ratelimit: 3,
            args:[
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: (msg: Message) => `${msg.author} please provide a member to ban`,
                        retry: (msg: Message) => `${msg.author} please provide a valid member to ban`,
                    }
                },

                {
                    id: 'reason',
                    match: 'rest',
                    default: 'No reason provided'
                }
            ],
            userPermissions: ["BAN_MEMBERS"]
        })
    }

    public async exec(message: Message, { member, reason }: {member: GuildMember, reason: string}) {
        this.client.users.fetch(member.user.id).then(async user => {
            await message.guild.members.ban(user.id, {reason: reason});
            return message.util.send(`**${user.username}** was hackbanned by **${message.author.username}** for **${reason}**`)
        }).catch(e => {
            return message.util.send(`There was an error while executing that command | ${e}`);
        });
    }
}