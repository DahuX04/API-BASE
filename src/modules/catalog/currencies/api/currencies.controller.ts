import { Body, Param } from '@nestjs/common';
import { BaseController } from 'src/commons/base.controller';
import {
	SwaggerCurrencyController,
	SwaggerCurrencyCreate,
	SwaggerCurrencyUpdate,
	SwaggerCurrencyDelete,
	SwaggerCurrencyGetAll,
	SwaggerCurrencyGetById,
	SwaggerCurrencyGetByFilters,
} from './docs/currencies.swagger';
import { CurrencyService } from './currencies.service';
import { CreateCurrencyDto, UpdateCurrencyDto, FilterCurrencyDto } from '../model/currencies.dtos';

@SwaggerCurrencyController()
export class CurrencyController extends BaseController<CurrencyService> {
	constructor(private readonly service: CurrencyService) {
		super(service);
	}

	@SwaggerCurrencyCreate()
	async create(@Body() dto: CreateCurrencyDto) {
		return await super.create(dto);
	}

	@SwaggerCurrencyUpdate()
	async update(@Param('id') id: number, @Body() dto: UpdateCurrencyDto) {
		return await super.update(id, dto);
	}

	@SwaggerCurrencyDelete()
	async delete(@Param('id') id: number) {
		return await super.delete(id);
	}

	@SwaggerCurrencyGetAll()
	async getAll() {
		return await super.getAll();
	}

	@SwaggerCurrencyGetById()
	async getById(@Param('id') id: number) {
		return await super.getById(id);
	}

	@SwaggerCurrencyGetByFilters()
	async getByFilters(@Body() dto: FilterCurrencyDto) {
		return await super.getByFilters(dto);
	}
}
