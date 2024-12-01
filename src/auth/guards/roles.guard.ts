import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../constants/role.constants';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.userRoles) {
      throw new ForbiddenException('No tienes permisos para acceder a este recurso');
    }

    const hasRole = () => user.userRoles.some((role: string) => requiredRoles.includes(role as ROLES));

    if (hasRole()) {
      return true;
    }

    throw new ForbiddenException(
      `Usuario necesita uno de estos roles: ${requiredRoles.join(', ')}`
    );
  }
}
