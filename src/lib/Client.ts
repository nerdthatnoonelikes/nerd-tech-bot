import { AkairoClient, CommandHandler, ListenerHandler, MongooseProvider } from "discord-akairo";
import { Message } from "discord.js";
import { join } from "path";
import Logger from "@ayana/logger";

import { token, owners, prefix } from "../../Config";

declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
        logger: Logger;
    }
}

interface BotOptions {
    token?: string;
    owners?: string[];
}

export default class BotClient extends AkairoClient {
    public logger: Logger = Logger.get(BotClient);
    public config: BotOptions;
    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "core", "listeners")
    });


    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "core", "commands"),
        prefix: prefix,
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 0,
        argumentDefaults: {
            prompt: {
                modifyStart: (_: Message, str: string): string => `${str}\n\nType \`cancel\` to cancel the command...`,
                modifyRetry: (_: Message, str: string): string => `${str}\n\nType \`cancel\` to cancel the command...`,
                timeout: "You took too long, the command has been cancelled.",
                ended: "You exceeded the maximum amount of tries, the command has been cancelled.",
                cancel: "This command has been cancelled.",
                retries: 3,
                time: 3e4
            },
            otherwise: ""
        },
        ignorePermissions: owners,
    });

    public constructor(config: BotOptions) {
        super({
            ownerID: config.owners
        });

        this.config = config;
    }

    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process
        });

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }

    public async start(): Promise<string> {
        await this._init();
        return this.login(this.config.token);
    }
}