import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { GoogleOauthGuard } from './google-oauth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { Request, Response } from 'express';
import { GoogleUser } from '../gauth/google-user.interface';
import { OauthSevice } from '../gauth/oauth.service';
@Controller('oauth')
export class OauthController {
  constructor(private readonly oauthService: OauthSevice) {}
  @UseGuards(GoogleOauthGuard)
  @Get('google')
  async googleLogin() {}
  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  async googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    // περνάμε τα στοιχεία του χρήστη απο το request
    const { email, name, accessToken } = req.user as GoogleUser; // κάνουμε type assertion η explicit cast
    //ορίζουμε το coockie με το jwt
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // αν το app είναι σε παραγωγή τότε απαιτείται secure cookie
      maxAge: 3600000,
    });
    // επιστρεφουμε δεδομένα στον χρήστη
    res.json({
      message: 'success',
      user: {
        email,
        name,
      },
    });
    res.redirect('/dashboard');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
