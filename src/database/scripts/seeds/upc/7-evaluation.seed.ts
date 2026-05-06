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

	console.log(`🌱 Seeding evaluation module: ${tenant}`);
	
	// Insert rubric scales (evaluation criterias)
	await tenantDataSource.query(`
		INSERT INTO rubric_scales (code, name, scale_type, min_value, max_value, is_active, created_at, updated_at)
			VALUES
			('SCALE_LIKERT_5', 'Escala Likert 5 Puntos', 'NUMERIC', 1, 5, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('SCALE_LIKERT_4', 'Escala Likert 4 Puntos', 'NUMERIC', 1, 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('SCALE_PERCENTAGE', 'Escala Porcentual', 'NUMERIC', 0, 100, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('SCALE_LETTER', 'Escala de Letras', 'CATEGORICAL', null, null, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert rubrics (evaluation instruments)
	await tenantDataSource.query(`
		INSERT INTO rubrics (code, name, description, rubric_type, total_points, is_active, created_at, updated_at)
			VALUES
			('RUBRIC_CS101_MIDTERM', 'Rúbrica Evaluación Parcial CS101', 'Rúbrica para evaluación de la primera mitad del curso', 'ASSESSMENT', 20, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('RUBRIC_CS101_FINAL', 'Rúbrica Evaluación Final CS101', 'Rúbrica para evaluación final del curso', 'ASSESSMENT', 20, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('RUBRIC_PROJECT_EVAL', 'Rúbrica Evaluación de Proyectos', 'Rúbrica para evaluar proyectos académicos', 'PROJECT', 100, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('RUBRIC_COMPETENCY', 'Rúbrica Evaluación de Competencias', 'Rúbrica para evaluar desarrollo de competencias', 'COMPETENCY', 50, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert rubric questions (evaluation criteria)
	await tenantDataSource.query(`
		INSERT INTO rubric_questions (rubric_id, question_text, points, order_index, is_active, created_at, updated_at)
			SELECT r.id, v.question, v.points, v.ord, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM rubrics r
			JOIN (
				VALUES
				('RUBRIC_CS101_MIDTERM', '¿Demuestra comprensión de conceptos fundamentales?', 5, 1),
				('RUBRIC_CS101_MIDTERM', '¿Aplica conceptos correctamente en ejercicios?', 5, 2),
				('RUBRIC_CS101_MIDTERM', '¿Comunica su razonamiento claramente?', 5, 3),
				('RUBRIC_CS101_MIDTERM', '¿Demuestra pensamiento crítico?', 5, 4),
				('RUBRIC_PROJECT_EVAL', '¿Cumple con los requisitos del proyecto?', 20, 1),
				('RUBRIC_PROJECT_EVAL', '¿Código es bien estructurado y documentado?', 20, 2),
				('RUBRIC_PROJECT_EVAL', '¿Presentación es clara y profesional?', 20, 3),
				('RUBRIC_PROJECT_EVAL', '¿Demuestra innovación y creatividad?', 20, 4),
				('RUBRIC_PROJECT_EVAL', '¿Trabaja efectivamente en equipo?', 20, 5)
			) AS v(rubric_code, question, points, ord)
			ON r.code = v.rubric_code
			ON CONFLICT DO NOTHING;
	`);

	// Insert rubric scales criterias (options for each question)
	await tenantDataSource.query(`
		INSERT INTO rubric_question_criterias (rubric_question_id, criteria_level, criteria_description, score, is_active, created_at, updated_at)
			SELECT rq.id, v.level, v.description, v.score, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM rubric_questions rq
			JOIN rubrics r ON rq.rubric_id = r.id
			JOIN (
				VALUES
				('RUBRIC_CS101_MIDTERM', 'EXCELLENT', 'Comprensión completa y demostrada', 5),
				('RUBRIC_CS101_MIDTERM', 'GOOD', 'Comprensión clara y adecuada', 4),
				('RUBRIC_CS101_MIDTERM', 'FAIR', 'Comprensión parcial', 2),
				('RUBRIC_CS101_MIDTERM', 'POOR', 'Comprensión limitada', 0)
			) AS v(rubric_code, level, description, score)
			ON r.code = v.rubric_code
			ON CONFLICT DO NOTHING;
	`);

	// Insert projects
	await tenantDataSource.query(`
		INSERT INTO projects (code, name, description, status, start_date, end_date, is_active, created_at, updated_at)
			VALUES
			('PROJ_CS101_2024', 'Proyecto Final Programación Básica', 'Proyecto integrador del curso de Fundamentos de Programación', 'ACTIVE', '2024-10-01', '2024-11-30', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROJ_CS201_2024', 'Proyecto POO Sistema de Gestión', 'Sistema de gestión utilizando POO', 'ACTIVE', '2024-11-01', '2025-01-31', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('PROJ_CAPSTONE_2024', 'Proyecto Capstone', 'Proyecto integrador final de la carrera', 'PLANNING', '2025-03-01', '2025-06-30', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert project students
	await tenantDataSource.query(`
		INSERT INTO project_students (project_id, student_id, role, is_active, created_at, updated_at)
			SELECT p.id, s.id, 'MEMBER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM projects p
			CROSS JOIN (SELECT id FROM students LIMIT 5) s
			WHERE p.code = 'PROJ_CS101_2024'
			ON CONFLICT DO NOTHING;
	`);

	// Insert project evaluators
	await tenantDataSource.query(`
		INSERT INTO project_evaluators (project_id, professor_id, evaluation_status, is_active, created_at, updated_at)
			SELECT p.id, prof.id, 'PENDING', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM projects p
			JOIN professors prof ON prof.code IN ('PROF_001', 'PROF_002')
			WHERE p.code IN ('PROJ_CS101_2024', 'PROJ_CS201_2024')
			ON CONFLICT DO NOTHING;
	`);

	// Insert rubric outcome criterias (link outcomes to rubrics)
	await tenantDataSource.query(`
		INSERT INTO rubric_outcome_criterias (rubric_id, outcome_code, weight, is_active, created_at, updated_at)
			SELECT r.id, v.outcome_code, v.weight, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM rubrics r
			JOIN (
				VALUES
				('RUBRIC_CS101_MIDTERM', 'OUT_001', 0.4),
				('RUBRIC_CS101_MIDTERM', 'OUT_004', 0.6),
				('RUBRIC_PROJECT_EVAL', 'OUT_001', 0.3),
				('RUBRIC_PROJECT_EVAL', 'OUT_003', 0.2),
				('RUBRIC_PROJECT_EVAL', 'OUT_004', 0.3),
				('RUBRIC_PROJECT_EVAL', 'OUT_006', 0.2)
			) AS v(rubric_code, outcome_code, weight)
			ON r.code = v.rubric_code
			ON CONFLICT DO NOTHING;
	`);

	// Insert rubric scores
	await tenantDataSource.query(`
		INSERT INTO rubric_scores (project_student_id, rubric_id, score, evaluator_notes, status, is_active, created_at, updated_at)
			SELECT ps.id, r.id, (random() * 80 + 20)::numeric(5,2), 'Evaluación realizada', 'COMPLETED', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM project_students ps
			JOIN rubrics r ON r.code IN ('RUBRIC_PROJECT_EVAL', 'RUBRIC_CS101_MIDTERM')
			WHERE ps.project_id = (SELECT id FROM projects WHERE code = 'PROJ_CS101_2024' LIMIT 1)
			LIMIT 10
			ON CONFLICT DO NOTHING;
	`);

	await tenantDataSource.destroy();

	console.log('✅ Evaluation seed completado.');
}

run().catch(console.error);
