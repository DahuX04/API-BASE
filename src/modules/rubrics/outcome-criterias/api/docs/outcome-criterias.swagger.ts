import { ControllerWithTags, HttpMethodWithSwagger } from 'src/commons/base.decorator';
import { outcomeCriteriasRoutes } from '../../config/outcome-criterias.routes';
import { CreateOutcomeCriteriaDto, UpdateOutcomeCriteriaDto, FilterOutcomeCriteriaDto } from '../../model/outcome-criterias.dtos';

const cfg = outcomeCriteriasRoutes.outcome_criterias;

export const SwaggerOutcomeCriteriaController = () => ControllerWithTags({ tag: cfg.tag, route: cfg.route });

export const SwaggerOutcomeCriteriaCreate = () => HttpMethodWithSwagger({ ...cfg.operation.create, body: CreateOutcomeCriteriaDto });

export const SwaggerOutcomeCriteriaUpdate = () => HttpMethodWithSwagger({ ...cfg.operation.update, body: UpdateOutcomeCriteriaDto });

export const SwaggerOutcomeCriteriaDelete = () => HttpMethodWithSwagger(cfg.operation.delete);

export const SwaggerOutcomeCriteriaGetAll = () => HttpMethodWithSwagger(cfg.operation.getAll);

export const SwaggerOutcomeCriteriaGetById = () => HttpMethodWithSwagger(cfg.operation.getById);

export const SwaggerOutcomeCriteriaGetByFilters = () => HttpMethodWithSwagger({ ...cfg.operation.getByFilters, body: FilterOutcomeCriteriaDto });
