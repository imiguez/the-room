import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    const google = configService.get('google');

    super({
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: `${configService.get('baseURL')}/api/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  /**
   * This method is executed after user accepted login into the app using Google credentials.
   * @param accessToken Access token provided by Google.
   * @param refreshToken Refresh token provided by Google.
   * @param profile Object with user's data provided by Google.
   * @param done Function executed at the end.
   */
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const user = await this.authService.validateOrCreateGoogleUser(profile);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, firstName, lastName, imageUrl, ...theRestOfTheUser } = user;
    done(null, { _id, firstName, lastName, imageUrl });
  }
}
