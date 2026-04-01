import { ControllerWithTags, HttpMethodWithSwagger } from 'src/commons/base.decorator';
import { verificationNotesRoutes } from '../../config/verification-notes.routes';
import { CreateVerificationNoteDto, UpdateVerificationNoteDto, FilterVerificationNoteDto } from '../../model/verification-notes.dtos';

const cfg = verificationNotesRoutes.verification_notes;

export const SwaggerVerificationNoteController = () => ControllerWithTags({ tag: cfg.tag, route: cfg.route });

export const SwaggerVerificationNoteCreate = () => HttpMethodWithSwagger({ ...cfg.operation.create, body: CreateVerificationNoteDto });

export const SwaggerVerificationNoteUpdate = () => HttpMethodWithSwagger({ ...cfg.operation.update, body: UpdateVerificationNoteDto });

export const SwaggerVerificationNoteDelete = () => HttpMethodWithSwagger(cfg.operation.delete);

export const SwaggerVerificationNoteGetAll = () => HttpMethodWithSwagger(cfg.operation.getAll);

export const SwaggerVerificationNoteGetById = () => HttpMethodWithSwagger(cfg.operation.getById);

export const SwaggerVerificationNoteGetByFilters = () => HttpMethodWithSwagger({ ...cfg.operation.getByFilters, body: FilterVerificationNoteDto });
