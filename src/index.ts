import { type CommandDef, defineCommand, runMain } from 'citty';

const _def = (re: any) => (re.default || re) as Promise<CommandDef>;

const main = defineCommand({
  meta: {
    name: 'turmoil'
  },
  subCommands: {
    channel: import('./cli/channel').then(_def)
  }
});

runMain(main);
