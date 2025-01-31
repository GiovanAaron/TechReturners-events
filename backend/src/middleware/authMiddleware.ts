import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import client from '../db/connection';
import env from 'dotenv';

env.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware for authentication and authorization
export const authenticateAndAuthorize = (requiredRoles: string[]) => {
    
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        
        
        
        try {
        
      // Get the token from the Authorization header
      const token = req.get('Authorization')?.replace('Bearer ', '');

      console.log("coded token", token);
      if (!token) {
        res.status(401).send('Token missing');
        return;
      }

      // Verify the JWT token
      const verified = jwt.verify(token, JWT_SECRET);

      if (!verified) {
        res.status(401).send('Invalid token');
        return;
      }

      const decoded = jwt.decode(token);

      console.log("decoded token", decoded);
      if (!decoded || typeof decoded !== 'object') {
        res.status(401).send('Invalid token');
        return;
      }

      // Fetch user details from the database
      const result = await client.query('SELECT * FROM users WHERE id = $1', [decoded.user_id]);

      if (result.rows.length === 0) {
        res.status(401).send('User not found');
        return;
      }

      const user = result.rows[0];
      console.log(user);
      console.log("required roles", requiredRoles);
      // Check if the user's access type is in the required roles
      if (!requiredRoles.includes(user.access_type)) {
        console.log("required role not found");

        res.status(403).send('Access denied');
        return;
      }

      // Store user info in the request for further use
      (req as any).user = user; // TypeScript workaround for custom properties
      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      res.status(401).send('Authentication failed');
    }
  };
};
