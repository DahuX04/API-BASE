import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/commons/base.dtos';

// auto-generated

// %% CREATE DTO
export class CreateParameterDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsString()
	@ApiProperty({ example: 'value_example', required: true })
	value: string;

	@IsOptional()
	@IsString()
	@Length(1, 5000)
	@ApiProperty({ example: 'description_example', required: false })
	description?: string;

	@IsBoolean()
	@ApiProperty({ example: true, required: true })
	is_json: boolean;

	@IsBoolean()
	@ApiProperty({ example: true, required: true })
	is_encrypted: boolean;
}

// %% UPDATE DTO
export class UpdateParameterDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'value_example', required: false })
	value?: string;

	@IsOptional()
	@IsString()
	@Length(1, 5000)
	@ApiProperty({ example: 'description_example', required: false })
	description?: string;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_json?: boolean;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_encrypted?: boolean;
}

// %% FILTER DTO
export class FilterParameterDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsOptional()
	@ApiProperty({ example: 'value_example', required: false })
	value?: string;

	@IsOptional()
	@ApiProperty({ example: 'description_example', required: false })
	description?: string;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_json?: boolean;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_encrypted?: boolean;
}

// %% OTHERS DTO
