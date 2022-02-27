import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { KakaoStrategy } from './kakao/kakao.strategy';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    //TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      }
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy]
})
export class AuthModule {}
