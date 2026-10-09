import { Module } from '@nestjs/common';
import { KasirService } from './kasir.service.js';
import { KasirController } from './kasir.controller.js';

@Module({
  controllers: [KasirController],
  providers: [KasirService],
})
export class KasirModule {}
