import { ControllerWithTags, HttpMethodWithSwagger } from 'src/commons/base.decorator';
import { outcomeRubricsRoutes } from '../../config/outcome-rubrics.routes';
import { CreateOutcomeRubricDto, UpdateOutcomeRubricDto, FilterOutcomeRubricDto } from '../../model/outcome-rubrics.dtos';

const cfg = outcomeRubricsRoutes.outcome_rubrics;

export const SwaggerOutcomeRubricController = () => ControllerWithTags({ tag: cfg.tag, route: cfg.route });

export const SwaggerOutcomeRubricCreate = () => HttpMethodWithSwagger({ ...cfg.operation.create, body: CreateOutcomeRubricDto });

export const SwaggerOutcomeRubricUpdate = () => HttpMethodWithSwagger({ ...cfg.operation.update, body: UpdateOutcomeRubricDto });

export const SwaggerOutcomeRubricDelete = () => HttpMethodWithSwagger(cfg.operation.delete);

export const SwaggerOutcomeRubricGetAll = () => HttpMethodWithSwagger(cfg.operation.getAll);

export const SwaggerOutcomeRubricGetById = () => HttpMethodWithSwagger(cfg.operation.getById);

export const SwaggerOutcomeRubricGetByFilters = () => HttpMethodWithSwagger({ ...cfg.operation.getByFilters, body: FilterOutcomeRubricDto });
