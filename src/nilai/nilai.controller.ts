import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { NilaiService } from './nilai.service.js';
import { HitungNilaiDto } from './dto/nilai.dto.js';

@Controller('nilai')
export class NilaiController {
  constructor(private readonly nilaiService: NilaiService) {}

  @Post('hitung')
  @HttpCode(200)
  hitung(@Body() dto: HitungNilaiDto) {
    return this.nilaiService.hitung(dto);
  }
}
