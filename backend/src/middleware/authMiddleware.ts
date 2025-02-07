import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import client from '../db/connection';
import env from 'dotenv';

env.config();

const RENDER_JWT_SECRET = process.env.RENDER_JWT_SECRET || 'your-secret-key';

// Middleware for authentication and authorization
export const authenticateAndAuthorize = (requiredRoles: string[], allowSelf: boolean = false) => {
  
  
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   
    try {

      console.log('Inside the try block');
        const token = req.get('Authorization')?.replace('Bearer ', '');
        if (!token) {
            console.log("No token in this request")
          res.status(401).send({error:'Token missing'});
          return
        }
  
        // Decode JWT - No need to include "role" in the payload
        const decoded = jwt.verify(token!, RENDER_JWT_SECRET) as { user_id?: number };

        if (!decoded.user_id) {
          console.log("No user_id in this request")
          res.status(401).send({error:'Invalid token'});
          return
        }
  
        // Fetch user from PostgreSQL
        const result = await client.query('SELECT * FROM users WHERE id = $1', [decoded.user_id]);
        if (result.rows.length === 0) {
            res.status(401).send({error:'User not found'});
            return
        }
  
        const user = result.rows[0];
        
        
        if (requiredRoles.length > 0 && requiredRoles.includes("Admin")) {
            
        }

        // Role-based access control
        if (requiredRoles.length > 0 && !requiredRoles.includes(user.access_type)) {

          res.status(403).send({error:'Access denied'});
          return
        }
  
        if (allowSelf && user.id !== decoded.user_id) {
          res.status(403).send({error:'Access denied'});
          return
        }
  
        // Attach user to the request
        (req as any).user = user;
        // console.log('User set:', (req as any).user); // Add this line
        next();
      } catch (error) {
        console.error('Error occurred:', error);
        res.status(401).send('Authentication failed');
        return
      }
    };
  };
  