import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Public } from 'src/decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @Public()
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  @Get('google/callback')
  @Public()
  @UseGuards(GoogleAuthGuard)
  googleCallback() {}
}
