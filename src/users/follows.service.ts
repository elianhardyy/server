import { Follows } from './follows';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users';
@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follows) private followRepository: Repository<Follows>,
  ) {}

  //post
  public async follow(req: any, id: any) {
    const relation = new Follows();
    relation.follower = req.user.id;
    relation.followed = id;
    const newRelation = this.followRepository.create(relation);
    if (newRelation.followed == newRelation.follower) {
      throw new BadRequestException('Cannot Match');
    }
    // //checking if have followed
    // const p = await this.followRepository.findOne({
    //   where: { follower: req.user.id },
    // });
    // if (!p >) {
    //   const l = await this.followRepository.count({
    //     where: { followed: p.followed },
    //   });
    //   console.log(l);
    //   if (l > 1) {
    //     throw new BadRequestException('You have follow');
    //   }
    // }

    return this.followRepository.save(newRelation);
  }
  //get
  public async follower(req: any) {
    //follower didapatkan dari jumlah kolom follower
    //follower is taken from follower num rows in follower column
    const haveRelation = await this.followRepository.count({
      where: { followed: { id: req.user.id } },
      relations: { followed: true },
    });

    return haveRelation;
  }
  public async following(req: any) {
    //following didapatkan dari jumlah seluruh kolom followed
    //following is taken from followed num rows in followed column
    const getRelation = await this.followRepository.count({
      where: { follower: { id: req.user.id } },
      relations: { follower: true },
    });

    return getRelation;
  }

  //delete
  public async unfollow(req: any, id: any) {
    const relation = await this.followRepository.findOne({
      where: { follower: req.user.id },
    });
    relation.followed = id;
    return this.followRepository.remove(relation);
  }
}
