import { Module } from '@nestjs/common';
import { NilaiService } from './nilai.service.js';
import { NilaiController } from './nilai.controller.js';

@Module({
  controllers: [NilaiController],
  providers: [NilaiService],
})
export class NilaiModule {}
