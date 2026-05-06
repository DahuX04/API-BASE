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

	console.log(`🌱 Seeding improvement module: ${tenant}`);
	
	// Insert findings (quality issues identified)
	await tenantDataSource.query(`
		INSERT INTO findings (code, title, description, severity, status, identified_date, source, is_active, created_at, updated_at)
			VALUES
			('FINDING_CS_CONTENT_2024', 'Necesidad de actualizar contenido técnico', 'Los temas de cloud computing requieren actualización en el plan de estudios', 'MEDIUM', 'IDENTIFIED', '2024-11-01', 'CURRICULUM_REVIEW', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('FINDING_COMM_WRITING_2024', 'Mejora en habilidades de escritura', 'Algunos estudiantes presentan dificultades en redacción académica', 'LOW', 'IDENTIFIED', '2024-11-15', 'STUDENT_FEEDBACK', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('FINDING_LAB_RESOURCES_2024', 'Recursos de laboratorio insuficientes', 'Se necesitan más computadoras en los laboratorios de software', 'HIGH', 'IDENTIFIED', '2024-10-01', 'FACILITY_ASSESSMENT', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('FINDING_MENTOR_SUPPORT_2024', 'Necesidad de mentorías', 'Estudiantes de primer año requieren mayor apoyo tutorial', 'MEDIUM', 'ANALYZED', '2024-11-20', 'STUDENT_INTERVIEW', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('FINDING_INTERNSHIP_PLACEMENT_2024', 'Mejorar colocación de pasantías', 'Aumentar convenios con empresas para prácticas profesionales', 'HIGH', 'ANALYZED', '2024-10-15', 'ALUMNI_SURVEY', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert actions (improvements to implement)
	await tenantDataSource.query(`
		INSERT INTO actions (code, title, description, action_type, priority, target_date, responsible, status, is_active, created_at, updated_at)
			VALUES
			('ACTION_UPDATE_CURRICULUM', 'Actualizar contenido técnico del plan de estudios', 'Incluir temas de cloud computing y contenedores en los cursos de programación', 'CURRICULUM', 'HIGH', '2025-03-31', 'Director Académico', 'PLANNED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('ACTION_WRITING_WORKSHOPS', 'Talleres de redacción académica', 'Ofrecer talleres de escritura académica y técnica a estudiantes', 'STUDENT_SUPPORT', 'MEDIUM', '2025-02-28', 'Centro de Escritura', 'PLANNED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('ACTION_ACQUIRE_HARDWARE', 'Adquirir equipamiento de laboratorio', 'Compra e instalación de nuevas estaciones de trabajo', 'RESOURCE', 'HIGH', '2025-04-30', 'Director Administrativo', 'IN_PROGRESS', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('ACTION_MENTORING_PROGRAM', 'Implementar programa de mentoría', 'Programa de mentoría entre estudiantes avanzados y de primer año', 'STUDENT_SUPPORT', 'MEDIUM', '2025-02-28', 'Coordinador de Estudiantes', 'PLANNED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('ACTION_INDUSTRY_PARTNERSHIPS', 'Establecer convenios empresariales', 'Negociar convenios con empresas para prácticas profesionales', 'PARTNERSHIP', 'HIGH', '2025-03-15', 'Oficina de Egresados', 'IN_PROGRESS', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert improvement plans
	await tenantDataSource.query(`
		INSERT INTO plans (code, name, description, academic_period, start_date, end_date, status, responsible, is_active, created_at, updated_at)
			VALUES
			('PLAN_2024_CURRICULUM', 'Plan de Mejora Curricular 2024', 'Plan para actualizar y mejorar el contenido del plan de estudios', 'AP_2024_1', '2024-11-01', '2025-06-30', 'IN_PROGRESS', 'Director Académico', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PLAN_2024_STUDENT_SUPPORT', 'Plan de Apoyo a Estudiantes 2024', 'Plan integral de apoyo y mentoría estudiantil', 'AP_2024_1', '2024-11-15', '2025-06-30', 'PLANNED', 'Coordinador de Estudiantes', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PLAN_2024_RESOURCES', 'Plan de Recursos e Infraestructura 2024', 'Plan para mejorar recursos y facilidades de laboratorio', 'AP_2024_1', '2024-10-01', '2025-06-30', 'IN_PROGRESS', 'Director Administrativo', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Link findings to actions
	await tenantDataSource.query(`
		INSERT INTO finding_actions (finding_id, action_id, is_active, created_at, updated_at)
			SELECT f.id, a.id, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM findings f
			JOIN actions a ON (
				(f.code = 'FINDING_CS_CONTENT_2024' AND a.code = 'ACTION_UPDATE_CURRICULUM') OR
				(f.code = 'FINDING_COMM_WRITING_2024' AND a.code = 'ACTION_WRITING_WORKSHOPS') OR
				(f.code = 'FINDING_LAB_RESOURCES_2024' AND a.code = 'ACTION_ACQUIRE_HARDWARE') OR
				(f.code = 'FINDING_MENTOR_SUPPORT_2024' AND a.code = 'ACTION_MENTORING_PROGRAM') OR
				(f.code = 'FINDING_INTERNSHIP_PLACEMENT_2024' AND a.code = 'ACTION_INDUSTRY_PARTNERSHIPS')
			)
			ON CONFLICT DO NOTHING;
	`);

	// Link findings to outcomes (which outcomes are affected)
	await tenantDataSource.query(`
		INSERT INTO finding_outcomes (finding_id, outcome_code, is_active, created_at, updated_at)
			SELECT f.id, v.outcome_code, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM findings f
			JOIN (
				VALUES
				('FINDING_CS_CONTENT_2024', 'OUT_004'),
				('FINDING_CS_CONTENT_2024', 'OUT_006'),
				('FINDING_COMM_WRITING_2024', 'OUT_002'),
				('FINDING_LAB_RESOURCES_2024', 'OUT_004'),
				('FINDING_MENTOR_SUPPORT_2024', 'OUT_001'),
				('FINDING_INTERNSHIP_PLACEMENT_2024', 'OUT_004'),
				('FINDING_INTERNSHIP_PLACEMENT_2024', 'OUT_005')
			) AS v(finding_code, outcome_code)
			ON f.code = v.finding_code
			ON CONFLICT DO NOTHING;
	`);

	// Link actions to plans
	await tenantDataSource.query(`
		INSERT INTO plan_actions (plan_id, action_id, is_active, created_at, updated_at)
			SELECT p.id, a.id, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM plans p
			JOIN actions a ON (
				(p.code = 'PLAN_2024_CURRICULUM' AND a.code IN ('ACTION_UPDATE_CURRICULUM')) OR
				(p.code = 'PLAN_2024_STUDENT_SUPPORT' AND a.code IN ('ACTION_WRITING_WORKSHOPS', 'ACTION_MENTORING_PROGRAM')) OR
				(p.code = 'PLAN_2024_RESOURCES' AND a.code IN ('ACTION_ACQUIRE_HARDWARE', 'ACTION_INDUSTRY_PARTNERSHIPS'))
			)
			ON CONFLICT DO NOTHING;
	`);

	await tenantDataSource.destroy();

	console.log('✅ Improvement seed completado.');
}

run().catch(console.error);
