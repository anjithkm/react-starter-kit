import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { response } from '@/utils/response.utils';

export const authenticate =(...roles:string[]) => (req: Request, res: Response, next: NextFunction) => {

  const token = req.header('Authorization')?.replace('Bearer', '').trim() || '';

  if (!token) {

    response(res).unauthorized();

  } else {
      try {

        req.user = jwt.verify(
          token,
          process.env.JWT_SECRET as string,
        ) as jwt.JwtPayload;  // Add token info to request


        if (!roles.includes(req?.user?.role)) {

          response(res).unauthorized();

        }else{

          next();

        }
        
      } catch (err) {

        response(res).unauthorized();

      }
  }

};


export default authenticate;

