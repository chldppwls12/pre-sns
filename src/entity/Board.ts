import { HashTag } from "./HashTag";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "@entity/User";
import { BoardLike } from "@entity/BoardLike";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  title: string;

  @Column({ type: "tinytext" })
  content: string;

  @Column({ default: 0 })
  hits: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp" })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.boards)
  user: User;

  @OneToMany(() => BoardLike, (boardLike) => boardLike.board)
  likes: BoardLike[];

  @ManyToMany(() => HashTag, (hashTag) => hashTag.boards)
  @JoinTable({
    name: "boards_hashTags",
    joinColumn: {
      name: "boardId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "hashTagId",
      referencedColumnName: "id",
    },
  })
  hashTags: HashTag[];
}
