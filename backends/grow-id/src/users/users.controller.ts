import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { ChangePasswordDto } from './dto/change-password.dto';
  import { AuthGuard } from '../auth/auth.guard';
  
  @Controller('users')
  @UseGuards(AuthGuard)
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.createUser(createUserDto);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.usersService.findUserById(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.updateUser(id, updateUserDto);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.usersService.deleteUser(id);
    }
  
    @Patch(':id/password')
    changePassword(
      @Param('id') id: string,
      @Body() changePasswordDto: ChangePasswordDto,
    ) {
      return this.usersService.changePassword(
        id,
        changePasswordDto.oldPassword,
        changePasswordDto.newPassword,
      );
    }
  }
  