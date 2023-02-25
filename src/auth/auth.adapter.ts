import { IoAdapter } from '@nestjs/platform-socket.io';
import { Socket } from 'socket.io';

export class AuthAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: 'http://localhost:5173',
        methods: ['GET,POST,PATCH,PUT,DELETE'],
      },
    });

    return server;
  }
}
