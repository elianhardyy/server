import { AppModule } from './../app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { forwardRef, Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { Password } from './password';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Password]),
    MailerModule.forRoot({
      transport: {
        host: '0.0.0.0',
        port: 1025,
      },
      defaults: {
        from: 'admin@example.com',
      },
    }),
  ],
  providers: [PasswordService],
  controllers: [PasswordController],
})
export class PasswordModule {}
