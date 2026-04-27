import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/commons/base.dtos';

export class CreateRubricDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsNumber()
	@ApiProperty({ example: 1, required: true })
	assessment_id: number;

	@IsOptional()
	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'description_example', required: false })
	description?: string;

	@IsBoolean()
	@ApiProperty({ example: true, required: true })
	is_graded_score: boolean;

	@IsBoolean()
	@ApiProperty({ example: true, required: true })
	is_editable: boolean;

	@IsNumber()
	@ApiProperty({ example: 1, required: true })
	max_score: number;
}

export class UpdateRubricDto extends BaseDto {
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
	assessment_id?: number;

	@IsOptional()
	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'description_example', required: false })
	description?: string;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_graded_score?: boolean;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_editable?: boolean;

	@IsOptional()
	@IsNumber()
	@ApiProperty({ example: 1, required: false })
	max_score?: number;
}

export class FilterRubricDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	assessment_id?: number;

	@IsOptional()
	@ApiProperty({ example: 'description_example', required: false })
	description?: string;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_graded_score?: boolean;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_editable?: boolean;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	max_score?: number;
}
