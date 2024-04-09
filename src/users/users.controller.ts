import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async GetUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  async GetUser(@Param() params: { id: string }) {
    return await this.usersService.getUser(params.id);
  }
}
