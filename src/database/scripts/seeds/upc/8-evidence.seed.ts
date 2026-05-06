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

	console.log(`🌱 Seeding evidence module: ${tenant}`);
	
	// Insert surveys
	await tenantDataSource.query(`
		INSERT INTO surveys (code, name, description, survey_type, status, start_date, end_date, is_active, created_at, updated_at)
			VALUES
			('SURV_CS_SATISFACTION_2024', 'Encuesta Satisfacción Estudiantes CS 2024', 'Encuesta de satisfacción para estudiantes de Ingeniería de Software', 'STUDENT_SATISFACTION', 'ACTIVE', '2024-11-01', '2024-11-30', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('SURV_ALUMNI_OUTCOME_2024', 'Encuesta Egresados Resultados Educativos', 'Evaluación de resultados educativos con egresados', 'ALUMNI_OUTCOME', 'ACTIVE', '2024-10-01', '2024-12-31', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('SURV_EMPLOYER_2024', 'Encuesta Empleadores 2024', 'Evaluación de competencias desde perspectiva del empleador', 'EMPLOYER_FEEDBACK', 'PLANNING', '2025-01-01', '2025-03-31', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert instruments (evaluation tools)
	await tenantDataSource.query(`
		INSERT INTO instruments (code, name, description, instrument_type, is_active, created_at, updated_at)
			VALUES
			('INST_EXAM_CS101', 'Examen Programación Básica', 'Examen escrito para evaluar fundamentos de programación', 'TEST', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('INST_PORTFOLIO', 'Portafolio de Proyectos', 'Colección de proyectos realizados por el estudiante', 'PORTFOLIO', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('INST_CAPSTONE', 'Proyecto Capstone', 'Proyecto integrador final de carrera', 'PROJECT', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('INST_FOCUS_GROUP', 'Grupo Focal Estudiantes', 'Entrevista grupal para recolectar percepciones', 'INTERVIEW', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('INST_INTERNSHIP_EVAL', 'Evaluación Prácticas Profesionales', 'Evaluación del desempeño en prácticas profesionales', 'PERFORMANCE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert IFCs (learning outcomes indicators)
	await tenantDataSource.query(`
		INSERT INTO ifcs (code, name, description, outcome_code, measurement_method, threshold, is_active, created_at, updated_at)
			VALUES
			('IFC_CRIT_THINK_001', 'Análisis de Problemas Complejos', 'El estudiante puede analizar problemas técnicos complejos', 'OUT_001', 'RUBRIC', 0.7, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('IFC_COMMUNICATION_001', 'Comunicación Escrita', 'El estudiante produce documentación técnica clara', 'OUT_002', 'RUBRIC', 0.75, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('IFC_TEAMWORK_001', 'Colaboración en Equipos', 'El estudiante colabora efectivamente en proyectos', 'OUT_003', 'SURVEY', 0.8, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('IFC_TECHNICAL_001', 'Competencia Técnica', 'El estudiante domina tecnologías de la disciplina', 'OUT_004', 'EXAM', 0.65, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('IFC_ETHICS_001', 'Responsabilidad Ética', 'El estudiante actúa con integridad profesional', 'OUT_005', 'INTERVIEW', 0.8, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('IFC_INNOVATION_001', 'Innovación Tecnológica', 'El estudiante propone soluciones innovadoras', 'OUT_006', 'PROJECT', 0.6, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert evaluations (evidence collection records)
	await tenantDataSource.query(`
		INSERT INTO evaluations (code, name, description, evaluation_date, evaluator, data_source, is_active, created_at, updated_at)
			VALUES
			('EVAL_CS101_2024', 'Evaluación Programación Básica 2024', 'Evaluación de aprendizaje en CS101', '2024-11-15', 'Prof. Juan Pérez', 'EXAM', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('EVAL_SATISFACTION_2024', 'Evaluación Satisfacción 2024', 'Resultados de encuesta de satisfacción estudiantil', '2024-11-30', 'Oficina de Calidad', 'SURVEY', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('EVAL_CAPSTONE_2024', 'Evaluación Proyectos Capstone 2024', 'Evaluación de proyectos integradores finales', '2024-12-10', 'Comisión Capstone', 'PROJECT', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('EVAL_ALUMNI_2024', 'Evaluación Egresados 2024', 'Seguimiento de competencias en egresados', '2024-11-01', 'Oficina de Egresados', 'INTERVIEW', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert student course outcome grades
	await tenantDataSource.query(`
		INSERT INTO student_course_outcome_grades (student_id, course_id, outcome_code, grade, evidence_type, is_active, created_at, updated_at)
			SELECT s.id, c.id, 'OUT_001', (random() * 5 + 13)::numeric(4,2), 'EXAM', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM students s
			JOIN courses c ON c.code IN ('COURSE_CS101', 'COURSE_CS201')
			LIMIT 10
			ON CONFLICT DO NOTHING;
	`);

	await tenantDataSource.destroy();

	console.log('✅ Evidence seed completado.');
}

run().catch(console.error);
