import { HttpException, HttpStatus } from '@nestjs/common';
import { OutcomeRubricRepository } from './outcome-rubrics.repository';
import { outcomeRubricsValidationStrings } from '../config/strings/outcome-rubrics.validation';

export class OutcomeRubricValidation {
	static async validateCreate(repo: OutcomeRubricRepository, data: any) {
		const errors: Array<string> = [];

		const exists = await repo.findOneByCondition({
			where: {
				rubric_id: data.rubric_id,
				outcome_id: data.outcome_id,
			},
		});

		if (exists) errors.push(outcomeRubricsValidationStrings.error.outcomeRubricExists);

		if (data.outcome_score < 0) {
			errors.push(outcomeRubricsValidationStrings.error.invalidOutcomeScore);
		}

		if (data.max_level < 0) {
			errors.push(outcomeRubricsValidationStrings.error.invalidMaxLevel);
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: outcomeRubricsValidationStrings.result.createFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateUpdate(repo: OutcomeRubricRepository, id: number, data: any) {
		const errors: Array<string> = [];

		const entity = await repo.findOneById(id);
		if (!entity) errors.push(outcomeRubricsValidationStrings.error.notFound);

		if (data.rubric_id && data.outcome_id) {
			const exists = await repo.findOneByCondition({
				where: {
					rubric_id: data.rubric_id,
					outcome_id: data.outcome_id,
				},
			});

			if (exists && exists.id !== id) {
				errors.push(outcomeRubricsValidationStrings.error.outcomeRubricExists);
			}
		}

		const outcomeScore = data.outcome_score ?? entity?.outcome_score;
		if (outcomeScore < 0) {
			errors.push(outcomeRubricsValidationStrings.error.invalidOutcomeScore);
		}

		const maxLevel = data.max_level ?? entity?.max_level;
		if (maxLevel < 0) {
			errors.push(outcomeRubricsValidationStrings.error.invalidMaxLevel);
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: outcomeRubricsValidationStrings.result.updateFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateDelete(repo: OutcomeRubricRepository, id: number) {
		if (!(await repo.findOneById(id))) {
			throw new HttpException(
				{
					message: outcomeRubricsValidationStrings.result.deleteFailed,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
