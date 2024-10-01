import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    // Log in the request to establish an express-session.
    await super.logIn(request);
    return activate;
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    return user;
  }
}
