import simpleDS from '../typeorm.config';
import * as dotenv from 'dotenv';

dotenv.config();

async function run() {
	const tenant = process.argv[2];

	if (!tenant) {
		console.error('Debe indicar el schema: npm run seed:tenant encalma');
		process.exit(1);
	}

	const tenantDataSource = simpleDS;
	await tenantDataSource.initialize();

	console.log(`🌱 Setting schema: ${tenant}`);
	await tenantDataSource.query(`SET search_path TO "${tenant}"`);

	console.log(`🌱 Seeding schema: ${tenant}`);
	await tenantDataSource.query(`
		INSERT INTO type_groups (code, name, is_editable, is_active, created_at, updated_at)
			VALUES
			('TG001','Catalogos para selectores Web',false,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),

			('TG101','Tipo de documento de identidad',false,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
			('TG102','Tipo de sexo biológico',false,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)


			ON CONFLICT (code) DO NOTHING;
	`);
	let query = `
		INSERT INTO types (type_group_id, code, name, extra, is_editable, is_active, created_at)
			SELECT tg.id, v.code, v.name, v.extra, false, v.is_active, CURRENT_TIMESTAMP
			FROM type_groups tg
			JOIN (
				VALUES `;
	/*
	-- ================================
	-- TG001: WEB SELECTORS
	-- ================================
	*/
	query =
		query +
		`
				(true,'TG001','TG001-T009','Tipo de tiempo','["Minutos","Horas","Días","Semanas","Meses","Años"]'::jsonb),
				(true,'TG001','TG001-T010','Estado civil','["Soltero","Casado","Divorciado","Viudo","Conviviente","Separado"]'::jsonb),
			`;
	/*
	-- ================================
	-- TG101: DOCUMENTO IDENTIDAD
	-- ================================
	*/
	query =
		query +
		`
				(true,'TG101','TG101-T001','DNI','{"bg":"rgba(59,130,246,0.14)","text":"rgba(37,99,235,1)"}'::jsonb),
				(true,'TG101','TG101-T002','Pasaporte','{"bg":"rgba(16,185,129,0.14)","text":"rgba(5,150,105,1)"}'::jsonb),
				(true,'TG101','TG101-T003','Carné de extranjería','{"bg":"rgba(245,158,11,0.14)","text":"rgba(217,119,6,1)"}'::jsonb), `;
	/*
	-- ================================
	-- TG102: SEXO
	-- ================================
	*/
	query =
		query +
		`
				(true,'TG102','TG102-T001','Masculino','{"bg":"rgba(59,130,246,0.14)","text":"rgba(37,99,235,1)"}'::jsonb),
				(true,'TG102','TG102-T002','Femenino','{"bg":"rgba(236,72,153,0.14)","text":"rgba(190,24,93,1)"}'::jsonb),
				(true,'TG102','TG102-T003','Indeterminado','{"bg":"rgba(107,114,128,0.14)","text":"rgba(75,85,99,1)"}'::jsonb) `;

	query =
		query +
		`
			) AS v(is_active, group_code, code, name, extra)
			ON tg.code = v.group_code
			ON CONFLICT (code) DO NOTHING;
	`;

	await tenantDataSource.query(query);

	await tenantDataSource.destroy();

	console.log('✅ Seed completado.');
}

run().catch(console.error);
