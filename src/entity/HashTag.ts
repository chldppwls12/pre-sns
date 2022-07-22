import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Board } from "@entity/Board";

@Entity()
export class HashTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @ManyToMany(() => Board, (board) => board.hashTags)
  boards: Board[];
}
