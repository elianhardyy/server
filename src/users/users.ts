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
} from 'typeorm';
import { Role } from 'src/roles/role.enum';
import { Profile } from './profile';
@Entity('users')
export class Users {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  public id: string;

  @Column()
  public firstname: string;

  @Column()
  public lastname: string;

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
}
