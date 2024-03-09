import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from "path";
import {Request, Response, NextFunction} from 'express'

const envPath = path.join(__dirname, '../../.env');
dotenv.config({ path: envPath });

export const secretKey = process.env.SECRET_KEY;

export async function authenticate(req:Request, res:Response, next:NextFunction) {    
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).send(err);
            }

            if(typeof user =='string'){
                return res.status(403).send(err);
            }
            
            req.headers['id']=user.id;
            req.headers['role']=user.role;
            next();
        });
    } else {
        return res.status(401).send('Unauthorised');
    }
}