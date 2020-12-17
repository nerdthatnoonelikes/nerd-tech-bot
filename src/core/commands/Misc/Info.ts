import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import os from "os";
import dotenv from "dotenv";
import fs from "fs";
import { cpu } from "node-os-utils";

export default class InfoCommand extends Command {
    public constructor() {
        super("info", {
            aliases: ["info", "information", "botinfo"],
            description: {
                content: "see some information about the bot"
            },
            category: "Misc"
        });
    }
    
    public async exec(message: Message) {
        const msg = await message.util.send("Fetching info...");
        const usedmemory = process.memoryUsage().heapUsed / 1024 / 1024
        const usedmemoryinmb = `${Math.round(usedmemory)}`
            
        const fileStr = await fs.promises.readFile("/etc/os-release");
        const data = dotenv.parse(fileStr);


        const embed = new MessageEmbed()
            .setTitle(`Info about ${this.client.user.username}`)
            .setColor("RANDOM")
            .addField("Memory Usage", `${usedmemoryinmb}MB`)
            .addField("CPU Architecture", os.arch())
            .addField("Operating System", `${os.platform()} | ${data.NAME}`)
            .addField("CPU Usage",`${await cpu.usage()}%`)

        msg.delete();
        message.channel.send(embed);
    }
}