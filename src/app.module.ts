import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OauthlurModule } from './oauth/oauthlur.module';
import { Users } from './users/users';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { PasswordModule } from './password/password.module';
import { Password } from './password/password';
import { MailerModule } from '@nestjs-modules/mailer';
import { Profile } from './users/profile';
import { MulterModule } from '@nestjs/platform-express/multer';
import { PostsModule } from './posts/posts.module';
import { Posts } from './posts/posts';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { Comments } from './posts/comments';
import { Follows } from './users/follows';
@Module({
  imports: [
    UsersModule,
    OauthlurModule,
    PasswordModule,
    MulterModule.register({ dest: './public' }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (env: ConfigService) => ({
        type: env.get<any>('DATABASE_TYPE'),
        host: env.get<string>('DATABASE_HOST'),
        port: parseInt(env.get<string>('DATABASE_PORT')),
        username: env.get<string>('DATABASE_USER'),
        password: env.get<string>('DATABASE_PASSWORD'),
        database: env.get<string>('DATABASE_NAME'),
        entities: [Users, Password, Profile, Posts, Comments, Follows],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    PostsModule,
    // ServeStaticModule.forRoot({
    //   rootPath: path.join(__dirname, '..', 'public'),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
