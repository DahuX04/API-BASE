import { ControllerWithTags, HttpMethodWithSwagger } from 'src/commons/base.decorator';
import { gradedOutcomesRoutes } from '../../config/graded-outcomes.routes';
import { CreateGradedOutcomeDto, UpdateGradedOutcomeDto, FilterGradedOutcomeDto } from '../../model/graded-outcomes.dtos';

const cfg = gradedOutcomesRoutes.graded_outcomes;

export const SwaggerGradedOutcomeController = () => ControllerWithTags({ tag: cfg.tag, route: cfg.route });

export const SwaggerGradedOutcomeCreate = () => HttpMethodWithSwagger({ ...cfg.operation.create, body: CreateGradedOutcomeDto });

export const SwaggerGradedOutcomeUpdate = () => HttpMethodWithSwagger({ ...cfg.operation.update, body: UpdateGradedOutcomeDto });

export const SwaggerGradedOutcomeDelete = () => HttpMethodWithSwagger(cfg.operation.delete);

export const SwaggerGradedOutcomeGetAll = () => HttpMethodWithSwagger(cfg.operation.getAll);

export const SwaggerGradedOutcomeGetById = () => HttpMethodWithSwagger(cfg.operation.getById);

export const SwaggerGradedOutcomeGetByFilters = () => HttpMethodWithSwagger({ ...cfg.operation.getByFilters, body: FilterGradedOutcomeDto });
