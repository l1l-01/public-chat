import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Msg } from "./msg.entity.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  // one user → many messages
  @OneToMany(() => Msg, (msg) => msg.user)
  msgs!: Msg[];

  @Column({ length: 20 })
  username!: string;

  @CreateDateColumn()
  createdDate!: Date;
}
