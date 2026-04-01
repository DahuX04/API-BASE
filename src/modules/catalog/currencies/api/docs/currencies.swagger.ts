import { ControllerWithTags, HttpMethodWithSwagger } from 'src/commons/base.decorator';
import { currenciesRoutes } from '../../config/currencies.routes';
import { CreateCurrencyDto, UpdateCurrencyDto, FilterCurrencyDto } from '../../model/currencies.dtos';

const cfg = currenciesRoutes.currencies;

export const SwaggerCurrencyController = () => ControllerWithTags({ tag: cfg.tag, route: cfg.route });

export const SwaggerCurrencyCreate = () => HttpMethodWithSwagger({ ...cfg.operation.create, body: CreateCurrencyDto });

export const SwaggerCurrencyUpdate = () => HttpMethodWithSwagger({ ...cfg.operation.update, body: UpdateCurrencyDto });

export const SwaggerCurrencyDelete = () => HttpMethodWithSwagger(cfg.operation.delete);

export const SwaggerCurrencyGetAll = () => HttpMethodWithSwagger(cfg.operation.getAll);

export const SwaggerCurrencyGetById = () => HttpMethodWithSwagger(cfg.operation.getById);

export const SwaggerCurrencyGetByFilters = () => HttpMethodWithSwagger({ ...cfg.operation.getByFilters, body: FilterCurrencyDto });
