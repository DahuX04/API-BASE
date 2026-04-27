import { HttpException, HttpStatus } from '@nestjs/common';
import { GradedCriteriaRepository } from './graded-criteria.repository';
import { gradedCriteriaValidationStrings } from '../config/strings/graded-criteria.validation';

export class GradedCriteriaValidation {
	static async validateCreate(repo: GradedCriteriaRepository, data: any) {
		const errors: Array<string> = [];

		const exists = await repo.findOneByCondition({
			where: {
				graded_criteria_id: data.graded_criteria_id,
				graded_outcome_id: data.graded_outcome_id,
			},
		});

		if (exists) errors.push(gradedCriteriaValidationStrings.error.gradedCriteriaExists);

		if (data.criteria_score < 0) {
			errors.push(gradedCriteriaValidationStrings.error.invalidCriteriaScore);
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: gradedCriteriaValidationStrings.result.createFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateUpdate(repo: GradedCriteriaRepository, id: number, data: any) {
		const errors: Array<string> = [];

		const entity = await repo.findOneById(id);
		if (!entity) errors.push(gradedCriteriaValidationStrings.error.notFound);

		if (data.graded_criteria_id && data.graded_outcome_id) {
			const exists = await repo.findOneByCondition({
				where: {
					graded_criteria_id: data.graded_criteria_id,
					graded_outcome_id: data.graded_outcome_id,
				},
			});

			if (exists && exists.id !== id) {
				errors.push(gradedCriteriaValidationStrings.error.gradedCriteriaExists);
			}
		}

		const criteriaScore = data.criteria_score ?? entity?.criteria_score;
		if (criteriaScore < 0) {
			errors.push(gradedCriteriaValidationStrings.error.invalidCriteriaScore);
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: gradedCriteriaValidationStrings.result.updateFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateDelete(repo: GradedCriteriaRepository, id: number) {
		if (!(await repo.findOneById(id))) {
			throw new HttpException(
				{
					message: gradedCriteriaValidationStrings.result.deleteFailed,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
