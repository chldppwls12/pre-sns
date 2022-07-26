import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { BoardHit } from "@entity/BoardHit";
import { Board } from "@entity/Board";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "tinytext" })
  password: string;

  @Column({ type: "tinytext" })
  salt: string;

  @Column({ type: "tinytext" })
  iv: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp" })
  deletedAt: Date;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @OneToMany(() => BoardHit, (boardHit) => boardHit.user)
  hits: BoardHit[];
}
