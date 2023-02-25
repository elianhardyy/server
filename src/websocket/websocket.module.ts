import { Connection } from './connection';
import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketController } from './websocket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Connection])],
  providers: [WebsocketService],
  controllers: [WebsocketController],
})
export class WebsocketModule {}
