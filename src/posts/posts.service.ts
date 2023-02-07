import { Users } from './../users/users';
import { Profile } from './../users/profile';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './posts';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postService: Repository<Posts>,
    @InjectRepository(Users) private userService: Repository<Users>,
  ) {}

  public async captiononly(caption: string, req: any) {
    const posts: Posts = new Posts();

    posts.users = req.user.id;
    posts.caption = caption;
    // posts.comments = {
    //   comment: comment,
    //   profile: profile.profile.photo,
    //   username: req.user.username,
    //   user: req.user.id,
    // };

    // const newCaptionOnly = this.postService.create(posts);

    return this.postService.save(posts);
  }
  public async captionall() {}
  public async comment(id: number, comment: string, req: any) {
    //const posts: Posts = new Posts();
    const byid = await this.postService.findOne({ where: { id: id } });
    const profile = await this.userService.findOne({
      relations: { profile: true },
      where: { id: req.user.id },
    });
    // const comments: any[] = byid.comments;
    // const postcomment = {
    //   comment: comment,
    //   profile: profile.profile.photo,
    //   username: req.user.username,
    //   user: req.user.id,
    // };
    // comments.push(postcomment);

    return this.postService.save(byid);
  }
}
