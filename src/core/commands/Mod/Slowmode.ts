import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";

export default class SlowModeCommand extends Command {
    public constructor() {
        super("slowmode", {
            aliases: ["slowmode", "slow"],
            category: "Moderation",
            description: "Set a channel to slowmode",
            args: [
                {
                    id: "time",
                    type: "number",
                    prompt: {
                        start: (msg: Message) => `${msg.author} please provide a time`,
                        retry: (msg: Message) => `${msg.author} that is not a valid amount of time`
                    }
                }
            ],
            userPermissions: ["ADMINISTRATOR"]
        })
    }
    public async exec(message: Message, { time } : { time: number}) {
        const channel = message.channel as TextChannel;

        if (time.toString() === "off") {
            channel.setRateLimitPerUser(0);
        } else { 
            channel.setRateLimitPerUser(time);
            message.util.send(`The slowmode for this channel is now set to ${time}`);
        }
    }
}