import { HttpException, HttpStatus } from '@nestjs/common';
import { GradedOutcomeRepository } from './graded-outcomes.repository';
import { gradedOutcomesValidationStrings } from '../config/strings/graded-outcomes.validation';

export class GradedOutcomeValidation {
	static async validateCreate(repo: GradedOutcomeRepository, data: any) {
		const errors: Array<string> = [];

		const exists = await repo.findOneByCondition({
			where: {
				graded_rubric_id: data.graded_rubric_id,
			},
		});

		if (exists) errors.push(gradedOutcomesValidationStrings.error.gradedOutcomeExists);

		if (data.outcome_score < 0) {
			errors.push(gradedOutcomesValidationStrings.error.invalidOutcomeScore);
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: gradedOutcomesValidationStrings.result.createFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateUpdate(repo: GradedOutcomeRepository, id: number, data: any) {
		const errors: Array<string> = [];

		const entity = await repo.findOneById(id);
		if (!entity) errors.push(gradedOutcomesValidationStrings.error.notFound);

		if (data.graded_rubric_id) {
			const exists = await repo.findOneByCondition({
				where: {
					graded_rubric_id: data.graded_rubric_id,
				},
			});

			if (exists && exists.id !== id) {
				errors.push(gradedOutcomesValidationStrings.error.gradedOutcomeExists);
			}
		}

		const outcomeScore = data.outcome_score ?? entity?.outcome_score;
		if (outcomeScore < 0) {
			errors.push(gradedOutcomesValidationStrings.error.invalidOutcomeScore);
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: gradedOutcomesValidationStrings.result.updateFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateDelete(repo: GradedOutcomeRepository, id: number) {
		if (!(await repo.findOneById(id))) {
			throw new HttpException(
				{
					message: gradedOutcomesValidationStrings.result.deleteFailed,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
