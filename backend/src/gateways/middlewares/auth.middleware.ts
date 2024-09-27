import { Socket } from 'socket.io';
import { redisClient } from 'src/main';

type SocketAuthMiddleWareReturnType = (
  client: Socket,
  next: (err?: Error) => void,
) => any;

export const SocketAuthMiddleware = (): SocketAuthMiddleWareReturnType => {
  return async (client, next) => {
    try {
      const cookies = client.handshake.headers.cookie;
      const connectSid = cookies
        .split(';')
        .find((cookie) => cookie.includes('connect.sid'));

      const sessionKey = `sess:${connectSid.split('=')[1].split('.')[0].substring('s%3A'.length)}`;
      const session = await redisClient.get(sessionKey);

      if (!session) throw new Error('Session does not exists.');

      client.data.session = JSON.parse(session);
      next();
    } catch (error: any) {
      next(error);
    }
  };
};
