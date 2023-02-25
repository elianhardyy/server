import { Posts } from './../posts/posts';
import { UsersValidator } from '../validator/user.validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Generated,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Comments } from '../posts/comments';
import { Role } from '../roles/role.enum';
import { Profile } from './profile';
import { Follows } from './follows';
import { Stories } from '../posts/stories';
import { Connection } from '../websocket/connection';
@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstname: string;

  @Column()
  public lastname: string;

  @Column()
  public username: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ default: false })
  public is_active: boolean;

  @Column()
  @CreateDateColumn()
  public created_at: Date;

  @Column()
  @UpdateDateColumn()
  public updated_at: Date;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  public roles: Role[];

  @OneToOne(() => Profile, (profile) => profile.users)
  public profile: Profile;

  @OneToMany(() => Posts, (post) => post.users)
  public posts: Posts[];

  @OneToMany(() => Comments, (comment) => comment.post)
  public comment: Comments[];

  @OneToMany(() => Follows, (comment) => comment.follower)
  public follower: Follows[];

  @OneToMany(() => Follows, (comment) => comment.followed)
  public followed: Follows[];

  @OneToMany(() => Stories, (story) => story.user)
  public story: Stories[];

  @OneToMany(() => Connection, (connection) => connection.connectedUser)
  public connection: Connection[];
}
