import { Profile } from './profile';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
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
}
