import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { Board } from "@entity/Board";

@Entity()
export class BoardLike {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => Board, (board) => board.likes)
  board: Board;
}
