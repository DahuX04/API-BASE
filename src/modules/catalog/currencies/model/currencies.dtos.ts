import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/commons/base.dtos';

// auto-generated

// %% CREATE DTO
export class CreateCurrencyDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'name_example', required: true })
	name: string;

	@IsString()
	@Length(1, 100)
	@ApiProperty({ example: 'symbol_example', required: true })
	symbol: string;
}

// %% UPDATE DTO
export class UpdateCurrencyDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsOptional()
	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'name_example', required: false })
	name?: string;

	@IsOptional()
	@IsString()
	@Length(1, 100)
	@ApiProperty({ example: 'symbol_example', required: false })
	symbol?: string;
}

// %% FILTER DTO
export class FilterCurrencyDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsOptional()
	@ApiProperty({ example: 'name_example', required: false })
	name?: string;

	@IsOptional()
	@ApiProperty({ example: 'symbol_example', required: false })
	symbol?: string;
}

// %% OTHERS DTO
