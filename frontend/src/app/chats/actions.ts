'use server'

import { getSession, logout } from "cookie-handler";
import { Message } from "types/messages.type";

let date1 = new Date();
date1.setHours(date1.getHours()-1);

let date2 = new Date();
date2.setHours(date2.getHours()-25);

const lastChatsHardCoded: Message[] = [
  {
    _id: 'sfjksngflsjbgvljk',
    content: 'Hard-coded message 1.',
    author: {
      _id: 'ljdsongfhsd',
      firstName: 'Pedro',
      lastName: 'Castilla',
      imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.explicit.bing.net%2Fth%3Fid%3DOIP.25iSkbJTm4F-Rq0g1JR8NgHaHa%26pid%3DApi&f=1&ipt=0ff073240c5e097159f70ea8c3ace75f3e473de2d1e8a9587bd4ed39ee0bf686&ipo=images'
    },
    date: date1,
  },
  {
    _id: 'sfjksngflsjbgvljk',
    content: 'Hard-coded message 2. wwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    author: {
      _id: 'ljdsongfhsd',
      firstName: 'Leonor',
      lastName: 'Gutierrez',
      imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.explicit.bing.net%2Fth%3Fid%3DOIP.25iSkbJTm4F-Rq0g1JR8NgHaHa%26pid%3DApi&f=1&ipt=0ff073240c5e097159f70ea8c3ace75f3e473de2d1e8a9587bd4ed39ee0bf686&ipo=images'
    },
    date: date2,
  },
  {
    _id: 'sfjksngflsjbgvljk',
    content: 'Hard-coded message 3. wwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    author: {
      _id: 'ljdsongfhsd',
      firstName: 'wwwwwwwwwwww',
      lastName: 'wwwwwwwwwwwwww',
      imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.explicit.bing.net%2Fth%3Fid%3DOIP.25iSkbJTm4F-Rq0g1JR8NgHaHa%26pid%3DApi&f=1&ipt=0ff073240c5e097159f70ea8c3ace75f3e473de2d1e8a9587bd4ed39ee0bf686&ipo=images'
    },
    date: date2,
  },
]

export async function getLastChats(from: Date = new Date(), to: Date = new Date()): Promise<{ messages: Message[]; hasMorePages: boolean } | undefined> {
  const session = await getSession();
  if (!session) {
    await logout();
    return;
  }
  const response = {
    messages: lastChatsHardCoded.filter((msg) => to > msg.date && msg.date > from),
    hasMorePages: !!lastChatsHardCoded.find((msg) => msg.date < from)
  };
  return response;
}