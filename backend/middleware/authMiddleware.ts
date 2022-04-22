import { NextFunction, Response,Request } from 'express';
import * as jwt from 'jsonwebtoken';
import {User} from '../entities/User'


async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
        //get the token
        const token:string = req.headers.authorization.split(' ')[1]
        //verify the token
        const decodedToken = <any>jwt.verify(token, process.env.JWT_KEY!);
        const id = decodedToken.id;
        req.user = await User.findOne({id:id})
        // console.log(req.user)
        next();
        }
        catch{
            res.status(401).json({
                error:'Invalid request!'
            })
        }
        // if(!token){
        //     res.status(401).json({
        //         error:'Not authorized!'
        //     })
        // }
        
    }
}
    
export default authMiddleware;
