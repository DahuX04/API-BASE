import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseService } from 'src/commons/base.service';
import { UserRepository } from '../core/users.repository';
import * as bcrypt from 'bcryptjs';
import { UserValidation } from '../core/users.validation';
import { CreateUserDto, ROLE_CODES, RoleCode, UpdateUserDto } from '../model/users.dtos';
import { JwtService } from '@nestjs/jwt';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class UserService extends BaseService<UserRepository> {
	constructor(
		protected readonly repository: UserRepository,
		protected readonly dataSource: DataSource,
		private readonly jwtService: JwtService,
	) {
		super(repository);
	}

	// %% FUNCTIONES
	signJWTWithRoles(user: any, activeRole?: RoleCode): string {
		const allowedRoles: RoleCode[] = [];

		if (user.is_admin) allowedRoles.push(ROLE_CODES.ADMIN);
		if (user.person?.staff) allowedRoles.push(ROLE_CODES.STAFF);
		if (user.person?.patient) allowedRoles.push(ROLE_CODES.PATIENT);

		if (!activeRole) activeRole = allowedRoles[0];
		else if (!allowedRoles.includes(activeRole)) activeRole = allowedRoles[0];

		const payload = {
			userId: user.id,
			user: user,
			activeRole: activeRole,
			allowedRoles: allowedRoles,
		};

		return this.jwtService.sign(payload);
	}
	async createUserLogin(user: any, passToValidate: string | null, role?: RoleCode) {
		if (!user) throw new UnauthorizedException('Credenciales inválidas');
		if (passToValidate != null && !(await bcrypt.compare(passToValidate, user.password))) throw new UnauthorizedException('Credenciales inválidas');
		return this.signJWTWithRoles(user, role);
	}
	async getUser(user_id?: number | null, email?: string | null) {
		const relations = ['person', 'person.patient', 'person.staff', 'person.sex_type', 'person.document_type'];
		if (user_id) {
			return await this.baseRepository.findOneByCondition({
				where: { id: user_id, is_active: 1 },
				relations: relations,
			});
		}
		if (email) {
			return await this.baseRepository.findOneByCondition({
				where: { email: email, is_active: 1 },
				relations: relations,
			});
		}
		return null;
	}

	// %% SERVICIOS PROPIOS
	async loginById(user_id: number, role?: RoleCode) {
		const user = await this.getUser(user_id);
		const at = await this.createUserLogin(user, null, role);
		return {
			user: user,
			access_token: at,
		};
	}

	async loginByCredentials(email: string, password: string, role?: RoleCode) {
		const user = await this.getUser(null, email);
		const at = await this.createUserLogin(user, password, role);
		return {
			user: user,
			access_token: at,
		};
	}

	// %% SERVICIOS HEREDADOS
	async create(dto: CreateUserDto, manager?: EntityManager) {
		await UserValidation.validateCreate(this.repository, dto);
		return await super.create(dto, manager);
	}

	async update(id: number, dto: UpdateUserDto, manager?: EntityManager) {
		await UserValidation.validateUpdate(this.repository, id, dto);
		return await super.update(id, dto, manager);
	}

	async delete(id: number, manager?: EntityManager) {
		await UserValidation.validateDelete(this.repository, id);
		return await super.delete(id, manager);
	}
}
