import { ControllerWithTags, HttpMethodWithSwagger } from 'src/commons/base.decorator';
import { assessmentsRoutes } from '../../config/assessments.routes';
import { CreateAssessmentDto, UpdateAssessmentDto, FilterAssessmentDto } from '../../model/assessments.dtos';

const cfg = assessmentsRoutes.assessments;

export const SwaggerAssessmentController = () => ControllerWithTags({ tag: cfg.tag, route: cfg.route });

export const SwaggerAssessmentCreate = () => HttpMethodWithSwagger({ ...cfg.operation.create, body: CreateAssessmentDto });

export const SwaggerAssessmentUpdate = () => HttpMethodWithSwagger({ ...cfg.operation.update, body: UpdateAssessmentDto });

export const SwaggerAssessmentDelete = () => HttpMethodWithSwagger(cfg.operation.delete);

export const SwaggerAssessmentGetAll = () => HttpMethodWithSwagger(cfg.operation.getAll);

export const SwaggerAssessmentGetById = () => HttpMethodWithSwagger(cfg.operation.getById);

export const SwaggerAssessmentGetByFilters = () => HttpMethodWithSwagger({ ...cfg.operation.getByFilters, body: FilterAssessmentDto });
