import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OauthController } from './gauth/oauth.controller';
import { GoogleOauthStrategy } from './gauth/google-oauth.strategy';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { OauthSevice } from './gauth/oauth.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), //ορίζουμε το μυστικό κλειδί για το JWT
        signOptions: { expiresIn: '1h' }, //ορίζουμε το χρόνο ισχύος του JWT
      }),
    }),
    UserModule, // εισάγουμε για να χρησιμοποιήσουμε τον UserService
  ],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleOauthStrategy,
    JwtAuthGuard,
    OauthSevice,
  ],
  controllers: [AuthController, OauthController],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
