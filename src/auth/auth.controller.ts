import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants';
import { Cookies } from './decorators/cookies.decorator';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup") 
  signup(@Body() createUserDto:CreateUserDto){
    return this.authService.registerUser(createUserDto)
  }
  @Post("login")
  async login(@Body() loginUserDto :LoginUserDto,@Res({passthrough:true}) response: Response,@Cookies()cookies:any){
    const token= await this.authService.loginUser(loginUserDto)
    let expireDate= new Date()
    expireDate.setDate(expireDate.getDay()+7)
    response.cookie(TOKEN_NAME,token,{
      httpOnly:false,
      secure:true,
      sameSite:'none',
      expires:expireDate,
      maxAge:1000*60*60*24*7,
    });
    return;
  }

  @Patch("/email")
  updateUser(@Param('email')userEmail:string,@Body() updateUserDto:UpdateUserDto){
    return this.authService.updateUser(userEmail,updateUserDto)
  }

}
