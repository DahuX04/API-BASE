import { HttpException, HttpStatus } from '@nestjs/common';
import { CriteriaPerformanceLevelRepository } from './criteria-performance-levels.repository';
import { criteriaPerformanceLevelsValidationStrings } from '../config/strings/criteria-performance-levels.validation';

export class CriteriaPerformanceLevelValidation {
	static async validateCreate(repo: CriteriaPerformanceLevelRepository, data: any) {
		const errors: Array<string> = [];

		const exists = await repo.findOneByCondition({
			where: {
				outcome_criteria_id: data.outcome_criteria_id,
				performance_level_id: data.performance_level_id,
			},
		});

		if (exists) errors.push(criteriaPerformanceLevelsValidationStrings.error.relationExists);

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: criteriaPerformanceLevelsValidationStrings.result.createFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateUpdate(repo: CriteriaPerformanceLevelRepository, id: number, data: any) {
		const errors: Array<string> = [];

		const entity = await repo.findOneById(id);
		if (!entity) errors.push(criteriaPerformanceLevelsValidationStrings.error.notFound);

		if (data.outcome_criteria_id && data.performance_level_id) {
			const exists = await repo.findOneByCondition({
				where: {
					outcome_criteria_id: data.outcome_criteria_id,
					performance_level_id: data.performance_level_id,
				},
			});

			if (exists && exists.id !== id) {
				errors.push(criteriaPerformanceLevelsValidationStrings.error.relationExists);
			}
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: criteriaPerformanceLevelsValidationStrings.result.updateFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateDelete(repo: CriteriaPerformanceLevelRepository, id: number) {
		if (!(await repo.findOneById(id))) {
			throw new HttpException(
				{
					message: criteriaPerformanceLevelsValidationStrings.result.deleteFailed,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
