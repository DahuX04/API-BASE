import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/commons/base.dtos';

export class CreateUserDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsNumber()
	@Length(1, 50)
	@ApiProperty({ example: 1, required: true })
	document_type_id: number;

	@IsNumber()
	@ApiProperty({ example: 1, required: true })
	document_code: number;

	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'first_name_example', required: true })
	first_name: string;

	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'last_name_example', required: true })
	last_name: string;

	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'email_example', required: true })
	email: string;

	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'phone_example', required: true })
	phone: string;
}

export class UpdateUserDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsOptional()
	@IsNumber()
	@Length(1, 50)
	@ApiProperty({ example: 1, required: false })
	document_type_id?: number;

	@IsOptional()
	@IsNumber()
	@ApiProperty({ example: 1, required: false })
	document_code?: number;

	@IsOptional()
	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'first_name_example', required: false })
	first_name?: string;

	@IsOptional()
	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'last_name_example', required: false })
	last_name?: string;

	@IsOptional()
	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'email_example', required: false })
	email?: string;

	@IsOptional()
	@IsString()
	@Length(1, 1000)
	@ApiProperty({ example: 'phone_example', required: false })
	phone?: string;
}

export class FilterUserDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	document_type_id?: number;

	@IsOptional()
	@ApiProperty({ example: 1, required: false })
	document_code?: number;

	@IsOptional()
	@ApiProperty({ example: 'first_name_example', required: false })
	first_name?: string;

	@IsOptional()
	@ApiProperty({ example: 'last_name_example', required: false })
	last_name?: string;

	@IsOptional()
	@ApiProperty({ example: 'email_example', required: false })
	email?: string;

	@IsOptional()
	@ApiProperty({ example: 'phone_example', required: false })
	phone?: string;
}
