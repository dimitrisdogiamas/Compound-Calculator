import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.jwt;
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      request.user = decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
      console.log(error);
    }
    return true; // συνεχίζουμε την υπόλοιπη επεξεργασία guard
  }
}
