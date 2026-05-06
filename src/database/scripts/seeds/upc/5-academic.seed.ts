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

	console.log(`🌱 Seeding academic module: ${tenant}`);
	
	// First, get the modality_type_id from types (assuming it was created in types seed)
	// For now, we'll use hardcoded IDs or fetch them
	
	// Insert programs
	await tenantDataSource.query(`
		INSERT INTO programs (code, name, degree, modality_type_id, is_active, created_at, updated_at)
			VALUES
			('PROG_CS_UG', 'Ingeniería de Software', 'Pregrado', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROG_CE_UG', 'Ingeniería Civil', 'Pregrado', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROG_IE_UG', 'Ingeniería Industrial', 'Pregrado', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROG_BA_UG', 'Administración de Empresas', 'Pregrado', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROG_MK_UG', 'Marketing', 'Pregrado', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROG_ACC_UG', 'Contabilidad', 'Pregrado', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROG_COM_UG', 'Comunicación Social', 'Pregrado', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROG_LAW_UG', 'Derecho', 'Pregrado', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROG_ENG_UG', 'Enfermería', 'Pregrado', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROG_ARCH_UG', 'Arquitectura', 'Pregrado', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROG_MBA', 'MBA - Maestría en Administración de Negocios', 'Postgrado', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROG_MENG', 'Maestría en Ingeniería de Software', 'Postgrado', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert academic periods
	await tenantDataSource.query(`
		INSERT INTO academic_periods (code, name, start_date, end_date, is_active, created_at, updated_at)
			VALUES
			('AP_2024_1', 'Período Académico 2024-1', '2024-09-15', '2025-01-31', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('AP_2024_2', 'Período Académico 2024-2', '2025-02-01', '2025-06-30', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('AP_2025_1', 'Período Académico 2025-1', '2025-09-15', '2026-01-31', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('AP_2025_2', 'Período Académico 2025-2', '2026-02-01', '2026-06-30', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert performance levels (typical grading scale)
	await tenantDataSource.query(`
		INSERT INTO performance_levels (code, name, min_grade, max_grade, description, is_active, created_at, updated_at)
			VALUES
			('PL_EXCELLENT', 'Excelente', 18, 20, 'Desempeño excepcional del estudiante', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PL_VERY_GOOD', 'Muy Bueno', 16, 17.99, 'Desempeño muy bueno, supera expectativas', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PL_GOOD', 'Bueno', 14, 15.99, 'Desempeño satisfactorio, cumple expectativas', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PL_SATISFACTORY', 'Satisfactorio', 10.5, 13.99, 'Desempeño aceptable, cumple requisitos mínimos', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PL_NEEDS_IMPROVEMENT', 'Necesita Mejorar', 0, 10.49, 'Desempeño insuficiente, no cumple requisitos', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert courses
	await tenantDataSource.query(`
		INSERT INTO courses (code, name, credits, hours_theory, hours_practice, is_active, created_at, updated_at)
			VALUES
			('COURSE_CS101', 'Fundamentos de Programación', 4, 3, 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('COURSE_CS201', 'Programación Orientada a Objetos', 4, 3, 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('COURSE_CS301', 'Estructuras de Datos', 4, 3, 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('COURSE_CS401', 'Algoritmos Avanzados', 4, 3, 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('COURSE_CE101', 'Cálculo I', 5, 4, 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('COURSE_CE201', 'Mecánica de Sólidos', 4, 3, 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('COURSE_IE101', 'Introducción a la Ingeniería Industrial', 3, 3, 0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('COURSE_BA101', 'Fundamentos de Administración', 3, 3, 0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('COURSE_ACC101', 'Contabilidad General I', 4, 3, 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('COURSE_LAW101', 'Introducción al Derecho', 3, 3, 0, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert professors
	await tenantDataSource.query(`
		INSERT INTO professors (code, name, email, phone, is_active, created_at, updated_at)
			VALUES
			('PROF_001', 'Juan Pérez Rodríguez', 'prof_juan_perez@upc.edu.pe', '+51987654321', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROF_002', 'María García Martínez', 'prof_maria_garcia@upc.edu.pe', '+51987654322', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROF_003', 'Carlos López Fernández', 'prof_carlos_lopez@upc.edu.pe', '+51987654323', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROF_004', 'Ana Martínez González', 'prof_ana_martinez@upc.edu.pe', '+51987654324', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert students
	await tenantDataSource.query(`
		INSERT INTO students (user_id, program_id, graduation_modality_type_id, enrollment_status, is_active, created_at, updated_at)
			SELECT u.id, p.id, 1, 'ACTIVE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM (SELECT id FROM "public".users WHERE email LIKE 'student_%@upc.edu.pe' LIMIT 8) u
			CROSS JOIN (SELECT id FROM programs WHERE code = 'PROG_CS_UG' LIMIT 1) p
			ON CONFLICT (user_id) DO NOTHING;
	`);

	// Insert course sections (multiple sections of same course)
	await tenantDataSource.query(`
		INSERT INTO course_sections (course_id, academic_period_id, section_number, professor_id, schedule, capacity, is_active, created_at, updated_at)
			SELECT c.id, ap.id, v.section, p.id, v.schedule, v.capacity, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM courses c
			JOIN academic_periods ap ON ap.code = 'AP_2024_1'
			JOIN professors p ON p.code = 'PROF_001'
			JOIN (
				VALUES
				('COURSE_CS101', 'A', '{"day":"Monday","time":"09:00-11:00"}'::jsonb, 30),
				('COURSE_CS101', 'B', '{"day":"Tuesday","time":"09:00-11:00"}'::jsonb, 30),
				('COURSE_CS201', 'A', '{"day":"Wednesday","time":"11:00-13:00"}'::jsonb, 30),
				('COURSE_CS301', 'A', '{"day":"Thursday","time":"14:00-16:00"}'::jsonb, 30)
			) AS v(course_code, section, schedule, capacity)
			ON c.code = v.course_code
			ON CONFLICT DO NOTHING;
	`);

	// Insert student section enrollments
	await tenantDataSource.query(`
		INSERT INTO student_section_enrollments (student_id, course_section_id, enrollment_date, status, is_active, created_at, updated_at)
			SELECT s.id, cs.id, CURRENT_DATE, 'ENROLLED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM students s
			JOIN course_sections cs ON cs.academic_period_id = (SELECT id FROM academic_periods WHERE code = 'AP_2024_1' LIMIT 1)
			LIMIT 40
			ON CONFLICT DO NOTHING;
	`);

	// Insert study plans
	await tenantDataSource.query(`
		INSERT INTO study_plans (code, name, program_id, version, total_credits, is_active, created_at, updated_at)
			SELECT v.code, v.name, p.id, v.version, v.total_credits, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM programs p
			JOIN (
				VALUES
				('PROG_CS_UG', 'PLAN_CS_2024', 'Plan de Estudios Ingeniería de Software 2024', 1, 180),
				('PROG_CE_UG', 'PLAN_CE_2024', 'Plan de Estudios Ingeniería Civil 2024', 1, 200),
				('PROG_IE_UG', 'PLAN_IE_2024', 'Plan de Estudios Ingeniería Industrial 2024', 1, 190)
			) AS v(prog_code, code, name, version, total_credits)
			ON p.code = v.prog_code
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert study plan academic periods (vincular planes de estudio a períodos académicos)
	await tenantDataSource.query(`
		INSERT INTO study_plan_academic_periods (study_plan_id, academic_period_id, is_active, created_at, updated_at)
			SELECT sp.id, ap.id, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM study_plans sp
			CROSS JOIN academic_periods ap
			WHERE ap.code = 'AP_2024_1'
			ON CONFLICT DO NOTHING;
	`);

	// Insert study plan courses (cursos asignados a cada período del plan)
	await tenantDataSource.query(`
		INSERT INTO study_plan_courses (study_plan_academic_period_id, course_id, is_elective, level_type_id, is_active, created_at, updated_at)
			SELECT spap.id, c.id, 
				CASE WHEN c.code IN ('COURSE_CS301', 'COURSE_CS401') THEN true ELSE false END,
				1,
				true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM study_plan_academic_periods spap
			JOIN study_plans sp ON spap.study_plan_id = sp.id
			CROSS JOIN courses c
			WHERE sp.code = 'PLAN_CS_2024' AND c.code LIKE 'COURSE_CS%'
			LIMIT 8
			ON CONFLICT DO NOTHING;
	`);

	// Insert enrolled students (estudiantes inscritos en campus y plan de estudio)
	await tenantDataSource.query(`
		INSERT INTO enrolled_students (student_id, study_plan_academic_period, campus_id, enrollement_modality_type_id, is_active, created_at, updated_at)
			SELECT s.id, spap.id, c.id, 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM students s
			JOIN study_plan_academic_periods spap ON spap.academic_period_id = (SELECT id FROM academic_periods WHERE code = 'AP_2024_1' LIMIT 1)
			CROSS JOIN (SELECT id FROM campuses WHERE code = 'CAMPUS_LIMA_NORTE' LIMIT 1) c
			LIMIT 8
			ON CONFLICT DO NOTHING;
	`);

	// Insert course outcomes (learning objectives)
	await tenantDataSource.query(`
		INSERT INTO course_outcome_mappings (course_id, outcome_code, outcome_description, is_active, created_at, updated_at)
			SELECT c.id, v.outcome_code, v.outcome_desc, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM courses c
			JOIN (
				VALUES
				('COURSE_CS101', 'CO_CS101_01', 'El estudiante puede escribir programas básicos en Python'),
				('COURSE_CS101', 'CO_CS101_02', 'El estudiante entiende conceptos de variables y tipos de datos'),
				('COURSE_CS201', 'CO_CS201_01', 'El estudiante domina POO y puede diseñar clases'),
				('COURSE_CS301', 'CO_CS301_01', 'El estudiante implementa estructuras de datos eficientemente'),
				('COURSE_CE101', 'CO_CE101_01', 'El estudiante domina límites, derivadas e integrales'),
				('COURSE_BA101', 'CO_BA101_01', 'El estudiante entiende funciones de administración básica')
			) AS v(course_code, outcome_code, outcome_desc)
			ON c.code = v.course_code
			ON CONFLICT DO NOTHING;
	`);

	// Insert student course grades
	await tenantDataSource.query(`
		INSERT INTO student_course_grades (student_id, course_id, academic_period_id, midterm_grade, final_grade, grade_weight, final_qualification, is_active, created_at, updated_at)
			SELECT s.id, c.id, ap.id, 
				(random() * 5 + 13)::numeric(4,2),
				(random() * 5 + 14)::numeric(4,2),
				(random() * 10 + 15)::numeric(4,2),
				(random() * 5 + 14)::numeric(4,2),
				true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM students s
			JOIN courses c ON c.code IN ('COURSE_CS101', 'COURSE_BA101')
			JOIN academic_periods ap ON ap.code = 'AP_2024_1'
			LIMIT 20
			ON CONFLICT DO NOTHING;
	`);

	await tenantDataSource.destroy();

	console.log('✅ Academic seed completado.');
}

run().catch(console.error);
