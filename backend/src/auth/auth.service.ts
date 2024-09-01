import { Inject, Injectable } from '@nestjs/common';
import { Profile } from 'passport-google-oauth20';
import { User } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(@Inject() private usersService: UsersService) {}

  async validateOrCreateGoogleUser(profile: Profile): Promise<User> {
    let user = await this.usersService.findOneByEmail(profile.emails[0].value);
    if (!user) {
      user = await this.usersService.create({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        imageUrl: profile.photos[0].value,
      });
    }
    return user;
  }
}
