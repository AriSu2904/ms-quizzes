import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {

  authIssuer: string;

    constructor() {
        console.log(__dirname)
        const publicKeyPath = process.env.PUBLIC_KEY_PATH;
        const authIssuer = process.env.AUTH_ISSUER;

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: fs.readFileSync(publicKeyPath, 'utf8'),
            issuer: authIssuer,
            algorithms: ['RS256'],
        });

        this.authIssuer = authIssuer;
    }

    async validate(payload: any) {

        const decodedToken = jwt.decode(payload, { complete: true });

        if ((decodedToken as jwt.JwtPayload).payload.iss !== this.authIssuer) {
          throw new Error('Invalid issuer');
        }
    
        return { ...payload };
      }
}
