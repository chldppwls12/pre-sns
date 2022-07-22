import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { User } from "@entity/User";
import { Board } from "@entity/Board";

@Entity()
export class BoardHit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200 })
  ipAddress: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => Board, (board) => board.hits)
  board: Board;

  @ManyToOne(() => User, (user) => user.hits)
  user: User;
}
