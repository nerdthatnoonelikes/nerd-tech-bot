import { Command } from "discord-akairo";
import { Message, Util } from "discord.js";

import { execSync } from "child_process";

export default class ExecCommand extends Command {
  public constructor() {
    super("exec", {
      aliases: ["exec", "execute"],
      args: [
        {
          id: "command",
          match: "content",
          prompt: {
            start: "Please provide something to execute",
          },
        },
      ],
      description: {
        content: "executes commands",
      },
      ownerOnly: true,
    });
  }

  public exec(message: Message, { command }: { command: string }) {
    try {
      const messages = Util.splitMessage(execSync(command).toString(), {
        maxLength: 1900,
      });
      if (Array.isArray(messages))
        return messages.map((m) => message.channel.send(m, { code: "bash" }));
      return message.util.send(message, { code: "bash" });
    } catch (error) {
      const messages = Util.splitMessage(error, { maxLength: 1900 });
      if (Array.isArray(messages))
        return messages.map((m) => message.channel.send(m));
      return message.util.send(message);
    }
  }
}