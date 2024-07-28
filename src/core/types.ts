export interface Role {
  id: string;
  name: string;
  color: string | null;
  position: number;
}

export interface User {
  id: string;
  name: string;
  /* Bots still have discriminators. */
  discriminator: string;
  nickname: string;
  /* Highest role color. */
  color: string;
  bot: boolean;
  roles?: Role[];
  avatarURL: string;
}

export interface Attachment {
  id: string;
  filename: string | null;
  title: string | null;
  url: string;
  proxyURL: string;
  description: string | null;
}

export interface Message {
  id: string;
  // TODO: investigate all other types
  type: 'default' | 'reply' | 'forward';
  timestamp: Date | string;
  editedTimestamp: Date | string;
  pinned: boolean;
  content: string;
  author: User;
  attachments: Attachment[];
}

export interface Channel {
  id: string;
  name: string;
  type: 'Text' | 'VoiceText' | 'Thread';
  category?: { id: string | null; name: string | null };
  topic: string | null;
  // TODO: permissions, slowmode, etc
  messages: Message[];
}

export interface Export {
  // Guild info
  guild: {
    name: string;
    id: string;
    iconURL: string | null;
    // TODO: fill in other stuff
  };
  meta: {
    id: string;
    date: Date;
    messageCount: number;
  };

  channels: Channel[];
}
