import { Module } from '@nestjs/common';
import { CekBilanganService } from './cek-bilangan.service.js';
import { CekBilanganController } from './cek-bilangan.controller.js';

@Module({
  controllers: [CekBilanganController],
  providers: [CekBilanganService],
})
export class CekBilanganModule {}
