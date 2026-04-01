import { IsBoolean, IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/commons/base.dtos';

// auto-generated

// %% CREATE DTO
export class CreateUserDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsString()
	@Length(1, 500)
	@ApiProperty({ example: 'email_example', required: true })
	email: string;

	@IsBoolean()
	@ApiProperty({ example: true, required: true })
	is_admin: boolean;
}

// %% UPDATE DTO
export class UpdateUserDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsOptional()
	@IsString()
	@Length(1, 500)
	@ApiProperty({ example: 'email_example', required: false })
	email?: string;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({ example: true, required: false })
	is_admin?: boolean;
}

// %% FILTER DTO
export class FilterUserDto extends BaseDto {
	@IsOptional()
	@ApiProperty({ example: { key: 'extra_value' }, required: false })
	extra?: any;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_active?: boolean;

	@IsOptional()
	@ApiProperty({ example: 'email_example', required: false })
	email?: string;

	@IsOptional()
	@ApiProperty({ example: true, required: false })
	is_admin?: boolean;
}

// %% OTHERS DTO
export class LoginUserByCredentialsDto {
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}

export class ChangeRoleDto {
	@IsString()
	newRole: RoleCode;
}

// %% OTHERS CONSTANTS
export const ROLE_CODES = {
	ADMIN: 'ADMIN',
	STAFF: 'STAFF',
	PATIENT: 'PATIENT',
} as const;

export type RoleCode = (typeof ROLE_CODES)[keyof typeof ROLE_CODES];
