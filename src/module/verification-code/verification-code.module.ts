import { Module } from '@nestjs/common';
import { VerificationCodeController } from './verification-code.controller';

@Module({
  controllers: [VerificationCodeController],
})
export class VerificationCodeModule {}
