import { HttpException, HttpStatus } from '@nestjs/common';
import { OutcomeCriteriaRepository } from './outcome-criterias.repository';
import { outcomeCriteriasValidationStrings } from '../config/strings/outcome-criterias.validation';

export class OutcomeCriteriaValidation {
	static async validateCreate(repo: OutcomeCriteriaRepository, data: any) {
		const errors: Array<string> = [];

		const exists = await repo.findOneByCondition({
			where: {
				outcome_rubric_id: data.outcome_rubric_id,
				name: data.name,
			},
		});

		if (exists) errors.push(outcomeCriteriasValidationStrings.error.outcomeCriteriaExists);

		if (data.max_value < 0) {
			errors.push(outcomeCriteriasValidationStrings.error.invalidMaxValue);
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: outcomeCriteriasValidationStrings.result.createFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateUpdate(repo: OutcomeCriteriaRepository, id: number, data: any) {
		const errors: Array<string> = [];

		const entity = await repo.findOneById(id);
		if (!entity) errors.push(outcomeCriteriasValidationStrings.error.notFound);

		if (data.outcome_rubric_id && data.name) {
			const exists = await repo.findOneByCondition({
				where: {
					outcome_rubric_id: data.outcome_rubric_id,
					name: data.name,
				},
			});

			if (exists && exists.id !== id) {
				errors.push(outcomeCriteriasValidationStrings.error.outcomeCriteriaExists);
			}
		}

		const maxValue = data.max_value ?? entity?.max_value;
		if (maxValue < 0) {
			errors.push(outcomeCriteriasValidationStrings.error.invalidMaxValue);
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: outcomeCriteriasValidationStrings.result.updateFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateDelete(repo: OutcomeCriteriaRepository, id: number) {
		if (!(await repo.findOneById(id))) {
			throw new HttpException(
				{
					message: outcomeCriteriasValidationStrings.result.deleteFailed,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
