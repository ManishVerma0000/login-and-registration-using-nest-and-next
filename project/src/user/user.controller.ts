import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseArrayPipe, ParseIntPipe, Post, Put, Res, UseGuards, UsePipes } from '@nestjs/common';
import { forgetPassword, loginUserDto, resetPassword, UserDTO } from './dto/create.user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { Req, UseFilters, UseInterceptors } from '@nestjs/common/decorators';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { ValidationPipe } from './pipe/validation.pipe';
import { AuthGuard } from './authGuard/auth.guard';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { PassThrough } from 'stream';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    // @HttpCode(200)
    // @UsePipes(ValidationPipe)
    @Post('/Signup')
    createHello(@Body() body: UserDTO) {

        return this.userService.createUser(body);
    }

    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @Post('/Login')
    loginUser(@Body() body: loginUserDto , @Res({ passthrough: true }) res:any  ) {
        return this.userService.loginUser(body,res)
    }

    @UseGuards(JwtAuthGuard)
   @Get('/protectedroutes')
   protectedroute(){
    return 'this is the guards'
   }

   @HttpCode(200)
    @UsePipes(ValidationPipe)
    @Post('/resetPassword')
    resetUser(@Body() body:resetPassword  , @Res({ passthrough: true }) res:any  ) {
        return this.userService.resetPassword(body)
    }

    @UseInterceptors(LoggingInterceptor)
    @UseGuards(AuthGuard)
    @Post('/sendEmail1')
    restpassword1(@Body() body:forgetPassword){
        console.log(body,'this is the value of the body')
        return "helloooo"
    }

    @Get('/tokens')
    getUser(@Req() req){
        return this.userService.getUser(req)
    }
    
    @Get('/logout')
    logoutuser(@Res({passthrough:true}) req){
        return this.userService.logoutUser(req)
    }

}
