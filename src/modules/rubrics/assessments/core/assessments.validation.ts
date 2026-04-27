import { HttpException, HttpStatus } from '@nestjs/common';
import { AssessmentRepository } from './assessments.repository';
import { assessmentsValidationStrings } from '../config/strings/assessments.validation';

export class AssessmentValidation {
	static async validateCreate(repo: AssessmentRepository, data: any) {
		const errors: Array<string> = [];

		const exists = await repo.findOneByCondition({
			where: {
				study_plan_course_id: data.study_plan_course_id,
				type_id: data.type_id,
			},
		});

		if (exists) errors.push(assessmentsValidationStrings.error.assessmentExists);

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: assessmentsValidationStrings.result.createFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateUpdate(repo: AssessmentRepository, id: number, data: any) {
		const errors: Array<string> = [];

		const entity = await repo.findOneById(id);
		if (!entity) errors.push(assessmentsValidationStrings.error.notFound);

		if (data.study_plan_course_id && data.type_id) {
			const exists = await repo.findOneByCondition({
				where: {
					study_plan_course_id: data.study_plan_course_id,
					type_id: data.type_id,
				},
			});

			if (exists && exists.id !== id) {
				errors.push(assessmentsValidationStrings.error.assessmentExists);
			}
		}

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: assessmentsValidationStrings.result.updateFailed,
					errors,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	static async validateDelete(repo: AssessmentRepository, id: number) {
		if (!(await repo.findOneById(id))) {
			throw new HttpException(
				{
					message: assessmentsValidationStrings.result.deleteFailed,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
