import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* ENTITY */
import { UbicationEntity } from './model/ubications.entity';

/* CORE */
import { UbicationRepository } from './core/ubications.repository';

/* API */
import { UbicationService } from './api/ubications.service';
import { UbicationController } from './api/ubications.controller';

@Module({
	imports: [TypeOrmModule.forFeature([UbicationEntity])],
	controllers: [UbicationController],
	providers: [UbicationService, UbicationRepository],
	exports: [UbicationService, UbicationRepository],
})
export class UbicationModule {}
