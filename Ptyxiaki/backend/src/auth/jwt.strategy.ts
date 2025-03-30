import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Πώς θα αντλούμε το JWT από το request
      ignoreExpiration: false, // Να ελέγχει αν έχει λήξει το JWT
      secretOrKey: configService.get<string>('JWT_SECRET'), //κρυφό κλειδί για το Jwtw
    });
  }
  async validate(payload: any) {
    // εδώ κάνουμε αναζήτηση του χρήστη μέσω του payload και επιστρέφουμε τον χρήστη
    const user = await this.userService.findUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return { ...user, role: user.role };
  }
}
