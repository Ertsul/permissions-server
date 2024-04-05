import * as svgCaptcha from 'svg-captcha';
import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('common')
@Controller('verification-code')
export class VerificationCodeController {
  @Get()
  getData(@Req() req: any) {
    console.log('>> req.session :', req.session);
    const captcha: svgCaptcha.CaptchaObj = svgCaptcha.createMathExpr({
      mathMin: 1,
      mathMax: 9,
      fontSize: 45,
      width: 120,
      height: 36,
      background: '#f5f7fa',
    });
    console.log('>> captcha :', captcha.text);
    req.session.verificationCode = captcha.text;
    // console.log('>> req.session :', req.session);
    return captcha.data;
  }
}
