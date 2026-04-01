import { HttpException, HttpStatus } from '@nestjs/common';
import { validationStrings as S } from '../config/strings/parameters.validation';
import { ParameterRepository } from './parameters.repository';

export class ParameterValidation {
	static async validateCreate(repo: ParameterRepository, data: any) {
		const errors: Array<string> = [];

		const exists = await repo.findOneByCondition({ where: { code: data.code } });
		if (exists) errors.push(S.error.codeExists);

		if (errors.length) throw new HttpException({ message: S.result.create_failed, errors }, HttpStatus.BAD_REQUEST);
	}

	static async validateUpdate(repo: ParameterRepository, id: number, data: any) {
		const errors: Array<string> = [];

		if (!(await repo.findOneById(id))) errors.push(S.error.notFound);

		if (data.code) {
			const exists = await repo.findOneByCondition({ where: { code: data.code } });
			if (exists && exists.id !== id) errors.push(S.error.codeExists);
		}

		if (errors.length) throw new HttpException({ message: S.result.update_failed, errors }, HttpStatus.BAD_REQUEST);
	}

	static async validateDelete(repo: ParameterRepository, id: number) {
		if (!(await repo.findOneById(id))) throw new HttpException(S.error.notFound, HttpStatus.BAD_REQUEST);
	}
}
