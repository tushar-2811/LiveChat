import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = async(user:any) => {
      const token =  jwt.sign({user} , JWT_SECRET , {
        expiresIn : '15d'
      } )

      return token;
}
