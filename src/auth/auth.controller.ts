import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { Token } from './decorators/token.decorator';
import { User } from './decorators/user.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register.user.dto';
import { AuthGuard } from './guard/auth.guard';
import { ICurrentUser } from './interfaces/current.user.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'auth.register.user' }, registerUserDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'auth.login.user' }, loginUserDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: ICurrentUser, @Token() token: string) {
    // get token with bearer authorization
    // return {
    //   user: req['user'],
    // };
    return { user, token };
    return this.client.send({ cmd: 'auth.verify.token' }, {});
  }
}
