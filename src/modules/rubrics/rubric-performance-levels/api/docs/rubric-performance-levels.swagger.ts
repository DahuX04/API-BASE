import { ControllerWithTags, HttpMethodWithSwagger } from 'src/commons/base.decorator';
import { rubricPerformanceLevelsRoutes } from '../../config/rubric-performance-levels.routes';
import { CreateRubricPerformanceLevelDto, UpdateRubricPerformanceLevelDto, FilterRubricPerformanceLevelDto } from '../../model/rubric-performance-levels.dtos';

const cfg = rubricPerformanceLevelsRoutes.rubric_performance_levels;

export const SwaggerRubricPerformanceLevelController = () => ControllerWithTags({ tag: cfg.tag, route: cfg.route });

export const SwaggerRubricPerformanceLevelCreate = () => HttpMethodWithSwagger({ ...cfg.operation.create, body: CreateRubricPerformanceLevelDto });

export const SwaggerRubricPerformanceLevelUpdate = () => HttpMethodWithSwagger({ ...cfg.operation.update, body: UpdateRubricPerformanceLevelDto });

export const SwaggerRubricPerformanceLevelDelete = () => HttpMethodWithSwagger(cfg.operation.delete);

export const SwaggerRubricPerformanceLevelGetAll = () => HttpMethodWithSwagger(cfg.operation.getAll);

export const SwaggerRubricPerformanceLevelGetById = () => HttpMethodWithSwagger(cfg.operation.getById);

export const SwaggerRubricPerformanceLevelGetByFilters = () => HttpMethodWithSwagger({ ...cfg.operation.getByFilters, body: FilterRubricPerformanceLevelDto });
