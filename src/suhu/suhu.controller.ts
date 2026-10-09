import { Controller, Get, Query } from '@nestjs/common';
import { SuhuService } from './suhu.service.js';

@Controller('suhu')
export class SuhuController {
  constructor(private readonly suhuService: SuhuService) {}

  @Get('konversi')
  konversi(
    @Query('nilai') nilai?: string,
    @Query('dari') dari?: string,
    @Query('ke') ke?: string,
  ) {
    return this.suhuService.konversi(nilai, dari, ke);
  }
}
