import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public photo: string;

  @OneToOne(() => Users, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'users_id' })
  public users: Users;
}
