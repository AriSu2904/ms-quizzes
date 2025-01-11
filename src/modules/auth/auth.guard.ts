import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new HttpException('Unauthorized', 401);
    }

    try {
      const payload = this.auth.validate(token);
      request.user = payload;
      return true;
    } catch (e) {
      throw new HttpException('Unauthorized', 401);
    }
  }
}