import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
