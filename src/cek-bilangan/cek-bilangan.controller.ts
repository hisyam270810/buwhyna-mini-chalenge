import { Controller, Get, Param } from '@nestjs/common';
import { CekBilanganService } from './cek-bilangan.service.js';

@Controller('cek-bilangan')
export class CekBilanganController {
  constructor(private readonly cekBilanganService: CekBilanganService) {}

  
  @Get(':angka')
  cekBilangan(@Param('angka') angka: string) {
    return this.cekBilanganService.cekBilangan(angka);
  }
}
