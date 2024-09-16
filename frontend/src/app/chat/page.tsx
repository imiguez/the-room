'use server'

import { getSession } from "cookie-handler";
import Nav from "./components/Nav";
import MessageImput from "./components/MessageInput";
import { ChatContainer } from "./components/ChatContainer";


export default async function ChatRoom() {
  const session = await getSession();

  return (
    <main className={'main'}>
      <Nav session={session} />

      <ChatContainer session={session}/>

      <MessageImput />
    </main>
  );
}