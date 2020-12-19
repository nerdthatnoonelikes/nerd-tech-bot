import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed } from "discord.js";

export default class BalanceCommand extends Command {
    public constructor() {
        super("balance", {
            aliases: ["balance", "bal"],
            category: "Fun",
            description: "Check your balance or someone elses",
            args: [
                {
                    id: "member",
                    type: "member",
                    default: (msg: Message) => msg.author,
                    prompt: {
                        retry: (msg: Message) => `${msg.author} that is not a valid person to check the balance of`
                    }
                }
            ]
        })
    }

    public async exec(message: Message, { member } : { member: GuildMember }) {
        let coins = await this.client.db.get(`coins_${member.id}`);

        if (coins === null) coins = 0;

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**Coins**: ${coins}`)
            .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))

        message.channel.send(embed);
    }
}