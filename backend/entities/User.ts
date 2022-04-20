
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    getCustomRepository,
  } from "typeorm";
  
  @Entity("user")
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({
      type: "varchar",
      nullable: true,
      unique: false,
    })
    username!: string;
  
    @Column({
      type: "varchar",
      nullable: true,
      unique: false,
    })
    password!: string;
  
    @Column({
      type: "varchar",
      nullable: true,
      unique: false,
    })
    useremail!: string;
    
    @Column({
      type: "varchar",
      nullable: true,
      unique: false,
    })
    role!: string;

    @Column({
      type: "varchar",
      enum: ['Pending', 'Active'],
      default: 'Pending'
    })
    status!: string;

    @Column({
      type: "varchar",
      nullable: true,
      unique: true,
    })
    confirmationCode!: string;

    @Column({
      type: "varchar",
      nullable: true,
      unique: true,
    })
    resetPasswordToken!: string;

    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  }