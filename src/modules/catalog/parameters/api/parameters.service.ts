import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/base.service';
import { ParameterRepository } from '../core/parameters.repository';
import { ParameterValidation } from '../core/parameters.validation';
import { CreateParameterDto, UpdateParameterDto } from '../model/parameters.dtos';
import { DataSource, EntityManager } from 'typeorm';

import { encrypt } from 'src/libs/encrypt';
import { getParsedParameter } from 'src/libs/parameter.functions';

@Injectable()
export class ParameterService extends BaseService<ParameterRepository> {
	constructor(
		protected readonly repository: ParameterRepository,
		protected readonly dataSource: DataSource,
	) {
		super(repository);
	}

	async getParameter(code: string): Promise<string> {
		const param = await this.getByCode(code);

		return getParsedParameter(param);
	}

	async create(dto: CreateParameterDto, manager?: EntityManager) {
		await ParameterValidation.validateCreate(this.repository, dto);
		return await super.create(dto, manager);
	}

	async update(id: number, dto: UpdateParameterDto, manager?: EntityManager) {
		await ParameterValidation.validateUpdate(this.repository, id, dto);
		return await super.update(id, dto, manager);
	}

	async delete(id: number, manager?: EntityManager) {
		await ParameterValidation.validateDelete(this.repository, id);
		return await super.delete(id, manager);
	}

	async resetParameters(schema: string) {
		if (process.env.NODE_ENV === 'production') throw new BadRequestException('No permitido en producción');

		console.log('Resetting parameters');

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		try {
			await queryRunner.startTransaction();
			await queryRunner.query(`SET search_path TO ${schema}`);

			await queryRunner.query(`
				TRUNCATE TABLE parameters RESTART IDENTITY CASCADE;
			`);
			/******************************************************************************************************/
			let prmACODE: any = 'schema';
			if (schema === 'upc') prmACODE = 'schema';
			/******************************************************************************************************/
			let prmASOCNET: any = [
				{ name: 'Facebook', url: 'https://facebook.com/base' },
				{ name: 'Instagram', url: 'https://instagram.com/base' },
				{ name: 'TikTok', url: 'https://tiktok.com/@base' },
				{ name: 'LinkedIn', url: 'https://linkedin.com/company/base' },
				{ name: 'YouTube', url: 'https://youtube.com/@base' },
			];
			/******************************************************************************************************/
			if (schema === 'upc')
				prmASOCNET = [
					{ name: 'Facebook', url: 'https://facebook.com/upc' },
					{ name: 'Instagram', url: 'https://instagram.com/upc' },
					{ name: 'TikTok', url: 'https://tiktok.com/@upc' },
					{ name: 'LinkedIn', url: 'https://linkedin.com/company/upc' },
					{ name: 'YouTube', url: 'https://youtube.com/@upc' },
				];
			/******************************************************************************************************/
			let prmAILOGO: any = [
				{ name: 'logo-email', url: '/images/base/logo-email.png' },
				{ name: 'isotipo', url: '/images/base/isotipo.svg' },
				{ name: 'logotipo', url: '/images/base/logotipo.svg' },
				{ name: 'imagotipo-horizontal', url: '/images/base/imagotipo-horizontal.svg' },
				{ name: 'imagotipo-vertical.svg', url: '/images/base/imagotipo-vertical.svg' },
			];
			if (schema === 'upc')
				prmAILOGO = [
					{ name: 'logo-email', url: '/images/upc/logo-email.png' },
					{ name: 'isotipo', url: '/images/upc/isotipo.svg' },
					{ name: 'logotipo', url: '/images/upc/logotipo.svg' },
					{ name: 'imagotipo-horizontal', url: '/images/upc/imagotipo-horizontal.svg' },
					{ name: 'imagotipo-vertical.svg', url: '/images/upc/imagotipo-vertical.svg' },
				];
			/******************************************************************************************************/
			/******************************************************************************************************/
			/******************************************************************************************************/
			let prmSMTPTLS: any = { host: 'pro.turbo-smtp.com', port: 2525, secure: false, auth: { user: 'd96e1e25afd1c38c1c2b', pass: '0VjX7Atzxn6BOcQPGYIC' }, from: 'NEXHIS <no-reply@base.com>' };
			if (schema === 'upc')
				prmSMTPTLS = { host: 'pro.turbo-smtp.com', port: 2525, secure: false, auth: { user: 'd96e1e25afd1c38c1c2b', pass: '0VjX7Atzxn6BOcQPGYIC' }, from: 'ENCALMA <contacto@upc.pe>' };
			/******************************************************************************************************/
			/******************************************************************************************************/
			/******************************************************************************************************/
			let query = `
				INSERT INTO parameters(is_active,is_json,is_encrypted,code,value,description,created_at,updated_at)
				VALUES 
					(true,false,false,'ACODE','${prmACODE}','Codigo de la empresa.',now(),now()),
					(true,true,false,'ASOCNET','${JSON.stringify(prmASOCNET)}','Redes sociales de la empresa.',now(),now()),
					(true,true,false,'AILOGO','${JSON.stringify(prmAILOGO)}','Imagenes para logos de la empresa.',now(),now()),
					(true,true,true,'SMTPTLS','${encrypt(JSON.stringify(prmSMTPTLS))}','Credenciales SMTP',now(),now());
				`;

			await queryRunner.manager.query(query);
			await queryRunner.commitTransaction();
			return { message: 'Parameters reseteados correctamente' };
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw error;
		} finally {
			await queryRunner.release();
		}
	}
}
