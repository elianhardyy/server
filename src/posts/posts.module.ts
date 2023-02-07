import { Users } from './../users/users';
import { Profile } from './../users/profile';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts';
import { Comments } from './comments';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Profile, Users, Comments])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
