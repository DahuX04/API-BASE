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

	console.log(`🌱 Seeding IFC module: ${tenant}`);
	
	// Insert IFC statuses (states of IFC evaluation)
	await tenantDataSource.query(`
		INSERT INTO statuses (code, name, description, is_active, created_at, updated_at)
			VALUES
			('STATUS_NOT_MEASURED', 'No Medido', 'El indicador aún no ha sido medido', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('STATUS_IN_PROGRESS', 'En Proceso', 'La medición del indicador está en curso', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('STATUS_MEASURED', 'Medido', 'El indicador ha sido medido', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('STATUS_ANALYZED', 'Analizado', 'Los resultados del indicador han sido analizados', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('STATUS_MET', 'Alcanzado', 'El indicador alcanzó la meta establecida', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('STATUS_NOT_MET', 'No Alcanzado', 'El indicador no alcanzó la meta establecida', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('STATUS_ACTION_PLAN', 'Plan de Acción', 'Se ha generado un plan de acción para mejorar', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('STATUS_IMPROVING', 'Mejorando', 'Se están implementando mejoras', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert IFC findings (detailed evaluation results)
	await tenantDataSource.query(`
		INSERT INTO ifc_findings (code, ifc_code, academic_period, data_collection_method, sample_size, percentage_achievement, analysis, status_id, is_active, created_at, updated_at)
			SELECT v.code, v.ifc_code, v.academic_period, v.method, v.sample, v.achievement, v.analysis, s.id, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM statuses s
			JOIN (
				VALUES
				('FINDING_CRIT_THINK_2024', 'IFC_CRIT_THINK_001', 'AP_2024_1', 'RUBRIC', 45, 78.5, 'Los estudiantes demostraron buena capacidad de análisis. Algunos necesitan mejorar en la síntesis de información', 'STATUS_ANALYZED'),
				('FINDING_COMM_2024', 'IFC_COMMUNICATION_001', 'AP_2024_1', 'RUBRIC', 45, 82.0, 'La comunicación escrita de los estudiantes fue clara y bien estructurada en su mayoría', 'STATUS_ANALYZED'),
				('FINDING_TEAMWORK_2024', 'IFC_TEAMWORK_001', 'AP_2024_1', 'SURVEY', 45, 88.0, 'Los estudiantes valoraron positivamente las dinámicas de trabajo en equipo', 'STATUS_ANALYZED'),
				('FINDING_TECHNICAL_2024', 'IFC_TECHNICAL_001', 'AP_2024_1', 'EXAM', 45, 71.5, 'Competencia técnica en desarrollo, pero algunas areas requieren reforzamiento', 'STATUS_ANALYZED'),
				('FINDING_ETHICS_2024', 'IFC_ETHICS_001', 'AP_2024_1', 'INTERVIEW', 30, 85.0, 'Comportamiento ético demostrado en la mayoría de los casos', 'STATUS_ANALYZED')
			) AS v(code, ifc_code, academic_period, method, sample, achievement, analysis, status_code)
			ON s.code = v.status_code
			ON CONFLICT (code) DO NOTHING;
	`);

	await tenantDataSource.destroy();

	console.log('✅ IFC seed completado.');
}

run().catch(console.error);
