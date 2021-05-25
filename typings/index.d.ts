import { Client, Collection, MessageEmbed } from "discord.js";

interface Commands {
    name: string;
    execute: () => void;
    aliases?: Array<string>;
    desc?: string;
}

interface BaseClient extends Client {
    commands?: Collection<string, Commands>;
    createEmbed?: () => MessageEmbed
    connect: () => Promise<void>
}

interface Events {
    name: string;
    emitter: 'on' | 'once',
    emit: (...args: any) => void;
}