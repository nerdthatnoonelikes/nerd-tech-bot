import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed } from "discord.js";

export default class BalanceCommand extends Command {
    public constructor() {
        super("daily", {
            aliases: ["daily"],
            category: "Fun",
            description: "daily coins :o",
            ratelimit: 1,
            cooldown: 86400000
        })
    }

    public async exec(message: Message) {
        await this.client.db.add(`coins_${message.author.id}`, 500);

        const embed = new MessageEmbed()
            .setAuthor(`Daily`, message.author.displayAvatarURL({dynamic: true}))
            .setColor("RANDOM")
            .setTitle(`Here is your daily money ${message.author.username}`)
            .setDescription(`**$500** was placed in your wallet`)
            message.channel.send(embed)
    }
}