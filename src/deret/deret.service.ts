import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class DeretService {
  generate(jenis: string, jumlahStr?: string, urutan?: string) {
    // 1. jenis harus valid
    if (!jenis.includes(jenis)) {
      throw new BadRequestException(
        'jenis harus salah satu dari: ganjil, genap, kuadrat',
      );
    }

    if (jumlahStr === undefined || jumlahStr.trim() === '') {
      throw new BadRequestException('jumlah wajib diisi');
    }

    const jumlah = Number(jumlahStr);
    if (
      Number.isNaN(jumlah) ||
      !Number.isInteger(jumlah) ||
      jumlah < 1 ||
      jumlah > 20
    ) {
      throw new BadRequestException(
        'jumlah harus bilangan bulat antara 1 sampai 20',
      );
    }

    if (urutan !== undefined && !urutan.includes(urutan)) {
      throw new BadRequestException('urutan harus salah satu dari: asc, desc');
    }

    const data: number[] = [];
    let total = 0;

    for (let i = 1; i <= jumlah; i++) {
      let nilai = 0;
      if (jenis === 'ganjil') nilai = 2 * i - 1;
      else if (jenis === 'genap') nilai = 2 * i;
      else nilai = i * i;

      data.push(nilai);
      total += nilai;
    }

    if (urutan === 'desc') data.reverse();

    return { jenis, data, total };
  }
}
