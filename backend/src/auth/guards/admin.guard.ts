import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthModel } from '../auth.model';

export class AdminGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: AuthModel }>();
		const user = request.user;

		if (user.role === 1) {
         throw new ForbiddenException('У вас нету прав!');
         return false;
      } else {
         return true;
      }

	}
}
