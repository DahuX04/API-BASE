import { ControllerWithTags, HttpMethodWithSwagger } from 'src/commons/base.decorator';
import { routes } from '../../config/parameters.routes';
import { CreateParameterDto, UpdateParameterDto, FilterParameterDto } from '../../model/parameters.dtos';

export const SwaggerParameterController = () => ControllerWithTags({ tag: routes.tag, route: routes.route });

export const SwaggerParameterCreate = () => HttpMethodWithSwagger({ ...routes.operation.create, body: CreateParameterDto });

export const SwaggerParameterUpdate = () => HttpMethodWithSwagger({ ...routes.operation.update, body: UpdateParameterDto });

export const SwaggerParameterDelete = () => HttpMethodWithSwagger(routes.operation.delete);

export const SwaggerParameterGetAll = () => HttpMethodWithSwagger(routes.operation.getAll);

export const SwaggerParameterGetById = () => HttpMethodWithSwagger(routes.operation.getById);

export const SwaggerParameterGetByFilters = () => HttpMethodWithSwagger({ ...routes.operation.getByFilters, body: FilterParameterDto });

export const SwaggerParameterReset = () => HttpMethodWithSwagger({ ...routes.operation.reset });
