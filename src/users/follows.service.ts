import { Follows } from './follows';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follows) private followRepository: Repository<Follows>,
  ) {}

  //post
  public async follow(req: any, id: number) {
    const relation = new Follows();
    relation.follower = req.user.id;
    relation.followed = id;
    const newRelation = this.followRepository.create(relation);
    if (newRelation.followed == newRelation.follower) {
      throw new BadRequestException('Cannot Match');
    }
    //checking if have followed
    const p = await this.followRepository.findOne({
      where: { follower: req.user.id },
    });
    if (p != null) {
      const l = await this.followRepository.count({
        where: { followed: p.followed },
      });
      console.log(l);
      if (l > 1) {
        throw new BadRequestException('You have follow');
      }
    }

    return this.followRepository.save(newRelation);
  }
  //get
  public async follower() {}
  public async following() {}
}
