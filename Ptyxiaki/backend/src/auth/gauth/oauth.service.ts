import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { GoogleUser } from './google-user.interface';

@Injectable()
export class OauthSevice {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async handleGoogleOAuth(user: GoogleUser): Promise<{
    user: any;
    accessToken: string;
  }> {
    const { email, name } = user;
    let existingUser = await this.userService.findUserByEmail(email);
    //αν ο χρήστης δεν υπάρχει τότε δημιουργούμε νέο
    if (!existingUser) {
      existingUser = await this.userService.createUser({
        email,
        name,
        password: '',
      });
      //δημιουργία jwt
      const payload = { email: existingUser.email, sub: existingUser.id };
      const accessToken = this.jwtService.sign(payload);

      return { user: existingUser, accessToken };
    }
  }
}
