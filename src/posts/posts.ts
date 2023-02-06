import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public caption: string;

  @Column({ nullable: true })
  public image: string;

  @Column({ nullable: true })
  public video: string;

  @Column({ type: 'simple-array', nullable: true })
  public like: string[];

  @Column({ type: 'simple-array', nullable: true })
  public dislike: string[];

  @Column({ type: 'simple-json', nullable: true })
  public comments: {
    user: number;
    username: string;
    profile: string;
    comment: string;
  };
}
