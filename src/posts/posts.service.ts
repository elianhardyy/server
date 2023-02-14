import { Users } from './../users/users';
import { Profile } from './../users/profile';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './posts';
import { Comments } from './comments';
import { Stories } from './stories';
import * as fs from 'fs';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postService: Repository<Posts>,
    @InjectRepository(Comments) private commentService: Repository<Comments>,
    @InjectRepository(Stories) private storiesService: Repository<Stories>,
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
  public async postVideo(req: any, caption: string, video: any) {
    const posts: Posts = new Posts();
    posts.users = req.user.id;
    posts.caption = caption;
    posts.video = video;
    const newPostVideo = this.postService.create(posts);
    return this.postService.save(newPostVideo);
  }
  public async comment(id: number, comment: string, req: any) {
    const byid = await this.postService.findOne({ where: { id: id } });
    const comments: Comments = new Comments();
    comments.post.id = byid.id;
    comments.user.id = req.user.id;
    comments.comment = comment;
    const newComments = this.commentService.create(comments);
    return this.commentService.save(newComments);
  }

  public async like(req: any, id: number) {
    const insert = this.postService.query(
      'INSERT INTO `posts_like_users`(`postsId`, `usersId`) VALUES (?,?)',
      [id, req.user.id],
    );
    const count = this.postService.query(
      'SELECT COUNT(*) FROM `post_like_users`',
    );
    return { count, insert };
  }
  public async dislike(req: any, id: number) {
    const insert = this.postService.query(
      'INSERT INTO `posts_dislike_users`(`postsId`, `usersId`) VALUES (?,?)',
      [id, req.user.id],
    );
    const count = this.postService.query(
      'SELECT COUNT(*) FROM `post_like_users`',
    );
    return { count, insert };
  }
  public async deleteLike(id: number) {
    const remove = this.postService.query(
      'DELETE FROM `posts_like_users` WHERE id=?',
      [id],
    );
    return remove;
  }
  public async deleteDislike(id: number) {
    const remove = this.postService.query(
      'DELETE FROM `posts_dislike_users` WHERE id=?',
      [id],
    );
    return remove;
  }

  public uploadStories(req: any, file: any) {
    const stories: Stories = new Stories();
    stories.user = req.user.id;
    stories.stories = file;
    const newStories = this.storiesService.create(stories);
    return this.storiesService.save(newStories);
  }

  public async deleteStories(req: any) {
    const findStory = await this.storiesService.findOne({
      where: { user: { id: req.user.id } },
      relations: { user: true },
    });

    const file = findStory.stories;
    try {
      fs.unlinkSync(`./public/${file}`);
      this.storiesService.remove(findStory);
      return { msg: 'success deleted story' };
    } catch (error) {
      return { msg: error };
    }
  }
}
