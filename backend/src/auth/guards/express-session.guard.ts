import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Socket } from 'socket.io';
import { IS_PUBLIC_KEY } from 'src/decorators/is-public.decorator';

@Injectable()
export class ExpressSessionAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    switch (context.getType()) {
      case 'http':
        const request = context.switchToHttp().getRequest<Request>();
        const user = request.session.passport?.user;
        if (!user)
          throw new UnauthorizedException('User is not authenticated.');
        else return true;

      case 'ws':
        // This Middleware is executed before every socket event.
        // The SocketAuthMiddleware is in charge to be executed before a new socket connection is established.
        const client: Socket = context.switchToWs().getClient();
        const session = client.data.session;
        const expired = new Date() > new Date(session.cookie.expires);
        if (expired) {
          client.emit('auth_error', 'Session has expired.');
          client.disconnect(true);
        }
        return !expired;

      default:
        return false;
    }
  }
}
