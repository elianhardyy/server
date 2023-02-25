import { Users } from './../users/users';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('connections')
export class Connection {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public socketId: string;

  @ManyToOne(() => Users, (user) => user.connection)
  @JoinColumn()
  public connectedUser: Users;
}
