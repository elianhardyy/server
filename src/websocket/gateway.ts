import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  public handleConnection(client, req) {
    console.log(`User ${req.user.username} connected`);
  }
  @UseGuards(JwtAuthGuard)
  async handleMessage(client, payload) {}
}
