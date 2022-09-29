import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TypeRole } from '../auth.interface';
import { AdminGuard } from '../guards/admin.guard';

export const Auth = (role: TypeRole = 'user') =>
	applyDecorators(
		role === 'admin'
			? UseGuards(AuthGuard('jwt'), AdminGuard)
			: UseGuards(AuthGuard('jwt'))
	);
