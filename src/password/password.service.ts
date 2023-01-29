import { Password } from './password';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(Password)
    private passwordRepository: Repository<Password>,
  ) {}
  public async create(body: any) {
    return this.passwordRepository.save(body);
  }

  public async findOne(data: any) {
    return this.passwordRepository.findOne({ where: { token: data } });
  }
  public async deleteOne(email: string): Promise<Password> {
    const deleteP = await this.passwordRepository.findOne({
      where: { email: email },
    });
    return this.passwordRepository.remove(deleteP);
  }
}
