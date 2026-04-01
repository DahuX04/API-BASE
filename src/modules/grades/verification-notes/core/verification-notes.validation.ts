import { HttpException, HttpStatus } from '@nestjs/common';
import { VerificationNoteRepository } from './verification-notes.repository';
import { verificationNotesValidationStrings } from '../config/strings/verification-notes.validation';

export class VerificationNoteValidation {
	static async validateCreate(repo: VerificationNoteRepository, data: any) {
		const errors: Array<string> = [];

		const exists = await repo.findOneByCondition({
			where: { code: data.code },
		});

		if (exists) errors.push(verificationNotesValidationStrings.error.codeExists);

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: verificationNotesValidationStrings.result.createFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateUpdate(repo: VerificationNoteRepository, id: number, data: any) {
		const errors: Array<string> = [];

		const entity = await repo.findOneById(id);
		if (!entity) errors.push(verificationNotesValidationStrings.error.notFound);

		if (data.code) {
			const exists = await repo.findOneByCondition({
				where: { code: data.code },
			});
			if (exists && exists.id !== id) errors.push(verificationNotesValidationStrings.error.codeExists);
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: verificationNotesValidationStrings.result.updateFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateDelete(repo: VerificationNoteRepository, id: number) {
		if (!(await repo.findOneById(id))) {
			throw new HttpException(
				{
					message: verificationNotesValidationStrings.result.deleteFailed,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
