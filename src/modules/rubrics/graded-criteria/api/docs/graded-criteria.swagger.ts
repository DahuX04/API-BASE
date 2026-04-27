import { ControllerWithTags, HttpMethodWithSwagger } from 'src/commons/base.decorator';
import { gradedCriteriaRoutes } from '../../config/graded-criteria.routes';
import { CreateGradedCriteriaDto, UpdateGradedCriteriaDto, FilterGradedCriteriaDto } from '../../model/graded-criteria.dtos';

const cfg = gradedCriteriaRoutes.graded_criteria;

export const SwaggerGradedCriteriaController = () => ControllerWithTags({ tag: cfg.tag, route: cfg.route });

export const SwaggerGradedCriteriaCreate = () => HttpMethodWithSwagger({ ...cfg.operation.create, body: CreateGradedCriteriaDto });

export const SwaggerGradedCriteriaUpdate = () => HttpMethodWithSwagger({ ...cfg.operation.update, body: UpdateGradedCriteriaDto });

export const SwaggerGradedCriteriaDelete = () => HttpMethodWithSwagger(cfg.operation.delete);

export const SwaggerGradedCriteriaGetAll = () => HttpMethodWithSwagger(cfg.operation.getAll);

export const SwaggerGradedCriteriaGetById = () => HttpMethodWithSwagger(cfg.operation.getById);

export const SwaggerGradedCriteriaGetByFilters = () => HttpMethodWithSwagger({ ...cfg.operation.getByFilters, body: FilterGradedCriteriaDto });
