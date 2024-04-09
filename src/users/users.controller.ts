import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../Guards/jwt.guard';
import { AuthGuard } from '../Guards/auth.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async GetUsers() {
    return await this.usersService.getUsers();
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  async GetUser(@Param() params: { id: string }, @Req() req) {
    return await this.usersService.getUser(params.id, req);
  }
}
