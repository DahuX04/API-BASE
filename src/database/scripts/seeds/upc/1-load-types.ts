import simpleDS from '../typeorm.config';
import * as dotenv from 'dotenv';

dotenv.config();

async function run() {
	const tenant = process.argv[2];

	if (!tenant) {
		console.error('Debe indicar el schema: npm run seed:tenant upc');
		process.exit(1);
	}

	const tenantDataSource = simpleDS;
	await tenantDataSource.initialize();

	console.log(`🌱 Setting schema: ${tenant}`);
	await tenantDataSource.query(`SET search_path TO "${tenant}"`);

	console.log(`🌱 Seeding schema: ${tenant}`);
	
	// Insert type groups with description
	await tenantDataSource.query(`
		INSERT INTO type_groups (code, name, description, is_editable, is_active, created_at, updated_at)
			VALUES
			('TG001','Catalogos para selectores Web','Tipos de datos para selectores en la interfaz web',false,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
			('TG101','Tipo de documento de identidad','Documentos de identificación válidos',false,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
			('TG102','Tipo de sexo biológico','Clasificación del sexo biológico',false,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
			('TG103','Modalidad de enseñanza','Formas de impartir la enseñanza',false,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
			('TG104','Tipo de evaluación','Métodos de evaluación académica',false,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP),
			('TG105','Estado de estudiante','Estados posibles de un estudiante',false,true,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert types with description
	let query = `
		INSERT INTO types (type_group_id, code, name, description, extra, is_editable, is_active, created_at)
			SELECT tg.id, v.code, v.name, v.description, v.extra, false, v.is_active, CURRENT_TIMESTAMP
			FROM type_groups tg
			JOIN (
				VALUES `;
	
	query = query + `
				(true,'TG001','TG001-T009','Tipo de tiempo','Unidades de tiempo (minutos, horas, días, etc)','["Minutos","Horas","Días","Semanas","Meses","Años"]'::jsonb),
				(true,'TG001','TG001-T010','Estado civil','Estados civiles de una persona','["Soltero","Casado","Divorciado","Viudo","Conviviente","Separado"]'::jsonb),
				(true,'TG101','TG101-T001','DNI','Documento Nacional de Identidad','{"bg":"rgba(59,130,246,0.14)","text":"rgba(37,99,235,1)"}'::jsonb),
				(true,'TG101','TG101-T002','Pasaporte','Pasaporte Internacional','{"bg":"rgba(16,185,129,0.14)","text":"rgba(5,150,105,1)"}'::jsonb),
				(true,'TG101','TG101-T003','Carné de extranjería','Carné de Extranjería','{"bg":"rgba(245,158,11,0.14)","text":"rgba(217,119,6,1)"}'::jsonb),
				(true,'TG102','TG102-T001','Masculino','Sexo Masculino','{"bg":"rgba(59,130,246,0.14)","text":"rgba(37,99,235,1)"}'::jsonb),
				(true,'TG102','TG102-T002','Femenino','Sexo Femenino','{"bg":"rgba(236,72,153,0.14)","text":"rgba(190,24,93,1)"}'::jsonb),
				(true,'TG102','TG102-T003','Indeterminado','Sexo Indeterminado','{"bg":"rgba(107,114,128,0.14)","text":"rgba(75,85,99,1)"}'::jsonb),
				(true,'TG103','TG103-T001','Presencial','Educación Presencial','{"mode":"in-person"}'::jsonb),
				(true,'TG103','TG103-T002','Virtual','Educación Virtual','{"mode":"online"}'::jsonb),
				(true,'TG103','TG103-T003','Híbrida','Educación Híbrida','{"mode":"hybrid"}'::jsonb),
				(true,'TG104','TG104-T001','Examen','Examen Escrito','{"type":"written"}'::jsonb),
				(true,'TG104','TG104-T002','Proyecto','Evaluación por Proyecto','{"type":"project"}'::jsonb),
				(true,'TG104','TG104-T003','Participación','Evaluación por Participación','{"type":"participation"}'::jsonb),
				(true,'TG105','TG105-T001','Activo','Estudiante Activo','{"status":"active"}'::jsonb),
				(true,'TG105','TG105-T002','Inactivo','Estudiante Inactivo','{"status":"inactive"}'::jsonb),
				(true,'TG105','TG105-T003','Egresado','Estudiante Egresado','{"status":"graduated"}'::jsonb)
			) AS v(is_active, group_code, code, name, description, extra)
			ON tg.code = v.group_code
			ON CONFLICT (code) DO NOTHING;
	`;

	await tenantDataSource.query(query);

	await tenantDataSource.destroy();

	console.log('✅ Seed completado.');
}

run().catch(console.error);
