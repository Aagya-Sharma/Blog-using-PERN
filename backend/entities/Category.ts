import {Entity,    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    getCustomRepository,
    } from "typeorm";
  import { Blog } from "./Blog";

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
    
    @OneToMany(() => Blog, blog => blog.category)
    // @JoinColumn({name: 'id'})
    blogs!: Blog[];

    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
}
