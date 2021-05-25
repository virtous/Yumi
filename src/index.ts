// Import everything that we need
import { Collection } from 'discord.js';
import { Client } from './tools/Client.js';
import { Commands, BaseClient, Events } from '../typings/index';
import { readdirSync } from 'fs';
import { date } from './tools/Date.js';
import { config } from 'dotenv';

// Execute the config function from dotenv
config();

// Declare our client
const client: BaseClient = new Client((process.env["TOKEN"] as string));
client.commands = new Collection() as Collection<string, Commands>;

// Load the events
async function loadEvents(): Promise<void> {

    // We get all files from the events folder
    const events: Array<string> = readdirSync('./src/events/').filter((file) => file.endsWith('.js'));

    // Now, we loop over each files and load them
    for (const file of events) {

        // We import the files
        const { event }: { event: Events } = await import(`./events/${file}`);

        // We load the events
        client[event.emitter](event.name, (...args: Array<string>) => {
            event.emit(...args, { 
                client: client
            });
        });

        // We log the progress
        return console.log(
            '[%c%s%c]: %s: %s',
            'color:#00af00',
            'Info',
            'color:white',
            date(),
            `Loaded ${event.name} event`
        );
    };
};

// Load the commands
async function loadCommands(): Promise<void> {
    
    // We get all folder from the commands folder
    const baseDir: Array<string> = readdirSync('./src/commands/');

    // We check if there's any folder loaded
    if (baseDir.length) {

        // If there's any, we loop over each of them
        for (const dir of baseDir) {

            // Now, we get all files from the command/{dir} folder
            // {dir} is a string from {baseDir}
            const commands: Array<string> = readdirSync(`./src/commands/${dir}/`).filter((file) => file.endsWith('.js'));

            // We loop over each files and load them
            for (const file of commands) {

                // We import the files
                const { command }: { command: Commands } = await import(`./commands/${dir}/${file}`);
    
                // We save the command in the collection
                client.commands?.set(command.name, command);

                // We log the progress
                return console.log(
                    '[%c%s%c]: %s: %s',
                    'color:#00af00',
                    'Info',
                    'color:white',
                    date(),
                    `Loaded ${command.name} command`
                );
            };
        };
    }
};

// Load everything
async function main(): Promise<void> {
    // We try to run our bot and catch errors (if any)
    try {
        await client.connect();
        await loadEvents();
        await loadCommands();
        return;
    } catch (err) {
        return console.error(
            '[%c%s%c]: %s: %s',
            'color:#00af00',
            'Info',
            'color:white',
            date(),
            `Error: ${err?.message}`
        );
    };
};

// Run the main function
main();