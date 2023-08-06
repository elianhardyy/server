import { Messages } from './connection';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WebsocketService {
  constructor(
    @InjectRepository(Messages)
    private readonly messages: Repository<Messages>,
  ) {}
  public async create(Messages: Messages): Promise<Messages> {
    return this.messages.save(Messages);
  }
  public async findByUserId(userId: number): Promise<Messages[]> {
    return await this.messages.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}
