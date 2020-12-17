import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
    public constructor() {
        super('ping', {
            aliases: ['ping'],
            description: {
                content: 'pong'
            },
            category: 'Misc',
        });
    }

    public async exec(message: Message) {
        message.channel.send(`Pong! ${this.client.ws.ping}ms`)
    }
}