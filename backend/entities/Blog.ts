import {Entity,BaseEntity,PrimaryGeneratedColumn,Column,CreateDateColumn,
    UpdateDateColumn,ManyToOne,OneToMany} from "typeorm";
import {User} from "./User";

@Entity()
export class Blog extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({
      type: "varchar",
      nullable: false,
      unique: true,
    })
    title!: string;

    @Column({
        type: "varchar",
        nullable: false,
        unique: false,
      })
    desc!: string;

    @Column({
        type: "varchar",
        nullable: false,
        unique: false,
      })
    imageurl!: string;

 

    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => User, user => user.blogs)
    user!: User;

   
}
