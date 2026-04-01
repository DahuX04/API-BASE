import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeRepository } from './types.repository';
import { typesValidationStrings } from '../config/strings/types.validation';

/* REPOSITORIO EXTERNO */
import { TypeGroupService } from '../../type-groups/api/type-groups.service';

export class TypeValidation {
	static async validateCreate(repo: TypeRepository, typeGroupService: TypeGroupService, data: any) {
		const errors: Array<string> = [];

		const exists = await repo.findOneByCondition({
			where: { code: data.code },
		});
		if (exists) errors.push(typesValidationStrings.error.codeExists);

		const typeGroup = await typeGroupService.getById(data.type_group_id);
		if (!typeGroup) errors.push(typesValidationStrings.error.typeGroupNotFound);

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: typesValidationStrings.result.createFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateUpdate(repo: TypeRepository, typeGroupService: TypeGroupService, id: number, data: any) {
		const errors: Array<string> = [];

		const entity = await repo.findOneById(id);
		if (!entity) errors.push(typesValidationStrings.error.notFound);

		if (data.code) {
			const exists = await repo.findOneByCondition({
				where: { code: data.code },
			});
			if (exists && exists.id !== id) errors.push(typesValidationStrings.error.codeExists);
		}

		if (data.type_group_id) {
			const typeGroup = await typeGroupService.getById(data.type_group_id);
			if (!typeGroup) errors.push(typesValidationStrings.error.typeGroupNotFound);
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: typesValidationStrings.result.updateFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateDelete(repo: TypeRepository, id: number) {
		if (!(await repo.findOneById(id))) {
			throw new HttpException(
				{
					message: typesValidationStrings.result.deleteFailed,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
