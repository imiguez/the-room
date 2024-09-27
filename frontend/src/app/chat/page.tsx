'use server'

import { getSession } from "cookie-handler";
import { ClientChatRoom } from "./components/ClientChatRoom";


export default async function ChatRoom() {
  const session = await getSession();

  return (
    <main className={'main'}>
      <ClientChatRoom session={session}/>
    </main>
  );
}