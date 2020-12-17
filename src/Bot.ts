import BotClient from "./lib/Client";
import { token, owners } from "../Config";

const client: BotClient = new BotClient({token, owners});
client.start();