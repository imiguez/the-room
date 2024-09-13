import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Public } from 'src/decorators/is-public.decorator';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  @Get('google/login')
  @Public()
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  @Get('google/callback')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Res() res: Response) {
    res.redirect(`${this.configService.get<string>('baseURL')}/auth/login`);
  }

  @Get('authenticate-frontend')
  @Public()
  loginHandler(@Req() req: Request) {
    if (req.session.passport.user) {
      return {
        expires: req.session.cookie.expires,
        user: req.session.passport.user,
      };
    } else throw new UnauthorizedException();
  }

  @Get('logout')
  @Public()
  logoutHandler(@Req() req: Request, @Res() res: Response) {
    if (req.session.passport.user) {
      req.session.destroy(() => res.send('Session destroyed.').status(200));
    }
  }
}
