import { Body, Param } from '@nestjs/common';
import { BaseController } from 'src/commons/base.controller';
import {
	SwaggerVerificationNoteController,
	SwaggerVerificationNoteCreate,
	SwaggerVerificationNoteUpdate,
	SwaggerVerificationNoteDelete,
	SwaggerVerificationNoteGetAll,
	SwaggerVerificationNoteGetById,
	SwaggerVerificationNoteGetByFilters,
} from './docs/verification-notes.swagger';
import { VerificationNoteService } from './verification-notes.service';
import { CreateVerificationNoteDto, UpdateVerificationNoteDto, FilterVerificationNoteDto } from '../model/verification-notes.dtos';

@SwaggerVerificationNoteController()
export class VerificationNoteController extends BaseController<VerificationNoteService> {
	constructor(private readonly service: VerificationNoteService) {
		super(service);
	}

	@SwaggerVerificationNoteCreate()
	async create(@Body() dto: CreateVerificationNoteDto) {
		return await super.create(dto);
	}

	@SwaggerVerificationNoteUpdate()
	async update(@Param('id') id: number, @Body() dto: UpdateVerificationNoteDto) {
		return await super.update(id, dto);
	}

	@SwaggerVerificationNoteDelete()
	async delete(@Param('id') id: number) {
		return await super.delete(id);
	}

	@SwaggerVerificationNoteGetAll()
	async getAll() {
		return await super.getAll();
	}

	@SwaggerVerificationNoteGetById()
	async getById(@Param('id') id: number) {
		return await super.getById(id);
	}

	@SwaggerVerificationNoteGetByFilters()
	async getByFilters(@Body() dto: FilterVerificationNoteDto) {
		return await super.getByFilters(dto);
	}
}
