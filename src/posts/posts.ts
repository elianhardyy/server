import { Users } from './../users/users';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationCount,
} from 'typeorm';
import { Comments } from './comments';

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public caption: string;

  @Column({ nullable: true })
  public image: string;

  @Column({ nullable: true })
  public video: string;

  @ManyToMany(() => Users, { cascade: true })
  @JoinTable()
  public like: Users[];

  @ManyToMany(() => Users, { cascade: true })
  @JoinTable()
  public dislike: Users[];

  @RelationCount((post: Posts) => post.like)
  public likeCount: number;

  @RelationCount((post: Posts) => post.dislike)
  public dislikeCount: number;

  @Column()
  @CreateDateColumn()
  public created_at: Date;

  @OneToMany(() => Comments, (comment) => comment.post)
  public comment: Comments[];

  @ManyToOne(() => Users, (user) => user.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'users_id' })
  public users: Users;
}
