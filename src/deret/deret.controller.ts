import { Controller, Get, Param, Query } from '@nestjs/common';
import { DeretService } from './deret.service.js';

@Controller('deret')
export class DeretController {
  constructor(private readonly deretService: DeretService) {}

  @Get(':jenis')
  generate(
    @Param('jenis') jenis: string,
    @Query('jumlah') jumlah?: string,
    @Query('urutan') urutan?: string,
  ) {
    return this.deretService.generate(jenis, jumlah, urutan);
  }
}
