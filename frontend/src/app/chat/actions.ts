'use server'

import { getSession, logout } from "cookie-handler";
import { cookies } from "next/headers"
import { Message } from "types/messages.type"

export async function getMessages(lastMessageDate: Date): Promise<{ messages: Message[]; hasMorePages: boolean } | undefined> {
  const session = await getSession();
  if (!session) {
    await logout();
    return;
  }

  const response = await fetch(`${process.env.NEST_HOST_URL}/api/messages?last-message-date=${lastMessageDate}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'Application/json',
      'cookie': 'connect.sid='+cookies().get('connect.sid')?.value
    },
  });
  if (!response.ok) {
    if (response.status == 401) {
      await logout();
    }
    return;
  }
  return await response.json();
}