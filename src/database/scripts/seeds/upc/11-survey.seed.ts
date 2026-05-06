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

	console.log(`🌱 Seeding survey module: ${tenant}`);
	
	// Insert notification statuses
	await tenantDataSource.query(`
		INSERT INTO notification_statuses (code, name, description, is_active, created_at, updated_at)
			VALUES
			('STATUS_DRAFT', 'Borrador', 'Notificación en edición', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('STATUS_SCHEDULED', 'Programada', 'Notificación programada para envío futuro', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('STATUS_SENT', 'Enviada', 'Notificación ya enviada', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('STATUS_DELIVERED', 'Entregada', 'Notificación confirmada entregada', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('STATUS_FAILED', 'Fallida', 'Error en el envío de notificación', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert notification messages
	await tenantDataSource.query(`
		INSERT INTO notification_messages (code, title, message_template, message_type, status_id, created_by, is_active, created_at, updated_at)
			SELECT v.code, v.title, v.template, v.type, s.id, v.created_by, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM notification_statuses s
			JOIN (
				VALUES
				('STATUS_DRAFT', 'MSG_SURVEY_INVITATION', 'Invitación a Encuesta', '{{recipientName}}, te invitamos a participar en nuestra encuesta sobre {{surveyTopic}}', 'EMAIL', 'admin@upc.edu.pe'),
				('STATUS_DRAFT', 'MSG_SURVEY_REMINDER', 'Recordatorio Encuesta', 'Recordatorio: Aún puedes participar en la encuesta {{surveyName}} hasta {{deadline}}', 'EMAIL', 'admin@upc.edu.pe'),
				('STATUS_DRAFT', 'MSG_FEEDBACK_THANKS', 'Agradecimiento por Retroalimentación', 'Gracias {{recipientName}} por tu valiosa retroalimentación sobre {{topic}}', 'EMAIL', 'admin@upc.edu.pe'),
				('STATUS_DRAFT', 'MSG_RESULTS_AVAILABLE', 'Resultados Disponibles', 'Los resultados de la encuesta {{surveyName}} ya están disponibles en {{linkUrl}}', 'EMAIL', 'admin@upc.edu.pe')
			) AS v(status_code, code, title, template, type, created_by)
			ON s.code = v.status_code
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert notifications
	await tenantDataSource.query(`
		INSERT INTO notifications (code, recipient_type, recipient_id, subject, message, notification_type, status_id, sent_date, is_active, created_at, updated_at)
			SELECT v.code, v.recipient_type, v.recipient_id::integer, v.subject, v.message, v.notif_type, s.id, v.sent_date, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM notification_statuses s
			JOIN (
				VALUES
				('STATUS_SENT', 'NOTIF_SURVEY_CS_2024_001', 'STUDENT', '1', 'Invitación: Encuesta de Satisfacción CS 2024', 'Te invitamos a participar en la encuesta de satisfacción del programa de Ingeniería de Software', 'SURVEY_INVITATION', '2024-11-01', '2024-11-01 10:00:00'),
				('STATUS_SENT', 'NOTIF_SURVEY_CS_2024_002', 'STUDENT', '2', 'Invitación: Encuesta de Satisfacción CS 2024', 'Te invitamos a participar en la encuesta de satisfacción del programa de Ingeniería de Software', 'SURVEY_INVITATION', '2024-11-01', '2024-11-01 10:00:00'),
				('STATUS_DELIVERED', 'NOTIF_RESULTS_2024_001', 'FACULTY', '1', 'Resultados Encuesta Disponibles', 'Los resultados de la encuesta de satisfacción 2024 ya están disponibles', 'RESULTS_NOTIFICATION', '2024-12-01', '2024-12-01 14:00:00'),
				('STATUS_DELIVERED', 'NOTIF_RESULTS_2024_002', 'FACULTY', '2', 'Resultados Encuesta Disponibles', 'Los resultados de la encuesta de satisfacción 2024 ya están disponibles', 'RESULTS_NOTIFICATION', '2024-12-01', '2024-12-01 14:00:00')
			) AS v(status_code, code, recipient_type, recipient_id, subject, message, notif_type, sent_date, sent_datetime)
			ON s.code = v.status_code
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert survey outcome configs (configurations for outcome data collection)
	await tenantDataSource.query(`
		INSERT INTO outcome_configs (code, outcome_code, survey_id, measurement_method, data_collection_frequency, target_percentage, is_active, created_at, updated_at)
			SELECT v.code, v.outcome_code, sv.id, v.method, v.frequency, v.target, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM (
				SELECT id FROM surveys WHERE code = 'SURV_CS_SATISFACTION_2024' LIMIT 1
			) sv
			CROSS JOIN (
				VALUES
				('OUT_CONFIG_001', 'OUT_001', 'SURVEY', 'ANNUAL', 75),
				('OUT_CONFIG_002', 'OUT_002', 'SURVEY', 'ANNUAL', 80),
				('OUT_CONFIG_003', 'OUT_003', 'SURVEY', 'ANNUAL', 85),
				('OUT_CONFIG_004', 'OUT_004', 'SURVEY', 'ANNUAL', 70),
				('OUT_CONFIG_005', 'OUT_005', 'SURVEY', 'BIENNIAL', 75),
				('OUT_CONFIG_006', 'OUT_006', 'SURVEY', 'ANNUAL', 60)
			) AS v(code, outcome_code, method, frequency, target)
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert survey scores (individual response records)
	await tenantDataSource.query(`
		INSERT INTO scores (code, survey_id, respondent_type, respondent_id, question_number, question_text, score_value, additional_comments, is_active, created_at, updated_at)
			SELECT v.code, sv.id, v.respondent_type, v.respondent_id::integer, v.question_number, v.question_text, v.score_value::numeric(3,1), v.comments, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM (
				SELECT id FROM surveys WHERE code = 'SURV_CS_SATISFACTION_2024' LIMIT 1
			) sv
			CROSS JOIN (
				VALUES
				('SCORE_CS_001', 'STUDENT', '1', 1, '¿Qué tan satisfecho está con la calidad de la enseñanza?', '4.5', 'Excelente contenido'),
				('SCORE_CS_002', 'STUDENT', '1', 2, '¿Los profesores están disponibles para resolver dudas?', '4.0', 'Buena disponibilidad'),
				('SCORE_CS_003', 'STUDENT', '2', 1, '¿Qué tan satisfecho está con la calidad de la enseñanza?', '4.0', ''),
				('SCORE_CS_004', 'STUDENT', '2', 2, '¿Los profesores están disponibles para resolver dudas?', '3.5', 'Podría mejorar horarios'),
				('SCORE_CS_005', 'STUDENT', '3', 1, '¿Qué tan satisfecho está con la calidad de la enseñanza?', '5.0', 'Muy satisfecho'),
				('SCORE_CS_006', 'STUDENT', '3', 2, '¿Los profesores están disponibles para resolver dudas?', '4.5', 'Excelente apoyo'),
				('SCORE_CS_007', 'STUDENT', '4', 1, '¿Qué tan satisfecho está con la calidad de la enseñanza?', '3.5', 'Necesita mejorar ejemplos'),
				('SCORE_CS_008', 'STUDENT', '4', 2, '¿Los profesores están disponibles para resolver dudas?', '4.0', '')
			) AS v(code, respondent_type, respondent_id, question_number, question_text, score_value, comments)
			ON CONFLICT (code) DO NOTHING;
	`);

	await tenantDataSource.destroy();

	console.log('✅ Survey seed completado.');
}

run().catch(console.error);
