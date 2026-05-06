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

	console.log(`🌱 Seeding accreditation module: ${tenant}`);
	
	// Insert accreditors
	await tenantDataSource.query(`
		INSERT INTO accreditors (code, name, country, website, is_active, created_at, updated_at)
			VALUES
			('ACC_SINEACE', 'SINEACE - Sistema Nacional de Evaluación, Acreditación y Certificación de Calidad Educativa', 'Perú', 'https://www.sineace.gob.pe', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('ACC_ICACIT', 'ICACIT - Acreditadora de Programas de Ingeniería', 'Perú', 'https://www.icacit.org.pe', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('ACC_AACBS', 'AACBS - Association to Advance Collegiate Schools of Business', 'USA', 'https://www.aacbs.org', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert outcomes (acreditation learning outcomes)
	await tenantDataSource.query(`
		INSERT INTO outcomes (code, name, description, is_active, created_at, updated_at)
			VALUES
			('OUT_001', 'Competencia en Pensamiento Crítico', 'El graduado demuestra habilidad para analizar y resolver problemas complejos', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('OUT_002', 'Competencia en Comunicación', 'El graduado se comunica efectivamente en forma oral y escrita', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('OUT_003', 'Competencia en Trabajo en Equipo', 'El graduado colabora efectivamente en equipos multidisciplinarios', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('OUT_004', 'Competencia Técnica Disciplinaria', 'El graduado domina conocimientos y habilidades de su disciplina', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('OUT_005', 'Competencia Ética Profesional', 'El graduado actúa con integridad y responsabilidad ética', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('OUT_006', 'Competencia en Innovación', 'El graduado contribuye a innovación y mejora continua', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert commissions (accreditation evaluation teams)
	await tenantDataSource.query(`
		INSERT INTO commissions (code, name, description, status, start_date, end_date, is_active, created_at, updated_at)
			VALUES
			('COM_2024_CS', 'Comisión Evaluadora Ingeniería de Software', 'Comisión para evaluación de programa de Ingeniería de Software', 'SCHEDULED', '2024-10-01', '2024-12-31', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('COM_2024_BA', 'Comisión Evaluadora Administración', 'Comisión para evaluación de programa de Administración', 'IN_PROCESS', '2024-11-15', '2025-02-15', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('COM_2025_CE', 'Comisión Evaluadora Ingeniería Civil', 'Comisión para evaluación de programa de Ingeniería Civil', 'SCHEDULED', '2025-03-01', '2025-06-30', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert program commissions (link programs to commissions)
	await tenantDataSource.query(`
		INSERT INTO program_commissions (program_id, commission_id, is_active, created_at, updated_at)
			SELECT p.id, c.id, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM programs p
			JOIN commissions c ON (
				(p.code = 'PROG_CS_UG' AND c.code = 'COM_2024_CS') OR
				(p.code = 'PROG_BA_UG' AND c.code = 'COM_2024_BA') OR
				(p.code = 'PROG_CE_UG' AND c.code = 'COM_2025_CE')
			)
			ON CONFLICT DO NOTHING;
	`);

	await tenantDataSource.destroy();

	console.log('✅ Accreditation seed completado.');
}

run().catch(console.error);
