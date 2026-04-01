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

		if (!schema || schema === 'base') schema = 'public';

		console.log('Resetting parameters for schema:', schema);

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		try {
			await queryRunner.startTransaction();
			await queryRunner.query(`SET search_path TO ${schema}`);

			await queryRunner.query(`
				TRUNCATE TABLE parameters RESTART IDENTITY CASCADE;
			`);
			/******************************************************************************************************/
			let prmACODE: any = 'base';
			if (schema === 'upc') prmACODE = 'upc';
			/******************************************************************************************************/
			let prmARUC: any = '20609261553';
			if (schema === 'upc') prmARUC = '20609123827';
			/******************************************************************************************************/
			let prmANAME: any = 'NEXHIS';
			if (schema === 'upc') prmANAME = 'ENCALMA';
			/******************************************************************************************************/
			let prmALNAME: any = 'NEXHIS - NEXT Health Information System';
			if (schema === 'upc') prmALNAME = 'ENCALMA Medical Services';
			/******************************************************************************************************/
			let prmADESCR: any = 'NEXHIS - Next Health Information System. Sistema de gestión clínica/hospitalaria.';
			if (schema === 'upc') prmADESCR = 'Centro médico especializado en medicina estética facial, corporal y masoterapia.';
			/******************************************************************************************************/
			let prmAADDR: any = 'Jr. Cristobal de Peralta Sur - Santiago de Surco';
			if (schema === 'upc') prmAADDR = 'Av. Micaela Bastidas 1601 - Villa el Salvador';
			/******************************************************************************************************/
			let prmACEMAIL: any = [
				{ email: 'contacto@base.com', name: 'contacto@base.com', description: 'Contacto', is_principal: true },
				{ email: 'contratos@base.com', name: 'contratos@base.com', description: 'Contratos', is_principal: false },
			];
			if (schema === 'upc') {
				prmACEMAIL = [
					{ email: 'contacto@upc.pe', name: 'contacto@upc.pe', description: 'Contacto', is_principal: true },
					{ email: 'contratos@upc.pe', name: 'contratos@upc.pe', description: 'Contratos', is_principal: false },
				];
			}
			/******************************************************************************************************/
			let prmACPHONE: any = [{ code: '51996336720', name: '(+51) 996336720', is_wa: true, is_principal: true }];
			if (schema === 'upc') {
				prmACPHONE = [{ code: '51987661336', name: '(+51) 987661336', is_wa: true, is_principal: true }];
			}
			/******************************************************************************************************/
			let prmASOCNET: any = [
				{ name: 'Facebook', url: 'https://facebook.com/base' },
				{ name: 'Instagram', url: 'https://instagram.com/base' },
				{ name: 'TikTok', url: 'https://tiktok.com/@base' },
				{ name: 'LinkedIn', url: 'https://linkedin.com/company/base' },
				{ name: 'YouTube', url: 'https://youtube.com/@base' },
			];
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
			let prmACOPRIG: any = '© 2026 NEXHIS – Next Health Information System. Software desarrollado y propiedad exclusiva de REDS GO S.A.C. Todos los derechos reservados.';
			if (schema === 'upc')
				prmACOPRIG =
					'© 2026 NEXHIS – Next Health Information System. Software desarrollado y propiedad exclusiva de REDS GO S.A.C. Uso autorizado bajo licencia para ENCALMA Medical Services. Todos los derechos reservados.';
			/******************************************************************************************************/
			/******************************************************************************************************/
			/******************************************************************************************************/
			let prmWBCRED: any = {
				apiVersion: 'v25.0',
				apiUrl: 'https://graph.facebook.com',
				phoneNumberId: '1065102363344835',
				businessAccountId: '900990362515512',
				accessToken:
					'EAAXHYZBYFV1gBQ4bZCWwZBhZBOzMngEwbZCeap6d4wZBwnmnU5KpNum35kQPjFI20ebtk63vNCu7zHi9PLkdrH2eZCQaNvIBXQQskHN4D9D0NDO2PoXk23feP8WeKKIjPxPsUz1VSZAqJGLQdSNHoes8L5OTQaQlKwixb8k6nyUTaB4mlFEnFzkDCO5MBO46Xk1vYwNZCiQrE74G0NL6IiAJZBG2FU6ArYB9j4zHSlbWCd',
				messagingProduct: 'whatsapp',
				defaultLanguage: 'es_PE',
			};
			if (schema === 'upc')
				prmWBCRED = {
					apiVersion: 'v25.0',
					apiUrl: 'https://graph.facebook.com',
					phoneNumberId: '1065102363344835',
					businessAccountId: '900990362515512',
					accessToken:
						'EAAXHYZBYFV1gBQ4bZCWwZBhZBOzMngEwbZCeap6d4wZBwnmnU5KpNum35kQPjFI20ebtk63vNCu7zHi9PLkdrH2eZCQaNvIBXQQskHN4D9D0NDO2PoXk23feP8WeKKIjPxPsUz1VSZAqJGLQdSNHoes8L5OTQaQlKwixb8k6nyUTaB4mlFEnFzkDCO5MBO46Xk1vYwNZCiQrE74G0NL6IiAJZBG2FU6ArYB9j4zHSlbWCd',
					messagingProduct: 'whatsapp',
					defaultLanguage: 'es_PE',
				};
			/******************************************************************************************************/
			let prmSMTPTLS: any = { host: 'pro.turbo-smtp.com', port: 2525, secure: false, auth: { user: 'd96e1e25afd1c38c1c2b', pass: '0VjX7Atzxn6BOcQPGYIC' }, from: 'NEXHIS <no-reply@base.com>' };
			if (schema === 'upc')
				prmSMTPTLS = { host: 'pro.turbo-smtp.com', port: 2525, secure: false, auth: { user: 'd96e1e25afd1c38c1c2b', pass: '0VjX7Atzxn6BOcQPGYIC' }, from: 'ENCALMA <contacto@upc.pe>' };
			/******************************************************************************************************/
			let prmMPCRED: any = {
				url: 'https://api.mercadopago.com/v1/payments',
				publicKey: 'APP_USR-c878f60c-5140-49c5-8324-e7e2d3826984', //'APP_USR-616cb8f8-9b3f-412b-b02c-c42c7462fc6f',
				accessToken: encrypt('APP_USR-7429700316359272-022312-eebfa154bea980284b5aa07ae4996026-453056956'), //encrypt('APP_USR-992243484812666-030409-05aa9a5cacb6247e79ad9e97610b0ee8-3222530360'),
				clientId: encrypt('7429700316359272'), //encrypt('992243484812666'),
				clientSecret: encrypt('gOp4ZeJCMBG56RDDdTKEkvEDNHXyD3CI'), // encrypt('GozJ7eMaBIcuV5Zu2DP6Md1ud6RsIdDb'),
			};
			if (schema === 'upc')
				prmMPCRED = {
					url: 'https://api.mercadopago.com/v1/payments',
					publicKey: 'APP_USR-c878f60c-5140-49c5-8324-e7e2d3826984', //'APP_USR-616cb8f8-9b3f-412b-b02c-c42c7462fc6f',
					accessToken: encrypt('APP_USR-7429700316359272-022312-eebfa154bea980284b5aa07ae4996026-453056956'), //encrypt('APP_USR-992243484812666-030409-05aa9a5cacb6247e79ad9e97610b0ee8-3222530360'),
					clientId: encrypt('7429700316359272'), //encrypt('992243484812666'),
					clientSecret: encrypt('gOp4ZeJCMBG56RDDdTKEkvEDNHXyD3CI'), // encrypt('GozJ7eMaBIcuV5Zu2DP6Md1ud6RsIdDb'),
				};
			/******************************************************************************************************/
			let prmAPPCOMP: any = ['upc'];
			if (schema === 'upc') prmAPPCOMP = [];
			/******************************************************************************************************/
			/******************************************************************************************************/
			/******************************************************************************************************/
			let prmAPRICES: any = [
				{ code: 'REGPRIC', name: 'Precio regular', currency: '$', amount: 30.0, include_taxes: false },
				{ code: 'CONPRIC', name: 'Precio por convenio', currency: '$', amount: 20.0, include_taxes: false },
			];
			if (schema === 'upc') prmAPRICES = [];
			/******************************************************************************************************/
			let prmABDOC: any = [];
			if (schema === 'upc') prmABDOC = [process.env.DB_TYPE_BOLETA];
			/******************************************************************************************************/
			let prmMXRSRCH: any = 1800;
			if (schema === 'upc') prmMXRSRCH = 1800;
			/******************************************************************************************************/
			let prmREMIND: any = {};
			if (schema === 'upc')
				prmREMIND = {
					tolerance_minutes: 10,
					reminders: [
						{
							minutes_before: 2.0 * 60,
							notification_code: process.env.DB_TYPE_NOTIFICATION_REMINDER,
						},
						{
							minutes_before: 1.0 * 60,
							notification_code: process.env.DB_TYPE_NOTIFICATION_REMINDER,
						},
						{
							minutes_before: 0.5 * 60,
							notification_code: process.env.DB_TYPE_NOTIFICATION_CONFIRMED,
						},
					],
				};
			/******************************************************************************************************/
			let query = `
				INSERT INTO parameters(is_active,is_json,is_encrypted,code,value,description,created_at,updated_at)
				VALUES 
					(true,false,false,'ACODE','${prmACODE}','Codigo de la empresa.',now(),now()),
					(true,false,false,'ARUC','${prmARUC}','RUC de la empresa.',now(),now()),
					(true,false,false,'ANAME','${prmANAME}','Nombre de la empresa.',now(),now()),
					(true,false,false,'ALNAME','${prmALNAME}','Nombre largo de la empresa.',now(),now()),
					(true,false,false,'ADESCR','${prmADESCR}','Descripción de la empresa.',now(),now()),
					(true,false,false,'AADDR','${prmAADDR}','Dirección de la empresa.',now(),now()),
					(true,true,false,'ACEMAIL','${JSON.stringify(prmACEMAIL)}','Correos de contacto de la empresa.',now(),now()),
					(true,true,false,'ACPHONE','${JSON.stringify(prmACPHONE)}','Telefonos de contacto de la empresa.',now(),now()),
					(true,true,false,'ASOCNET','${JSON.stringify(prmASOCNET)}','Redes sociales de la empresa.',now(),now()),
					(true,true,false,'AILOGO','${JSON.stringify(prmAILOGO)}','Imagenes para logos de la empresa.',now(),now()),
					(true,false,false,'ACOPRIG','${prmACOPRIG}','Copyright de la empresa',now(),now()),
					(true,true,false,'APPCOMP','${JSON.stringify(prmAPPCOMP)}','Listado de compañías registradas.',now(),now()),

					(true,true,true,'WBCRED','${encrypt(JSON.stringify(prmWBCRED))}','Credenciales WhatsApp Business',now(),now()),
					(true,true,true,'SMTPTLS','${encrypt(JSON.stringify(prmSMTPTLS))}','Credenciales SMTP',now(),now()),
					(true,true,false,'MPCRED','${JSON.stringify(prmMPCRED)}','Credenciales MercadoPago',now(),now()),

					(true,true,false,'APRICES','${JSON.stringify(prmAPRICES)}','Precios del sistema.',now(),now()),
					(true,true,false,'ABDOC','${JSON.stringify(prmABDOC)}','Listado de documentos de facturacion que admite el centro médico.',now(),now()),
					(true,false,false,'MXRSRCH','${prmMXRSRCH}','Máximo tiempo en minutos para busqueda de citas con recordatorios automáticos pendientes.',now(),now()),
					(true,true,false,'REMIND','${JSON.stringify(prmREMIND)}','Configuraciones de notificaciones automaticas de recordatorio de citas.',now(),now());
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
