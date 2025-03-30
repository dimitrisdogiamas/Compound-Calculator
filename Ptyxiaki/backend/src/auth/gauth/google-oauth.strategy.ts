import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  } // λαμβάνουμε τα δεδομένα απο τον χρήστη
  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { emails, displayName } = profile;
    const email = emails[0].value;
    let user = await this.userService.findUserByEmail(email);
    if (!user) {
      // αν ο χρήστης δεν υπάρχει τότε δημιουγόυμε νεο
      user = await this.userService.createUser({
        email,
        password: '',
        name: displayName,
      });
    }
    //Δημιουργία Jwt token για τον χρήστη
    console.log(user);
    const payload = { sub: user.id, email: user.email };
    const accessTokenJwt = this.jwtService.sign(payload);
    console.log(accessTokenJwt);
    return {
      email: user.email,
      name: user.name,
      accessToken: accessTokenJwt,
    };
  }
}
