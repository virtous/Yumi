// TODO: Document this code
import { BaseClient, Events } from '../../typings/index.js';
import { date } from '../tools/Date.js';

export const event: Events = {
    name: 'ready',
    emitter: 'once',
    emit: (client: BaseClient): void => {
        return console.log(
            '[%c%s%c]: %s: %s',
            'color:#00af00',
            'Info',
            'color:white',
            date(),
            `Logged in as ${client.user!.tag}`
        );
    }
};