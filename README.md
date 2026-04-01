/_ LOCAL _/
npm install --omit=dev
npm run build
zip -r ../Desplegables/backend.zip dist node_modules package.json package-lock.json .env

/_ SERVER _/
pm2 delete base-api
cd /var/www/html/base.com/api
PORT=7777 pm2 start dist/main.js --name base-api
pm2 save
sudo service nginx restart

├── auth/
│ └── users
│
├── people/
│ ├── persons
│ └── patients
│
├── catalog/ // MAESTROS PUROS
│ ├── type_groups
│ ├── types
│ ├── currencies
│ └── ubications
│
├── hr/ // RECURSOS HUMANOS
│ ├── staff
│ ├── professions
│ ├── staff_professions
│ ├── staff_services
│ └── staff_schedules
│
├── clinical-catalog/ // CATÁLOGO MÉDICO
│ ├── services
│ ├── procedures
│ ├── procedure_required_documents
│ ├── documents
│ ├── medicines
│ ├── diagnostic_systems
│ └── diagnostic_codes
│
├── organization/
│ ├── medical_centers
│ ├── consulting_rooms
│ └── pharmacies
│
├── ehr/ // TODO SOBRE LA INFORMACION SENSIBLE DEL PACIENTE (Tal vez busca run nombre de modulo mejor)
│ ├── clinical_histories
│ ├── clinical_records
│ ├── clinical_anamnesis
│ ├── clinical_physical_exams
│ ├── clinical_backgrounds
│ ├── clinical_diagnoses
│ ├── clinical_indications
│ ├── clinical_evolutions
│ ├── clinical_documents
│ └── clinical_document_signatures
│
├── care/ // ATENCIÓN MÉDICA
│ ├── appointments
│ ├── treatments
│ ├── treatment_prescriptions
│ ├── treatment_prescription_items
│ └── treatment_procedures
│
└── billing/
├── medical_accounts
├── medical_account_items
├── payments
└── billing_documents
