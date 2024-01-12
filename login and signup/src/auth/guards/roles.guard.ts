/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../models/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  
  constructor(private reflector: Reflector){}

  
  canActivate(
    context: ExecutionContext,
  ): boolean{
    
    const requiredRoles=this.reflector.get<Role[]>(ROLES_KEY,
      context.getHandler(),)
    if (!requiredRoles){
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user= request.user;

    return user.role.some((role)=> requiredRoles.includes(role));
  }
}
