import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local.auth';
import { SessionSerializer } from '../auth/session.serializer';
import { LocalStrategy } from '../auth/local.strategy';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../roles/roles.guard';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Profile } from './profile';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { Follows } from './follows';
import { FollowService } from './follows.service';
import { FollowController } from './follows.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Profile, Follows]),
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    UsersService,
    LocalStrategy,
    AuthenticatedGuard,
    SessionSerializer,
    LocalAuthGuard,
    RolesGuard,
    ProfilesService,
    JwtStrategy,
    JwtAuthGuard,
    FollowService,
  ],
  controllers: [UsersController, ProfilesController, FollowController],
  exports: [UsersService],
})
export class UsersModule {}
