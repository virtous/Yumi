import { Client as BaseClient, ClientOptions, Collection, MessageEmbed } from 'discord.js';
import { Commands } from '../../typings/index'

// We will extend the Client class and add new properties and methods
export class Client extends BaseClient {
    private _token: string;

    constructor(token: string, options?: ClientOptions) {
        super(options);
        this._token = token;
    };

    // Let's add new properties and methods
    commands: Collection<string, Commands> | undefined = undefined;

    // This method will return the basic config for our embed
    static createEmbed(): MessageEmbed {
        return new MessageEmbed().setTimestamp();
    };

    async connect(): Promise<void> {
        await this.login(this._token);
        return;
    }
}