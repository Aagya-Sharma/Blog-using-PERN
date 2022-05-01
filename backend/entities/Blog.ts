import {Entity,BaseEntity,PrimaryGeneratedColumn,Column,CreateDateColumn,
    UpdateDateColumn,ManyToOne,ManyToMany,JoinTable} from "typeorm";
import {User} from "./User";
import {Category} from "./Category";


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
      nullable: true,
      unique: false,
    })
  excerpt!: string;

    @Column({
        type: "varchar",
        nullable: false,
        unique: false,
      })
    imageurl!: string;

    @ManyToOne(() => Category, Category => Category.blogs)
    category!: Category;
    
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(() => User, user => user.blogs)
    user!: User;

   
}
