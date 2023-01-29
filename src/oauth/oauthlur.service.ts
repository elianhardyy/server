import { Injectable } from '@nestjs/common';

@Injectable()
export class OauthlurService {
  googleLogin(req) {
    if (!req.user) {
      return 'No user';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }
}
