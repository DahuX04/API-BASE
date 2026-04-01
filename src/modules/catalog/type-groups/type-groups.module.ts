import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/* ENTITY */
import { TypeGroupEntity } from './model/type-groups.entity';

/* CORE */
import { TypeGroupRepository } from './core/type-groups.repository';

/* API */
import { TypeGroupService } from './api/type-groups.service';
import { TypeGroupController } from './api/type-groups.controller';

@Module({
	imports: [TypeOrmModule.forFeature([TypeGroupEntity])],
	controllers: [TypeGroupController],
	providers: [TypeGroupService, TypeGroupRepository],
	exports: [TypeGroupService, TypeGroupRepository],
})
export class TypeGroupModule {}
