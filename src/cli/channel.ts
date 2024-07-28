import { defineCommand } from 'citty';
import { Client } from '../core/client';

export default defineCommand({
  meta: {
    name: 'channel'
  },
  args: {
    guild: { type: 'string' },
    id: { type: 'string' }
  },

  async run(ctx) {
    const client = new Client();
    await client.connect();

    client.on('ready', async () => {
      await client.exporters.json.export(ctx.args.guild, ctx.args.id);
      process.exit(1);
    });
  }
});
