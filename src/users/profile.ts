import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  public photo: string;

  @Column({ nullable: true })
  public background: string;

  @OneToOne(() => Users, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'users_id' })
  public users: Users;
}
