import { Body, HttpStatus, Injectable, UnauthorizedException, UseFilters } from '@nestjs/common';
import { User, UserDocument } from './Schema/userSchema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'

import { InjectModel } from '@nestjs/mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>, private jwtService: JwtService, private readonly mailerService: MailerService) { }
  async createUser(data) {
  
    const existUser = await this.UserModel.find({ email: data.email });
    const existuserPhone = await this.UserModel.find({ phone: data.phone });
    console.log(existuserPhone.length === 0)
    if (existUser.length !== 0 && existuserPhone.length !== 0) {
      return ({ message: "user is already exist" })
    } else {
      const password = data.password;
      const cpassword = data.cpassword;
      if (password === cpassword) {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const saveddata = await new this.UserModel({ email: data.email, password: hashedPassword, username: data.username, phone: data.phone })
        const dbdata = await saveddata.save();
        console.log(dbdata)
        return ({ msg: "user registration is successfully", code: 200, data: data })

      } else {
        return ({ msg: "please enter the valid details" })
      }
    }

  }


  async loginUser(data, res) {
    const email = data.email;
    const password = data.password;
    console.log(email,password)
    const findUser = await this.UserModel.findOne({ email: email });
    if (!findUser) {
      return ({ msg: "no user is found", code: 400 })
    } else {
      const dcryptpassword = await bcrypt.compare(password, findUser.password);
      if (!dcryptpassword) {
        return ({ msg: "password is not matched", code: 400 })
      } else {
        const payload = { username: findUser.username, sub: findUser._id };

        const access_token = this.jwtService.sign(payload);
        console.log(access_token,'this is the value of the sccess token')
        // res.cookie(  {name:"jwt"},    access_token,   {httpOnly: true}  )
        // res.cookie(name:"jwt",)
        res.cookie("jwt", access_token, { httpOnly: true });
        return ({ msg: "login is successfull", code: 200,data:access_token });
      }
    }
  }

  async resetPassword(data) {
    const email = data.email;
    const newPassword = data.newPassword;
    const cnfrmNewPassword = data.cnfrmewpassword;
    const oldPassword = data.oldPassword;

    const findUser = await this.UserModel.findOne({ email: email });
    if (!findUser) {
      return ({ msg: "user is not found", code: 400 })
    } else {
      console.log(findUser)
      if (newPassword === cnfrmNewPassword) {

        const matchPassword = await bcrypt.compare(oldPassword, findUser.password);
        console.log(matchPassword, ',,,,,,,,')
        if (!matchPassword) {
          return ({ msg: "user password not matched please entert the valid password" })
        } else {
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          console.log(hashedPassword, "this is the hashed password");

          const updatePassword = await this.UserModel.findOneAndUpdate(email, { password: hashedPassword });
          console.log(updatePassword, 'this is the updayted password')
          return ({ msg: "password is updated successfully ", code: 200 });
        }
      } else {
        throw new HttpException('user not found', HttpStatus.FORBIDDEN);
        // return ({ msg: "please enter the same password" })
      }
    }
  }
  async sendEmail(data) {

    const phone = data.phone
    const findUser = await this.UserModel.findOne({ phone: phone });
    if (!findUser) {
      throw new HttpException('user not found', HttpStatus.FORBIDDEN);
    } else {
      const useremail = findUser.email;
      console.log(useremail, "this is the user email")
    }
    const mail = this.mailerService
      .sendMail({
        to: findUser.email, // list of receivers
        from: 'manishverma88180@gmail.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      }).then(() => {
        console.log("mail is send successfully");

      }).catch((error) => {
        console.log(error)
      })
    if (mail) {
      return ({ msg: "mail is sent" })
    } else {
      return ({ msg: "mail is not sent" })
    }

  }

  async restpassword1(id) {
    console.log(id, "this is the value of the id");
    return id;
  }


  async getUser(req) {
    try {
      const cookies1 = req.cookies['jwt']
      console.log(cookies1, "this is the value of the cookied")
      const data = await this.jwtService.verifyAsync(cookies1);

      if (!data) {
        return new UnauthorizedException();
      } else {
        const user = await this.UserModel.find({ _id: data['sub'] });
        console.log(user, 'this is the user')
      }

    } catch (err) {
      return new UnauthorizedException();
    }

  }

  async logoutUser(res){
    try{
        res.clearCookie('jwt')
        return ({msg:"usr is logout"})
    }catch(err){
      return new UnauthorizedException()
    }
  }
}




