import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import sgMail from '@sendgrid/mail'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Create a new user

  async createUser(req: Request, res: Response) {
    const { useremail, password, username } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = jwt.sign({email: useremail},process.env.JWT_KEY!)
    try {
      let user = new User();
      user.username = username;
      user.useremail = useremail;
      user.password = hashedPassword;
      user.confirmationCode=  token;
      //if username = admin123 make the user an admin
      if (username ==='admin123') {
        user.role = 'admin'
      }
      else{
        user.role = 'user' //else set the role to user
      }
      // verification url
      const url = "http://localhost:5000/verify/" + token;
      sgMail.setApiKey(process.env.API_KEY!)
      const msg = {
        to: useremail,
        from: 'sharmaaagya7@gmail.com',
        subject: 'Please confirm your account',
        html: `<h1>Email Confirmation</h1>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href="${url}">Click Here</a>`
      }
      try {
        // sned the confirmation mail
        sgMail.send(msg)
        await this.save(user);
        return res.send({
          message:
            "User was registered successfully! Please check your email",
        });
      } catch (err) {
        console.log(err)
      }
  }catch (error) {
      res.send(error);
    }
  }

  //forget password 
  async forgetPassword(req: Request, res: Response): Promise<any> {
    const { useremail} = req.body;
    try{
    const currentUser = await User.findOne({useremail: useremail })
    if(!currentUser){
        res.status(401).json({
        error: 'user do not exists!'
      })
    }
    else{
    const ResetToken =  jwt.sign({ id:currentUser.id},  process.env.JWT_KEY!, {
        expiresIn: "1h",
      });
      //reset password link
      const url = "http://localhost:5000/resetPassword/" + ResetToken;
      sgMail.setApiKey(process.env.API_KEY!)

      const msg = {
        to: useremail,
        from: 'sharmaaagya7@gmail.com',
        subject: 'Reset Password Link',
        html: `Please click on the following link to reset your password: <a href="${url}">${url}</a>`,
      }
      try {
        //send the resent link mail
        sgMail.send(msg)
        currentUser.resetPasswordToken = ResetToken;
        currentUser.save();
      } catch (err) {
        console.log(err)
      }
    return res.status(200).json({msg:'email sent successfully'})
    }// console.log(ResetToken)
  }catch{

  }
  }


  //reset password
  async resetPassword(req: Request, res: Response):Promise<any> {
    const {newPass} = req.body;
    // find the user with the reset token and reset the password
    try{
      const currentUser:any = await User.findOne({resetPasswordToken: req.params.token })
      if(!currentUser){
        res.status(401).json({
        error: 'invalid token'
      })
    }else{
      const time = Number(currentUser?.updated_at);
      const d: Date = new Date();
      let currentTime: number = d.getTime();
      let validTime: number = currentTime - time;
      validTime = validTime / (1000 * 60 * 60);
      if (validTime < 1) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPass, salt);
          currentUser.password = hashedPassword;
          currentUser.resetPasswordToken = null;
          currentUser.save();
          return res.status(200).json({msg:'password set'})
      }
      else{

        return res.status(401).json({
          error: 'Token has expired'
        })
      }
    }
  } catch (err) {
    console.log(err)
  }
   
  }
  async verifyUser(req: Request, res: Response) {
    try {
      // compare the comfirmation code
      const currentUser = await User.findOne({
        confirmationCode: req.params.confirmationCode,
      });

      // if user found, change the status to active

      if (currentUser) {
        currentUser.status = "active";
        await this.save(currentUser);

        res.status(200).send({
          message: "Account Verified",
        });
      }
    } catch (error) {
      res.send(error);
    }
  }

  // Login user
  async loginUser(req: Request, res: Response) {
      const { useremail, password } = req.body;
  
      try {
        const currentUser = await User.findOne({ useremail: useremail });
        if (
          currentUser &&
          (await bcrypt.compare(password, currentUser.password))
        ) {
          //check to see if the user has verified his account
          if(currentUser.status === "Active"){
            res.status(200).json({
              id:currentUser.id,
              name: currentUser.username,
              email:currentUser.useremail,
              token : this.generateToken(currentUser.id,currentUser.role),
            });
          }
          else{
            return res.status(401).send({
              message: "Pending Account. Please Verify Your Email!",
            });
          }
        }
        else{
          res.status(400).send('credentials do not match')
        }
      } catch (error) {
        res.send(error);
      }
    }
  
    generateToken = (id: string,role:string) => {
      const key: string = process.env.JWT_KEY!;
      return jwt.sign({ id,role }, key, {
        expiresIn: "3d",
      });
    };
}



   

  

