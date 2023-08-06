import { Profile } from './profile';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { Request } from 'express';
import { Background } from './backgorund';
@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Background) private bgRepository: Repository<Background>,
  ) {}
  public async add(user: any, photo: any) {
    const profiles: Profile = new Profile();
    profiles.users = user;
    profiles.photo = photo;
    const newProfile = this.profileRepository.create(profiles);
    // newProfile.photo = photou;
    // newProfile.users = userid;
    return this.profileRepository.save(newProfile);
  }
  public async bg(req: any, background: any) {
    try {
      const getUsername = await this.bgRepository.findOne({
        where: { users: { id: req.user.id } },
        relations: { users: true },
      });
      getUsername.background = background;
      return this.bgRepository.save(getUsername);
    } catch (error) {
      throw new BadRequestException('Upload your profile photo first');
    }
  }
  public async updateProfile(req: any, photo: any) {
    //const profile: Profile = new Profile();
    const findProfile = await this.profileRepository.findOne({
      where: { users: { id: req.user.id } },
      relations: { users: true },
    });
    let image = '';
    const oldImage = req.body.oldImage;
    const file = findProfile.photo;
    // const checkfile = fs.existsSync(`./public/${file}`);
    // if (!profile.photo) {
    // }
    if (photo) {
      image = photo; //file interceptor
      try {
        fs.unlinkSync(`./public/${file}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      image = file;
      //image = file;
    }
    findProfile.photo = image;
    //findProfile.users.id = req.user.id;
    const updatePhoto = this.profileRepository.save(findProfile);
    return updatePhoto;
  }
  public async deleteProfile(req: any) {
    const findProfile = await this.profileRepository.findOne({
      where: { users: { id: req.user.id } },
      relations: { users: true },
    });
    //findProfile.users.id = req.user.id;
    const file = findProfile.photo;
    try {
      fs.unlinkSync(`./public/${file}`);
      this.profileRepository.remove(findProfile);
      return { msg: 'deleted success', data: findProfile };
    } catch (error) {
      return { msg: error };
    }
  }
  public async deleteBg(req: any) {
    const findBg = await this.bgRepository.findOne({
      where: { users: { id: req.user.id } },
      relations: { users: true },
    });
    const file = findBg.background;
    try {
      fs.unlinkSync(`./public/${file}`);
      this.bgRepository.remove(findBg);
      return { msg: 'background profile deleted success' };
    } catch (error) {
      return { msg: error };
    }
  }
}
