import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Body,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { Request } from 'express';
import { Roles } from '../roles-guard/CustomDecorator/custom_decorator';
import { Role } from '../roles-guard/roles.enum';
import { RolesGuard } from 'src/roles-guard/RolesGuard.guard';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('me')
  async getProfile(@Req() req: Request) {
    return req.user;
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles(Role.Admin) // ορίζουμε τον ρόλο
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update-password')
  async updatePassword(@Body() Body: { email: string; newPassword: string }) {
    if (!Body.newPassword) {
      throw new BadRequestException('New password is required');
    }
    return this.userService.updatePassword(Body.email, Body.newPassword);
  }
}
