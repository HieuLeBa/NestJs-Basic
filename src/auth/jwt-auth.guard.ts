import { ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorator/customize';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
      }
      canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
        if (isPublic) {
          return true;
        }
        return super.canActivate(context);
      }

      handleRequest(err, user, info, context: ExecutionContext) {
        const request: Request = context.switchToHttp().getRequest()

        if (err || !user) {
          throw err || new UnauthorizedException("Token không hợp lệ hoặc không có Beerar token");
        }

        const targetMethod = request.method;
        const targetEndpoint = request.route?.path;

        const permissions = user?.permissions ?? []
        const isExist = permissions.find(permission =>
          targetMethod === permission.method && targetEndpoint === permission.apiPath
        )
        // You can throw an exception based on either "info" or "err" arguments

        if (!isExist) {
          throw err || new ForbiddenException("Bạn không có quyền truy cập Endpoint ");
        }
        return user;
    }
}
