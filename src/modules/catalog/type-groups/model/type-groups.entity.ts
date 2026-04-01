import { Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/commons/base.entity';
import { NameColumn, CodeColumn, BooleanColumn } from 'src/commons/configs/db.configs';
import { TypeEntity } from 'src/modules/catalog/types/model/types.entity';

@Entity({ name: 'type_groups' })
export class TypeGroupEntity extends BaseEntity {
	// %% ATRIBUTOS
	@CodeColumn()
	code: string;

	@NameColumn({ nullable: false })
	name: string;

	@BooleanColumn({ nullable: false, withDefault: true, default: false })
	is_editable: boolean;

	// %% RELACIONES

	@OneToMany(() => TypeEntity, (x) => x.type_group)
	types: TypeEntity[];
}
