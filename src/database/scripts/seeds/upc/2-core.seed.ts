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

	console.log(`🌱 Seeding core module: ${tenant}`);
	
	// Insert parameters
	await tenantDataSource.query(`
		INSERT INTO parameters (code, name, description, value, is_active, created_at, updated_at)
			VALUES
			('PARAMETER_ACADEMIC_START_DATE', 'Fecha Inicio Ciclo Académico', 'Fecha cuando inicia el período académico', '{"month": 9, "day": 15}'::jsonb, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PARAMETER_ACADEMIC_END_DATE', 'Fecha Fin Ciclo Académico', 'Fecha cuando finaliza el período académico', '{"month": 6, "day": 30}'::jsonb, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PARAMETER_MIN_PASSING_GRADE', 'Calificación Mínima Aprobatoria', 'Nota mínima requerida para aprobar un curso', '{"value": 10.5, "scale": 20}'::jsonb, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PARAMETER_MAX_RETAKES', 'Máximo de Reclamos', 'Número máximo de veces que se puede reclamar una nota', '{"value": 2}'::jsonb, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PARAMETER_INSTITUTIONAL_NAME', 'Nombre Institución', 'Nombre oficial de la institución', '{"name": "Universidad Peruana de Ciencias Aplicadas"}'::jsonb, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PARAMETER_INSTITUTIONAL_ACRONYM', 'Acrónimo Institución', 'Acrónimo oficial de la institución', '{"acronym": "UPC"}'::jsonb, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PARAMETER_SEMESTER_DURATION_WEEKS', 'Duración Semestral', 'Número de semanas que dura cada semestre', '{"weeks": 18}'::jsonb, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PARAMETER_ACCREDITATION_CYCLE_YEARS', 'Ciclo de Acreditación', 'Años entre ciclos de acreditación institucional', '{"years": 7}'::jsonb, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	await tenantDataSource.destroy();

	console.log('✅ Core seed completado.');
}

run().catch(console.error);
