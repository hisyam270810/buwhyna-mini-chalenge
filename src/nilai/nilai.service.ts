import { BadRequestException, Injectable } from '@nestjs/common';
import { HitungNilaiDto } from './dto/nilai.dto.js';

@Injectable()
export class NilaiService {
  private cekAngka(nilai: unknown, label: string): number {
    if (
      typeof nilai !== 'number' ||
      Number.isNaN(nilai) ||
      nilai < 0 ||
      nilai > 100
    ) {
      throw new BadRequestException(`${label} harus angka antara 0 sampai 100`);
    }
    return nilai;
  }

  hitung(dto: HitungNilaiDto) {
    if (typeof dto?.nama !== 'string' || dto.nama.trim() === '') {
      throw new BadRequestException('nama harus string dan tidak boleh kosong');
    }
    const nama = dto.nama.trim();

    if (!Array.isArray(dto.tugas) || dto.tugas.length < 1) {
      throw new BadRequestException('tugas harus array berisi minimal 1 angka');
    }
    const tugas = dto.tugas.map((t: unknown, i: number) =>
      this.cekAngka(t, `tugas ke-${i + 1}`),
    );

    const uts = this.cekAngka(dto.uts, 'uts');
    const uas = this.cekAngka(dto.uas, 'uas');

    const jumlahTugas = tugas.reduce((total: any, n: any) => total + n, 0);
    const rataTugas = jumlahTugas / tugas.length;
    const nilaiAkhir =
      Math.round((0.3 * rataTugas + 0.3 * uts + 0.4 * uas) * 100) / 100;

    let predikat = 'D';
    if (nilaiAkhir >= 90) predikat = 'A';
    else if (nilaiAkhir >= 80) predikat = 'B';
    else if (nilaiAkhir >= 70) predikat = 'C';

    const status = nilaiAkhir >= 75 ? 'Lulus' : 'Remedial';

    return {
      nama,
      rataTugas: Math.round(rataTugas * 100) / 100,
      nilaiAkhir,
      predikat,
      status,
    };
  }
}
