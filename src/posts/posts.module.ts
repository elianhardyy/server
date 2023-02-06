import { Users } from './../users/users';
import { Profile } from './../users/profile';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Profile, Users])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
