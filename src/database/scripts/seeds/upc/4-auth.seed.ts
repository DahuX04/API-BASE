import simpleDS from '../typeorm.config';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

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
	await tenantDataSource.query(`SET search_path TO "organization"`);

	console.log(`🌱 Seeding auth module: ${tenant}`);
	
	// Hash passwords
	const adminPassword = await bcrypt.hash('admin123', 10);
	const professorPassword = await bcrypt.hash('profesor123', 10);
	const studentPassword = await bcrypt.hash('estudiante123', 10);

	// Insert users (in public schema)
	await tenantDataSource.query(`
		INSERT INTO users (email, password, is_admin, is_active, created_at, updated_at)
			VALUES
			('admin@upc.edu.pe', $1, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('rector@upc.edu.pe', $2, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('vraca@upc.edu.pe', $3, true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('prof_juan_perez@upc.edu.pe', $4, false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('prof_maria_garcia@upc.edu.pe', $5, false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('prof_carlos_lopez@upc.edu.pe', $6, false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('prof_ana_martinez@upc.edu.pe', $7, false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('student_luis_ramirez@upc.edu.pe', $8, false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('student_sofia_torres@upc.edu.pe', $9, false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('student_miguel_fernandez@upc.edu.pe', $10, false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('student_camila_ruiz@upc.edu.pe', $11, false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('student_diego_morales@upc.edu.pe', $12, false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('student_valeria_sanchez@upc.edu.pe', $13, false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('student_andres_rojas@upc.edu.pe', $14, false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
			('student_jessica_alba@upc.edu.pe', $15, false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
			ON CONFLICT (email) DO NOTHING;
	`, [
		adminPassword, // admin
		adminPassword, // rector
		adminPassword, // vraca
		professorPassword, // prof_juan
		professorPassword, // prof_maria
		professorPassword, // prof_carlos
		professorPassword, // prof_ana
		studentPassword, // student_luis
		studentPassword, // student_sofia
		studentPassword, // student_miguel
		studentPassword, // student_camila
		studentPassword, // student_diego
		studentPassword, // student_valeria
		studentPassword, // student_andres
		studentPassword  // student_jessica
	]);

	// Insert organization staff users
	await tenantDataSource.query(`
		INSERT INTO organization.staff (user_id, code, name, is_active, created_at, updated_at)
			SELECT u.id, v.code, v.name, v.is_active, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM users u
			JOIN (
				VALUES
				('admin@upc.edu.pe', 'STAFF_ADMIN_001', 'Administrador General', true),
				('rector@upc.edu.pe', 'STAFF_RECTOR_001', 'Dr. Fernando Hernández López', true),
				('vraca@upc.edu.pe', 'STAFF_VRACA_001', 'Dr. Roberto Castillo González', true)
			) AS v(email, code, name, is_active)
			ON u.email = v.email
			ON CONFLICT (code) DO NOTHING;
	`);

	// Insert organization users
	await tenantDataSource.query(`
		INSERT INTO organization.users (user_id, code, name, document_type, document_number, phone, is_active, created_at, updated_at)
			SELECT u.id, v.code, v.name, v.document_type, v.document_number, v.phone, v.is_active, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			FROM users u
			WHERE u.email IN (
				'prof_juan_perez@upc.edu.pe',
				'prof_maria_garcia@upc.edu.pe',
				'prof_carlos_lopez@upc.edu.pe',
				'prof_ana_martinez@upc.edu.pe'
			)
			JOIN (
				VALUES
				('prof_juan_perez@upc.edu.pe', 'PROF_001', 'Juan Pérez Rodríguez', 'DNI', '12345678', '+51987654321', true),
				('prof_maria_garcia@upc.edu.pe', 'PROF_002', 'María García Martínez', 'DNI', '12345679', '+51987654322', true),
				('prof_carlos_lopez@upc.edu.pe', 'PROF_003', 'Carlos López Fernández', 'DNI', '12345680', '+51987654323', true),
				('prof_ana_martinez@upc.edu.pe', 'PROF_004', 'Ana Martínez González', 'DNI', '12345681', '+51987654324', true)
			) AS v(email, code, name, document_type, document_number, phone, is_active)
			ON u.email = v.email
			ON CONFLICT (code) DO NOTHING;
	`);

	await tenantDataSource.destroy();

	console.log('✅ Auth seed completado.');
}

run().catch(console.error);
