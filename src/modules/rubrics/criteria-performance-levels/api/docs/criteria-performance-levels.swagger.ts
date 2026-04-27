import { ControllerWithTags, HttpMethodWithSwagger } from 'src/commons/base.decorator';
import { criteriaPerformanceLevelsRoutes } from '../../config/criteria-performance-levels.routes';
import { CreateCriteriaPerformanceLevelDto, UpdateCriteriaPerformanceLevelDto, FilterCriteriaPerformanceLevelDto } from '../../model/criteria-performance-levels.dtos';

const cfg = criteriaPerformanceLevelsRoutes.criteria_performance_levels;

export const SwaggerCriteriaPerformanceLevelController = () => ControllerWithTags({ tag: cfg.tag, route: cfg.route });

export const SwaggerCriteriaPerformanceLevelCreate = () => HttpMethodWithSwagger({ ...cfg.operation.create, body: CreateCriteriaPerformanceLevelDto });

export const SwaggerCriteriaPerformanceLevelUpdate = () => HttpMethodWithSwagger({ ...cfg.operation.update, body: UpdateCriteriaPerformanceLevelDto });

export const SwaggerCriteriaPerformanceLevelDelete = () => HttpMethodWithSwagger(cfg.operation.delete);

export const SwaggerCriteriaPerformanceLevelGetAll = () => HttpMethodWithSwagger(cfg.operation.getAll);

export const SwaggerCriteriaPerformanceLevelGetById = () => HttpMethodWithSwagger(cfg.operation.getById);

export const SwaggerCriteriaPerformanceLevelGetByFilters = () => HttpMethodWithSwagger({ ...cfg.operation.getByFilters, body: FilterCriteriaPerformanceLevelDto });
