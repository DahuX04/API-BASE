import { HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { usersValidationStrings } from '../config/strings/users.validation';

export class UserValidation {
	static async validateCreate(repo: UserRepository, data: any) {
		const errors: Array<string> = [];

		const documentCodeExists = await repo.findOneByCondition({
			where: { document_code: data.document_code },
		});

		if (documentCodeExists) errors.push(usersValidationStrings.error.documentCodeExists);

		const emailExists = await repo.findOneByCondition({
			where: { email: data.email },
		});

		if (emailExists) errors.push(usersValidationStrings.error.emailExists);

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: usersValidationStrings.result.createFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateUpdate(repo: UserRepository, id: number, data: any) {
		const errors: Array<string> = [];

		const entity = await repo.findOneById(id);
		if (!entity) errors.push(usersValidationStrings.error.notFound);

		if (data.document_code) {
			const documentCodeExists = await repo.findOneByCondition({
				where: { document_code: data.document_code },
			});

			if (documentCodeExists && documentCodeExists.id !== id) {
				errors.push(usersValidationStrings.error.documentCodeExists);
			}
		}

		if (data.email) {
			const emailExists = await repo.findOneByCondition({
				where: { email: data.email },
			});

			if (emailExists && emailExists.id !== id) {
				errors.push(usersValidationStrings.error.emailExists);
			}
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: usersValidationStrings.result.updateFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateDelete(repo: UserRepository, id: number) {
		if (!(await repo.findOneById(id))) {
			throw new HttpException(
				{
					message: usersValidationStrings.result.deleteFailed,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
