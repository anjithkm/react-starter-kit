import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Optionally, you can specify the exact details for the user
    }
  }
}