import { MessageTypes } from 'oceanic.js';
import type { Client } from './client';
import type { Attachment, Export, Message, Role } from './types';

export class JSONExport {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  public async export(guildID: string, channelID: string) {
    const guild = await this.client.engine.getGuild(guildID);
    if (!guild) {
      return this.client.logger.error('Could not find that server.');
    }

    const channel = await this.client.engine.getChannel(channelID);
    if (!channel) {
      return this.client.logger.error('Could not find that channel.');
    }

    const messages = await this.client.engine.getMessages(channel.id);
    if (!messages)
      return this.client.logger.error(
        'Could not find any messages from that channel.'
      );

    // Prepare for export
    const _export: Export = {
      meta: { id: '0', date: new Date(), messageCount: messages.length },
      guild: {
        id: guild.id,
        name: guild.name,
        iconURL: guild.iconURL()
      },
      channels: [
        {
          id: channel.id,
          name: channel.name,
          type: 'Text',
          topic: channel.topic,
          messages: messages.map(
            (message) =>
              <Message>{
                id: message.id,
                type: message.type === MessageTypes.DEFAULT && 'default',
                pinned: message.pinned,
                timestamp: message.timestamp,
                editedTimestamp: message.editedTimestamp,
                content: message.content,
                attachments: message.attachments.map(
                  (attachment) =>
                    <Attachment>{
                      id: attachment.id,
                      filename: attachment.filename,
                      title: attachment.title,
                      url: attachment.url,
                      proxyURL: attachment.proxyURL,
                      description: attachment.description
                    }
                ),
                author: {
                  id: message.author.id,
                  name: message.author.username,
                  bot: message.author.bot,
                  color: '',
                  // ...(message.member.roles.length > 0 && {
                  //   roles: message.member.roles.map((_role) => <Role>{})
                  // }),
                  // nickname: message.member.nick,
                  avatarURL: message.author.avatarURL(),
                  discriminator: message.author.discriminator
                }
              }
          ),
          ...(channel.parent && {
            category: { id: channel.parentID, name: channel.parent?.id }
          })
        }
      ]
    };
    return console.debug(_export.channels[0].messages);
  }
}
