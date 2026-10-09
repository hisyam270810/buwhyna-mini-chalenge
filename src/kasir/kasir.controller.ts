import { Body, Controller, Param, Query ,Post ,HttpCode } from '@nestjs/common';
import { KasirService } from './kasir.service.js';
import { CheckOutDto } from './dto/kasir.dto.js';

@Controller('kasir')
export class KasirController {
  constructor(private readonly kasirService: KasirService) {}

  @Post('checkout/:member')
  @HttpCode(200)
  checkout(
    @Param('member') member: string,
    @Query('metode') metode: string | undefined,
    @Body() dto: CheckOutDto,
  ) {
    return this.kasirService.checkout(member, metode, dto);
  }
}
