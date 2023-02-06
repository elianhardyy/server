import { Users } from './../users/users';
import { Profile } from './../users/profile';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postService: Repository<Post>,
    @InjectRepository(Users) private userService: Repository<Users>,
  ) {}

  public async captiononly(
    caption: string,
    comment: string,
    username: string,
    req: any,
  ) {
    const posts: Post = new Post();
    const profile = await this.userService.findOne({
      relations: { profile: true },
      where: { id: req.user.id },
    });
    posts.caption = caption;
    posts.comments = {
      comment: comment,
      profile: profile.profile.photo,
      username: username,
      user: req.user.id,
    };
    // const newCaptionOnly = this.postService.create(posts);

    return this.postService.save(posts);
  }
  public async captionall() {}
}
