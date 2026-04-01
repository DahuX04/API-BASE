import { Body, Param } from '@nestjs/common';
import { BaseController } from 'src/commons/base.controller';
import {
	SwaggerUbicationController,
	SwaggerUbicationCreate,
	SwaggerUbicationUpdate,
	SwaggerUbicationDelete,
	SwaggerUbicationGetAll,
	SwaggerUbicationGetById,
	SwaggerUbicationGetByFilters,
} from './docs/ubications.swagger';
import { UbicationService } from './ubications.service';
import { CreateUbicationDto, UpdateUbicationDto, FilterUbicationDto } from '../model/ubications.dtos';
import { Public } from 'src/modules/auth/protocols/jwt/decorators/public.decorator';

@SwaggerUbicationController()
export class UbicationController extends BaseController<UbicationService> {
	constructor(private readonly service: UbicationService) {
		super(service);
	}

	@SwaggerUbicationCreate()
	async create(@Body() dto: CreateUbicationDto) {
		return await super.create(dto);
	}

	@SwaggerUbicationUpdate()
	async update(@Param('id') id: number, @Body() dto: UpdateUbicationDto) {
		return await super.update(id, dto);
	}

	@SwaggerUbicationDelete()
	async delete(@Param('id') id: number) {
		return await super.delete(id);
	}

	@SwaggerUbicationGetAll()
	async getAll() {
		return await super.getAll();
	}

	@SwaggerUbicationGetById()
	async getById(@Param('id') id: number) {
		return await super.getById(id);
	}

	@Public()
	@SwaggerUbicationGetByFilters()
	async getByFilters(@Body() dto: FilterUbicationDto) {
		return await super.getByFilters(dto);
	}
}
