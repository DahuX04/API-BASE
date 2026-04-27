import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/commons/base.dtos';

export class CreatePerformanceLevelDto extends BaseDto {
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

	@IsOptional()
	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'description_example', required: false })
	description?: string;

	@IsNumber()
	@ApiProperty({ example: 1, required: true })
	min_score: number;

	@IsNumber()
	@ApiProperty({ example: 1, required: true })
	max_score: number;

	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'evaluation_type_example', required: true })
	evaluation_type: string;

	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'color_example', required: true })
	color: string;
}

export class UpdatePerformanceLevelDto extends BaseDto {
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
	@Length(1, 1000)
	@ApiProperty({ example: 'description_example', required: false })
	description?: string;

	@IsOptional()
	@IsNumber()
	@ApiProperty({ example: 1, required: false })
	min_score?: number;

	@IsOptional()
	@IsNumber()
	@ApiProperty({ example: 1, required: false })
	max_score?: number;

	@IsOptional()
	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'evaluation_type_example', required: false })
	evaluation_type?: string;

	@IsOptional()
	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'color_example', required: false })
	color?: string;
}

export class FilterPerformanceLevelDto extends BaseDto {
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
	@ApiProperty({ example: 'description_example', required: false })
	description?: string;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	min_score?: number;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	max_score?: number;

	@IsOptional()
	@ApiProperty({ example: 'evaluation_type_example', required: false })
	evaluation_type?: string;

	@IsOptional()
	@ApiProperty({ example: 'color_example', required: false })
	color?: string;
}
