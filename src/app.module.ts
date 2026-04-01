import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

/* =========================
 * AUTH
 * ========================= */
import { UserModule } from './modules/auth/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/protocols/jwt/guards/jwt-auth.guard';
import { JwtStrategy } from './modules/auth/protocols/jwt/strategies/jwt.strategy';
import { CurrencyModule } from './modules/catalog/currencies/currencies.module';
import { ParameterModule } from './modules/catalog/parameters/parameters.module';
import { TypeGroupModule } from './modules/catalog/type-groups/type-groups.module';
import { TypeModule } from './modules/catalog/types/types.module';
import { UbicationModule } from './modules/catalog/ubications/ubications.module';

@Module({
	imports: [
		/* CONFIG */
		ConfigModule.forRoot({
			isGlobal: true,
		}),

		PassportModule.register({ defaultStrategy: 'jwt' }),

		JwtModule.registerAsync({
			global: true,
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const secret = configService.get<string>('JWT_SECRET');
				return {
					secret,
					signOptions: { expiresIn: '2400h' },
				};
			},
		}),

		/* DATABASE */
		TypeOrmModule.forRootAsync({
			useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
				type: configService.get<string>('DB_TYPE') as any,
				host: configService.get<string>('DB_HOST'),
				port: configService.get<number>('DB_PORT'),
				username: configService.get<string>('DB_USER'),
				password: configService.get<string>('DB_PASSWORD'),
				database: configService.get<string>('DB_NAME'),
				ssl: {
					rejectUnauthorized: false,
				},
				synchronize: false,
				entities: [__dirname + '/**/*.entity{.ts,.js}'],
				timezone: 'Z',
				logging: ['error'],
				extra: {
					max: 10,
					idleTimeoutMillis: 30000,
					connectionTimeoutMillis: 5000,
					keepAlive: true,
				},
			}),
			inject: [ConfigService],
		}),

		/* MODULES */
		UserModule,
		CurrencyModule,
		ParameterModule,
		TypeGroupModule,
		TypeModule,
		UbicationModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		JwtStrategy,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
