import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getJwtConfig = async (
	configService: ConfigService
): Promise<JwtModuleOptions> => ({
	secret: 'asd32jnmjiesajdi213jdfg@@1212!!38**&^!sadl,dflpwe'
});
