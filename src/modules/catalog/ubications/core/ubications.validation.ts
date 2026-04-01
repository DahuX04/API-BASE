import { HttpException, HttpStatus } from '@nestjs/common';
import { UbicationRepository } from './ubications.repository';
import { ubicationsValidationStrings } from '../config/strings/ubications.validation';

export class UbicationValidation {
	static async validateCreate(repo: UbicationRepository, data: any) {
		const errors: Array<string> = [];

		const exists = await repo.findOneByCondition({
			where: { code: data.code },
		});
		if (exists) errors.push(ubicationsValidationStrings.error.codeExists);

		if (data.root_ubication_id) {
			const parent = await repo.findOneById(data.root_ubication_id);
			if (!parent) errors.push(ubicationsValidationStrings.error.parentNotFound);
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: ubicationsValidationStrings.result.createFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateUpdate(repo: UbicationRepository, id: number, data: any) {
		const errors: Array<string> = [];

		const entity = await repo.findOneById(id);
		if (!entity) errors.push(ubicationsValidationStrings.error.notFound);

		if (data.root_ubication_id) {
			const parent = await repo.findOneById(data.root_ubication_id);
			if (!parent) errors.push(ubicationsValidationStrings.error.parentNotFound);
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: ubicationsValidationStrings.result.updateFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateDelete(repo: UbicationRepository, id: number) {
		if (!(await repo.findOneById(id))) {
			throw new HttpException(
				{
					message: ubicationsValidationStrings.result.deleteFailed,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
