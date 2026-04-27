import { HttpException, HttpStatus } from '@nestjs/common';
import { RubricPerformanceLevelRepository } from './rubric-performance-levels.repository';
import { rubricPerformanceLevelsValidationStrings } from '../config/strings/rubric-performance-levels.validation';

export class RubricPerformanceLevelValidation {
	static async validateCreate(repo: RubricPerformanceLevelRepository, data: any) {
		const errors: Array<string> = [];

		const exists = await repo.findOneByCondition({
			where: {
				rubric_id: data.rubric_id,
				performance_level_id: data.performance_level_id,
			},
		});

		if (exists) errors.push(rubricPerformanceLevelsValidationStrings.error.relationExists);

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: rubricPerformanceLevelsValidationStrings.result.createFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateUpdate(repo: RubricPerformanceLevelRepository, id: number, data: any) {
		const errors: Array<string> = [];

		const entity = await repo.findOneById(id);
		if (!entity) errors.push(rubricPerformanceLevelsValidationStrings.error.notFound);

		if (data.rubric_id && data.performance_level_id) {
			const exists = await repo.findOneByCondition({
				where: {
					rubric_id: data.rubric_id,
					performance_level_id: data.performance_level_id,
				},
			});

			if (exists && exists.id !== id) {
				errors.push(rubricPerformanceLevelsValidationStrings.error.relationExists);
			}
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: rubricPerformanceLevelsValidationStrings.result.updateFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateDelete(repo: RubricPerformanceLevelRepository, id: number) {
		if (!(await repo.findOneById(id))) {
			throw new HttpException(
				{
					message: rubricPerformanceLevelsValidationStrings.result.deleteFailed,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
