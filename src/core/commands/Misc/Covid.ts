import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import fetch from "node-fetch";

export default class CovidCommand extends Command {
    public constructor() {
        super("covid", {
            aliases: ["covid", "covidinfo"],
            description: "see some covid stats",
            category: "Misc",
            ratelimit: 1,
            cooldown: 1000,
            args: [
                {
                    id: "country",
                    type: "string"
                }
            ]
        })
    }
    public async exec(message: Message, { country } : { country: string }) {
        if (!country) {
            const msg = await message.channel.send("Retrieving Data...")
            fetch(`https://disease.sh/v3/covid-19/all`)
            .then((res) => res.json())
            .then((body) => {
                let embed = new MessageEmbed()
                .setTitle("Coronavirus Information - Worldwide")
                .addField("Confirmed Cases", body.cases, true)
                .addField("Cases Today", body.todayCases, true)
                .addField("Total Deaths", body.deaths, true)
                .addField("Deaths Today", body.todayDeaths, true)
                .addField("Total Recovered", body.recovered, true)
                .addField("Critical Cases", body.critical, true)
                .addField("Active Cases", body.active, true)
                .addField("Total Tested", body.tests, true)
                .addField("Deaths Per Million", body.deathsPerOneMillion, true)
                .addField("Tested Per Million", body.testsPerOneMillion, true)
                .addField("Cases Per Million", body.casesPerOneMillion, true)
                .addField("Recovered Per Million", body.recoveredPerOneMillion, true)
                .setColor("RANDOM")
                msg.edit(embed)
                console.log(body)
            })
        } else if (country) {
            const msg = await message.channel.send("Retrieving Data...")
            fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
            .then((res) => res.json())
            .then((body) => {
                let embed = new MessageEmbed()
                .setTitle(`Coronavirus Information - ${body.country}`)
                .setThumbnail(body.countryInfo.flag)
                .addField("Confirmed Cases", body.cases, true)
                .addField("Cases Today", body.todayCases, true)
                .addField("Total Deaths", body.deaths, true)
                .addField("Deaths Today", body.todayDeaths, true)
                .addField("Total Recovered", body.recovered, true)
                .addField("Critical Cases", body.critical, true)
                .addField("Active Cases", body.active, true)
                .addField("Total Tested", body.tests, true)
                .addField("Deaths Per Million", body.deathsPerOneMillion, true)
                .addField("Tested Per Million", body.testsPerOneMillion, true)
                .addField("Cases Per Million", body.casesPerOneMillion, true)
                .addField("Recovered Per Million", body.recoveredPerOneMillion, true)
                .setColor("RANDOM")
                msg.edit(embed)
                console.log(body)
            })
        }
    }
}