import { IsEmail, IsNotEmpty, IS_LENGTH, MaxLength, MinLength, minLength } from 'class-validator';

export class UserDTO {
  @IsNotEmpty({message:"should be given"})
  username: string;
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty({message:"should be given"})
  password: string;
  @IsNotEmpty({message:"should be given"})
  @IsEmail()
  email: string;
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty({message:"should be given"})
  cpassword: string;

  @MinLength(2)
  @MaxLength(14)
  @IsNotEmpty({message:"should be given"})
  phone:number;
  

}
export  class loginUserDto{
  @IsNotEmpty({message:"should be given"})
  @IsEmail()
  email: string;

  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty({message:"should be given"})
  password: string;


}

export class resetPassword{

  @IsNotEmpty({message:"should be given"})
  @IsEmail()
  email: string;
  
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty({message:"should be given"})
  cnfrmewpassword: string;

  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty({message:"should be given"})
  newPassword: string;

  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty({message:"should be given"})
  oldPassword: string;

  
 
}
export class forgetPassword{
  @IsNotEmpty({message:"should be given"})
  
phone: string;
}


