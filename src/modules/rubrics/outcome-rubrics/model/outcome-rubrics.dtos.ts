import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/commons/base.dtos';

export class CreateOutcomeRubricDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsNumber()
	@ApiProperty({ example: 1, required: true })
	rubric_id: number;

	@IsNumber()
	@ApiProperty({ example: 1, required: true })
	outcome_id: number;

	@IsNumber()
	@ApiProperty({ example: 1, required: true })
	outcome_score: number;

	@IsNumber()
	@ApiProperty({ example: 1, required: true })
	max_level: number;

	@IsBoolean()
	@ApiProperty({ example: true, required: true })
	is_visible: boolean;
}

export class UpdateOutcomeRubricDto extends BaseDto {
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
	rubric_id?: number;

	@IsOptional()
	@IsNumber()
	@ApiProperty({ example: 1, required: false })
	outcome_id?: number;

	@IsOptional()
	@IsNumber()
	@ApiProperty({ example: 1, required: false })
	outcome_score?: number;

	@IsOptional()
	@IsNumber()
	@ApiProperty({ example: 1, required: false })
	max_level?: number;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_visible?: boolean;
}

export class FilterOutcomeRubricDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	rubric_id?: number;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	outcome_id?: number;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	outcome_score?: number;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	max_level?: number;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_visible?: boolean;
}
