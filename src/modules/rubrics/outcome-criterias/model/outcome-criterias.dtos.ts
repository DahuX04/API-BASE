import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/commons/base.dtos';

export class CreateOutcomeCriteriaDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsNumber()
	@ApiProperty({ example: 1, required: true })
	outcome_rubric_id: number;

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
	max_value: number;
}

export class UpdateOutcomeCriteriaDto extends BaseDto {
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
	outcome_rubric_id?: number;

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
	max_value?: number;
}

export class FilterOutcomeCriteriaDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	outcome_rubric_id?: number;

	@IsOptional()
	@ApiProperty({ example: 'name_example', required: false })
	name?: string;

	@IsOptional()
	@ApiProperty({ example: 'description_example', required: false })
	description?: string;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	max_value?: number;
}
