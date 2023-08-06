import { Messages } from './connection';
import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketController } from './websocket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  providers: [WebsocketService],
  controllers: [WebsocketController],
})
export class WebsocketModule {}
