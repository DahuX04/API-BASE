import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/commons/base.dtos';

// auto-generated

// %% CREATE DTO
export class CreateTypeDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsNumber()
	@ApiProperty({ example: 1, required: true })
	type_group_id: number;

	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'name_example', required: true })
	name: string;

	@IsBoolean()
	@ApiProperty({ example: true, required: true })
	is_editable: boolean;
}

// %% UPDATE DTO
export class UpdateTypeDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsOptional()
	@IsNumber()
	@ApiProperty({ example: 1, required: false })
	type_group_id?: number;

	@IsOptional()
	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'name_example', required: false })
	name?: string;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_editable?: boolean;
}

// %% FILTER DTO
export class FilterTypeDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	type_group_id?: number;

	@IsOptional()
	@ApiProperty({ example: 'name_example', required: false })
	name?: string;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_editable?: boolean;
}

// %% OTHERS DTO
