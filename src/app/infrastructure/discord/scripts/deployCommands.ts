import { REST, Routes } from "discord.js";
import "dotenv/config";
import fs from "fs";

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs
  .readdirSync("./src/app/infrastructure/discord/commands")
  .filter((file) => file.endsWith(".ts"));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  console.log(`Deploying ${file}`);
  const command = require(`../commands/${file}`);
  commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
// @ts-ignore
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(
        // @ts-ignore
        process.env.DISCORD_CLIENT_ID,
        process.env.DISCORD_GUILD_ID
      ),
      { body: commands }
    );

    console.log(
      // @ts-ignore
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
