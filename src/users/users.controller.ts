import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        return this.usersService.create(body.email, body.password); 
    }

    @Get('/:id')
    @Serialize(UserDto)
    getUser(@Param('id') param: string) {
        const user = this.usersService.findOne(parseInt(param));

        if (!user) {
            throw new NotFoundException('user not found');
        }

        return user;
    }

    @Get('')
    getUserByEmail(@Query('email') email: string) {
        return this.usersService.find(email)
    }

    @Delete('/:id')
    deleteUser(@Param('id') param: string) {
        return this.usersService.remove(parseInt(param))
    }

    @Patch('/:id')
    updateUser(@Param('id') param: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(param), body)
    }
    
}
