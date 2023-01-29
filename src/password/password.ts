import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity('password_reset')
export class Password {
  @PrimaryColumn()
  @Index()
  public email: string;

  @Column({ unique: true })
  public token: string;

  @Column()
  @CreateDateColumn()
  public created_at: Date;
}
