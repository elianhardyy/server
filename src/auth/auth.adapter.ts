import { ConfigService } from '@nestjs/config/dist';
//import { CustomSocket } from './../websocket/gateway';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
export class AuthAdapter extends IoAdapter {
  public env: ConfigService;
  createIOServer(port: number, options?: any): any {
    const server: Socket = super.createIOServer(port, {
      ...options,
      cors: {
        origin: 'http://localhost:5173',
        methods: ['GET,POST,PATCH,PUT,DELETE'],
      },
    });
    // server.use((socket: CustomSocket, next) => {
    //   if (socket.handshake.query && socket.handshake.query.token) {
    //     verify(
    //       socket.handshake.query.token as string,
    //       this.env.get<string>('JWT_SECRET'),
    //     );
    //   }
    // });
    return server;
  }
}
