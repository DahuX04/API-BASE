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

	console.log(`🌱 Seeding organization module: ${tenant}`);
	
	// Insert campuses
	await tenantDataSource.query(`
		INSERT INTO campuses (code, name, is_active, created_at, updated_at)
			VALUES
			('CAMPUS_LIMA_NORTE', 'Campus Lima Norte', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('CAMPUS_LIMA_ESTE', 'Campus Lima Este', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('CAMPUS_AREQUIPA', 'Campus Arequipa', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('CAMPUS_ICA', 'Campus Ica', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('CAMPUS_CUSCO', 'Campus Cusco', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert faculties
	await tenantDataSource.query(`
		INSERT INTO faculties (code, name, is_active, created_at, updated_at)
			VALUES
			('FAC_INGENIERIA', 'Facultad de Ingeniería', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('FAC_NEGOCIOS', 'Facultad de Negocios', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('FAC_COMUNICACION', 'Facultad de Comunicación', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('FAC_DERECHO', 'Facultad de Derecho', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('FAC_HUMANIDADES', 'Facultad de Humanidades', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('FAC_SALUD', 'Facultad de Salud', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('FAC_ARQUITECTURA', 'Facultad de Arquitectura', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert schools (require faculty_id)
	await tenantDataSource.query(`
		INSERT INTO schools (faculty_id, code, name, is_active, created_at, updated_at)
			SELECT f.id, v.code, v.name, v.is_active, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM faculties f
			JOIN (
				VALUES
				('FAC_INGENIERIA', 'SCHOOL_SOFT_ENG', 'Escuela de Ingeniería de Software', true),
				('FAC_INGENIERIA', 'SCHOOL_CIVI_ENG', 'Escuela de Ingeniería Civil', true),
				('FAC_INGENIERIA', 'SCHOOL_INDU_ENG', 'Escuela de Ingeniería Industrial', true),
				('FAC_NEGOCIOS', 'SCHOOL_ADMIN', 'Escuela de Administración', true),
				('FAC_NEGOCIOS', 'SCHOOL_MARKETING', 'Escuela de Marketing', true),
				('FAC_NEGOCIOS', 'SCHOOL_CONTABILIDAD', 'Escuela de Contabilidad', true),
				('FAC_COMUNICACION', 'SCHOOL_PERIODISMO', 'Escuela de Periodismo', true),
				('FAC_COMUNICACION', 'SCHOOL_AUDIOVISUAL', 'Escuela de Audiovisual', true),
				('FAC_DERECHO', 'SCHOOL_DERECHO_GENERAL', 'Escuela de Derecho', true),
				('FAC_SALUD', 'SCHOOL_ENFERMERIA', 'Escuela de Enfermería', true),
				('FAC_ARQUITECTURA', 'SCHOOL_ARQUITECTURA', 'Escuela de Arquitectura', true)
			) AS v(fac_code, code, name, is_active)
			ON f.code = v.fac_code
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert chart levels
	await tenantDataSource.query(`
		INSERT INTO chart_levels (code, name, level, is_active, created_at, updated_at)
			VALUES
			('LEVEL_RECTOR', 'Rectorado', 0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('LEVEL_VICERRECTOR', 'Vicerrectorado', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('LEVEL_FACULTY', 'Facultad', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('LEVEL_SCHOOL', 'Escuela', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('LEVEL_DEPARTMENT', 'Departamento', 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert organizational charts (basic structure)
	await tenantDataSource.query(`
		INSERT INTO charts (code, name, level_id, is_active, created_at, updated_at)
			SELECT v.code, v.name, cl.id, v.is_active, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM chart_levels cl
			JOIN (
				VALUES
				('LEVEL_RECTOR', 'CHART_RECTOR', 'Rectoría', true),
				('LEVEL_VICERRECTOR', 'CHART_VRACA', 'Vicerrectoría Académica', true),
				('LEVEL_VICERRECTOR', 'CHART_VRADM', 'Vicerrectoría Administrativa', true),
				('LEVEL_FACULTY', 'CHART_FAC_ING', 'Facultad de Ingeniería', true),
				('LEVEL_FACULTY', 'CHART_FAC_NEG', 'Facultad de Negocios', true),
				('LEVEL_SCHOOL', 'CHART_SCHOOL_SOFT', 'Escuela de Ingeniería de Software', true),
				('LEVEL_SCHOOL', 'CHART_SCHOOL_ADMI', 'Escuela de Administración', true)
			) AS v(level_code, code, name, is_active)
			ON cl.code = v.level_code
			ON CONFLICT (code) DO NOTHING;
	`);

	await tenantDataSource.destroy();

	console.log('✅ Organization seed completado.');
}

run().catch(console.error);
