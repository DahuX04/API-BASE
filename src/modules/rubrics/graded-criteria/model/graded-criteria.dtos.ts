import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/commons/base.dtos';

export class CreateGradedCriteriaDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsNumber()
	@ApiProperty({ example: 1, required: true })
	graded_outcome_id: number;

	@IsNumber()
	@ApiProperty({ example: 1, required: true })
	outcome_criteria_id: number;

	@IsNumber()
	@ApiProperty({ example: 1, required: true })
	criteria_score: number;
}

export class UpdateGradedCriteriaDto extends BaseDto {
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
	graded_outcome_id?: number;

	@IsOptional()
	@IsNumber()
	@ApiProperty({ example: 1, required: false })
	outcome_criteria_id?: number;

	@IsOptional()
	@IsNumber()
	@ApiProperty({ example: 1, required: false })
	criteria_score?: number;
}

export class FilterGradedCriteriaDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	graded_outcome_id?: number;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	outcome_criteria_id?: number;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	criteria_score?: number;
}
