import { createConsola, type ConsolaInstance } from 'consola';
import { createEnv } from 'neon-env';
import { Client as BaseClient } from 'oceanic.js';
import { Engine } from './engine';
import { JSONExport } from './json';

interface Exporters {
  json: JSONExport;
}
const env = createEnv({
  BOT_TOKEN: { type: 'string' }
});

export class Client extends BaseClient {
  public env: typeof env;
  public logger: ConsolaInstance;
  public engine: Engine;
  public exporters: Exporters;

  public constructor() {
    super({
      auth: `Bot ${env.BOT_TOKEN}`,
      gateway: {
        getAllUsers: true,
        intents: [
          'GUILDS',
          'GUILD_MEMBERS',
          'GUILD_MESSAGES',
          'MESSAGE_CONTENT',
          'ALL'
        ]
      }
    });
    this.logger = createConsola({
      defaults: { tag: 'turmoil' }
    });
    this.engine = new Engine(this);
    this.exporters = {
      json: new JSONExport(this)
    };
  }
}
