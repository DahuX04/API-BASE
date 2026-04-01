import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* ENTITIES */
import { TypeEntity } from './model/types.entity';

/* CORE */
import { TypeRepository } from './core/types.repository';

/* API */
import { TypeService } from './api/types.service';
import { TypeController } from './api/types.controller';
import { TypeGroupModule } from '../type-groups/type-groups.module';

@Module({
	imports: [TypeOrmModule.forFeature([TypeEntity]), TypeGroupModule],
	controllers: [TypeController],
	providers: [TypeService, TypeRepository],
	exports: [TypeService, TypeRepository],
})
export class TypeModule {}
