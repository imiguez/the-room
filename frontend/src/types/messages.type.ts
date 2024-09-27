import { SessionUser } from "./users.type"

export type Message = {
  _id: string,
  content: string,
  author: SessionUser,
  date: Date,
}