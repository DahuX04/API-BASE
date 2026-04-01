import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* ENTITY */
import { CurrencyEntity } from './model/currencies.entity';

/* CORE */
import { CurrencyRepository } from './core/currencies.repository';

/* API */
import { CurrencyService } from './api/currencies.service';
import { CurrencyController } from './api/currencies.controller';

@Module({
	imports: [TypeOrmModule.forFeature([CurrencyEntity])],
	controllers: [CurrencyController],
	providers: [CurrencyService, CurrencyRepository],
	exports: [CurrencyService, CurrencyRepository],
})
export class CurrencyModule {}
