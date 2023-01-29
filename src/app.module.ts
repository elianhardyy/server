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
@Module({
  imports: [
    UsersModule,
    OauthlurModule,
    PasswordModule,
    MulterModule.register({ dest: './uploads' }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (env: ConfigService) => ({
        type: env.get<any>('DATABASE_TYPE'),
        host: env.get<string>('DATABASE_HOST'),
        port: parseInt(env.get<string>('DATABASE_PORT')),
        username: env.get<string>('DATABASE_USER'),
        database: env.get<string>('DATABASE_NAME'),
        entities: [Users, Password, Profile],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
