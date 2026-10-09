import { Module } from '@nestjs/common';
import { SuhuService } from './suhu.service.js';
import { SuhuController } from './suhu.controller.js';

@Module({
  controllers: [SuhuController],
  providers: [SuhuService],
})
export class SuhuModule {}
