import { NextFunction, Response,Request } from 'express';
import * as jwt from 'jsonwebtoken';


async function verifyadmin(req: Request, res: Response, next: NextFunction) {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
        const token:string = req.headers.authorization.split(' ')[1]
        const decodedToken = <any>jwt.verify(token, process.env.JWT_KEY!);
        const role = decodedToken.role;
        if(role === 'admin'){
            next();
        }else{
            res.status(401).json({
                error:'Unauthorized!'
            })
        }
        }
        catch{
            res.status(401).json({
                error:'Invalid request!'
            })
        }
    }
}
    
export default verifyadmin;
