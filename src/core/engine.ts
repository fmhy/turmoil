import type {
  AnyGuildChannelWithoutThreads,
  GetChannelMessagesOptions,
  Guild,
  TextableChannel,
  User
} from 'oceanic.js';
import type { Client } from './client';

export class Engine {
  private client: Client;

  public constructor(client: Client) {
    this.client = client;
  }

  public async getChannels(
    guildID: string
  ): Promise<AnyGuildChannelWithoutThreads[] | undefined> {
    return (
      (await (
        this.client.guilds.get(guildID) ??
        (await this.client.rest.guilds.get(guildID))
      ).getChannels()) ?? undefined
    );
  }

  public async getChannel(
    channelID: string
  ): Promise<TextableChannel | undefined> {
    return (
      ((await (this.client.getChannel(channelID) ??
        this.client.rest.channels.get(channelID))) as TextableChannel) ??
      undefined
    );
  }

  public async getMessages(
    channelID: string,
    options?: GetChannelMessagesOptions
  ) {
    const channel = await this.getChannel(channelID);
    if (!channel) return;
    return await channel.getMessages(options);
  }

  public async getUser(userID: string): Promise<User | undefined> {
    return (
      this.client.users.get(userID) ??
      (await this.client.rest.users.get(userID)) ??
      undefined
    );
  }

  public async getGuild(guildID: string): Promise<Guild | undefined> {
    return (
      this.client.guilds.get(guildID) ??
      (await this.client.rest.guilds.get(guildID)) ??
      undefined
    );
  }

  public async getGuildSettings(guildID: string) {
    const guild = await this.getGuild(guildID);
    if (!guild) return undefined;

    // TODO: Return guild settings only
    return guild.toJSON();
  }
}
