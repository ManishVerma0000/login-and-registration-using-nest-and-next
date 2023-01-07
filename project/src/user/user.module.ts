import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Schema/userSchema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config/dist';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),ConfigModule.forRoot()
    , JwtModule.register({
      secret: process.env.SECRET_KEY,



      signOptions: { expiresIn: '1d' },
    }), MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: "manishverma88180@gmail.com",
          pass: "yqftirfirjqcunzy",
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      preview: true,
     
    })],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService]
})
export class UserModule { }
