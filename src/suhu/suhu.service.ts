import { BadRequestException, Injectable } from '@nestjs/common';

const SATUAN = ['celsius', 'fahrenheit', 'kelvin'];

@Injectable()
export class SuhuService {
  konversi(nilaiStr?: string, dari?: string, ke?: string) {
    if (
      nilaiStr === undefined ||
      nilaiStr.trim() === '' ||
      dari === undefined ||
      ke === undefined
    ) {
      throw new BadRequestException('nilai, dari, dan ke wajib diisi');
    }

    const nilai = Number(nilaiStr);
    if (Number.isNaN(nilai) || !Number.isFinite(nilai)) {
      throw new BadRequestException('nilai harus berupa angka');
    }

    if (!SATUAN.includes(dari) || !SATUAN.includes(ke)) {
      throw new BadRequestException(
        'dari dan ke harus salah satu dari: celsius, fahrenheit, kelvin',
      );
    }

    if (dari === ke) {
      throw new BadRequestException('dari dan ke tidak boleh sama');
    }

    if (dari === 'kelvin' && nilai < 0) {
      throw new BadRequestException('nilai kelvin tidak boleh kurang dari 0');
    }

    let celsius = nilai;
    if (dari === 'fahrenheit') celsius = ((nilai - 32) * 5) / 9;
    else if (dari === 'kelvin') celsius = nilai - 273.15;

    let hasil = celsius;
    if (ke === 'fahrenheit') hasil = (celsius * 9) / 5 + 32;
    else if (ke === 'kelvin') hasil = celsius + 273.15;

    return {
      nilaiAsal: nilai,
      satuanAsal: dari,
      hasil: Math.round(hasil * 100) / 100,
      satuanHasil: ke,
    };
  }
}
