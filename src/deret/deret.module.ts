import { Module } from '@nestjs/common';
import { DeretService } from './deret.service.js';
import { DeretController } from './deret.controller.js';

@Module({
  controllers: [DeretController],
  providers: [DeretService],
})
export class DeretModule {}
