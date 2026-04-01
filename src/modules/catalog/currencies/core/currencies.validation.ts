import { HttpException, HttpStatus } from '@nestjs/common';
import { CurrencyRepository } from './currencies.repository';
import { currenciesValidationStrings } from '../config/strings/currencies.validation';

export class CurrencyValidation {
	static async validateCreate(repo: CurrencyRepository, data: any) {
		const errors: Array<string> = [];

		const exists = await repo.findOneByCondition({
			where: { code: data.code },
		});

		if (exists) errors.push(currenciesValidationStrings.error.codeExists);

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: currenciesValidationStrings.result.createFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateUpdate(repo: CurrencyRepository, id: number, data: any) {
		const errors: Array<string> = [];

		const entity = await repo.findOneById(id);
		if (!entity) errors.push(currenciesValidationStrings.error.notFound);

		if (data.code) {
			const exists = await repo.findOneByCondition({
				where: { code: data.code },
			});
			if (exists && exists.id !== id) errors.push(currenciesValidationStrings.error.codeExists);
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: currenciesValidationStrings.result.updateFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateDelete(repo: CurrencyRepository, id: number) {
		if (!(await repo.findOneById(id))) {
			throw new HttpException(
				{
					message: currenciesValidationStrings.result.deleteFailed,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
