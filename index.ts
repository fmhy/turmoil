import { $ } from "./sh";
import { fetcher } from "itty-fetcher";

const channels = [
  "997040018604433479", // #to-do
  "986617857133649921", // #bad-sites
  "988133247575810059", // #dead-sites
];

const runner =
  "dotnet ./cli/DiscordChatExporter.Cli.dll export --parallel 3 -f Json -o exports/%C.json";

await $`${runner} -c ${channels.join(" ")}`
  .then(async (_) => {
    await fetcher().post(process.env.WEBHOOK_URL!, {
      username: "turmoil",
      avatar_url:
        "https://i.kym-cdn.com/entries/icons/facebook/000/043/403/cover3.jpg",
      content: `:ok_hand: successfully made backups of: ${channels.map(
        (v) => `<#${v}>`,
      )}`,
    });
  })
  .catch((error) => console.error(error));
