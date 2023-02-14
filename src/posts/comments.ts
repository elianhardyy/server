import { Users } from './../users/users';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './posts';

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Posts, (post) => post.comment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'posts_id' })
  public post: Posts;

  @ManyToOne(() => Users, (user) => user.comment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'users_id' })
  public user: Users;

  @Column({ nullable: true })
  public comment: string;
}
