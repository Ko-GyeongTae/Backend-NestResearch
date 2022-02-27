import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, HttpStatus, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserKakaoDto } from './dto/user.kakao.dto';
import { KakaoAuthGuard } from './kakao/kakao.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/kakao')
  @HttpCode(200)
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() {
    return HttpStatus.OK;
  }

  @Get('/kakao/redirect')
  @HttpCode(200)
  @UseGuards(KakaoAuthGuard)
  async kakaoLoginCallback(@Req() req): Promise<{ accessToken: string }> {
    return this.authService.kakaoLogin(req.user as UserKakaoDto)
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
