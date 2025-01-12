import* as jwt from 'jsonwebtoken';

export function extractUserId(authToken: string): any {
    const token = authToken.split(' ')[1];
    const decodedToken = jwt.decode(token, { complete: true });
    
    const userId = (decodedToken as jwt.JwtPayload).payload.sub;

    return userId;
}