import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/users/schema/user.schema';

export class ExpressSessionSerializer extends PassportSerializer {
  serializeUser(user: User, done: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, ...userWithoutEmail } = user;
    done(null, userWithoutEmail);
  }

  deserializeUser(payload: any, done: any) {
    done(null, payload);
  }
}
