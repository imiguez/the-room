import { MessageAuthor } from "./users.type"

export type CreateMessage = {
  content: string,
}

export type Message = {
  content: string,
  author: MessageAuthor,
  date: Date,
}