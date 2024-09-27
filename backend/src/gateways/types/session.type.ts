import { CookieOptions } from 'express-session';
import { ExpressSessionUser } from 'src/auth/types/user-express-session.type';

export type SocketExpressSession = {
  cookie: CookieOptions;
  passport: Passport;
};

export type Passport = {
  user: ExpressSessionUser;
};
