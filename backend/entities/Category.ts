import {Entity,    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    getCustomRepository,} from "typeorm";

@Entity()
export class Category extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({
      type: "varchar",
      nullable: true,
      unique: false,
    })
    name!: string;

    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
}
