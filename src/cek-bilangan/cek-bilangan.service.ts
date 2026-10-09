import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CekBilanganService {
  cekBilangan(param: string) {
    const angka = Number(param);

    if (
      param.trim() === '' ||
      Number.isNaN(angka) ||
      !Number.isInteger(angka) ||
      angka < 1 ||
      angka > 100
    ) {
      throw new BadRequestException(
        'angka harus bilangan bulat antara 1 sampai 100',
      );
    }

    return {
      angka,
      jenis: angka % 2 === 0 ? 'genap' : 'ganjil',
      kuadrat: angka * angka,
      kelipatanLima: angka % 5 === 0,
    };
  }
}
