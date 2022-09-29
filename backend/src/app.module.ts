import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './config/mongo.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		TodoModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
