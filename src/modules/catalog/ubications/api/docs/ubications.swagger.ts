import { ControllerWithTags, HttpMethodWithSwagger } from 'src/commons/base.decorator';
import { ubicationsRoutes } from '../../config/ubications.routes';
import { CreateUbicationDto, UpdateUbicationDto, FilterUbicationDto } from '../../model/ubications.dtos';

const cfg = ubicationsRoutes.ubications;

export const SwaggerUbicationController = () => ControllerWithTags({ tag: cfg.tag, route: cfg.route });

export const SwaggerUbicationCreate = () => HttpMethodWithSwagger({ ...cfg.operation.create, body: CreateUbicationDto });

export const SwaggerUbicationUpdate = () => HttpMethodWithSwagger({ ...cfg.operation.update, body: UpdateUbicationDto });

export const SwaggerUbicationDelete = () => HttpMethodWithSwagger(cfg.operation.delete);

export const SwaggerUbicationGetAll = () => HttpMethodWithSwagger(cfg.operation.getAll);

export const SwaggerUbicationGetById = () => HttpMethodWithSwagger(cfg.operation.getById);

export const SwaggerUbicationGetByFilters = () => HttpMethodWithSwagger({ ...cfg.operation.getByFilters, body: FilterUbicationDto });
