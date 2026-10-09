import { Test, TestingModule } from '@nestjs/testing';
import { NilaiService } from './nilai.service.js';
import { BadRequestException } from '@nestjs/common';

describe('NilaiService', () => {
  let service: NilaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NilaiService],
    }).compile();

    service = module.get<NilaiService>(NilaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

   it('contoh soal: Budi mendapat 80.5, B, Lulus', () => {
     expect(
       service.hitung({ nama: 'Budi', tugas: [80, 90, 70], uts: 75, uas: 85 }),
     ).toEqual({
       nama: 'Budi',
       rataTugas: 80,
       nilaiAkhir: 80.5,
       predikat: 'B',
       status: 'Lulus',
     });
   });

   it('nama dengan spasi di awal/akhir dirapikan', () => {
     const result = service.hitung({
       nama: '  Budi  ',
       tugas: [80],
       uts: 80,
       uas: 80,
     });
     expect(result.nama).toBe('Budi');
   });

   it('predikat A untuk nilai tinggi', () => {
     const result = service.hitung({
       nama: 'Ani',
       tugas: [95],
       uts: 90,
       uas: 92,
     });
     expect(result.predikat).toBe('A');
     expect(result.status).toBe('Lulus');
   });

   it('predikat D dan Remedial untuk nilai rendah', () => {
     const result = service.hitung({
       nama: 'Doni',
       tugas: [50],
       uts: 60,
       uas: 55,
     });
     expect(result.predikat).toBe('D');
     expect(result.status).toBe('Remedial');
   });

   it('batas 75 dianggap Lulus', () => {
     const result = service.hitung({
       nama: 'Eka',
       tugas: [75],
       uts: 75,
       uas: 75,
     });
     expect(result.nilaiAkhir).toBe(75);
     expect(result.status).toBe('Lulus');
   });

   it.each([
     [{ tugas: [80], uts: 75, uas: 85 }],
     [{ nama: '', tugas: [80], uts: 75, uas: 85 }],
     [{ nama: '   ', tugas: [80], uts: 75, uas: 85 }],
     [{ nama: 123, tugas: [80], uts: 75, uas: 85 }],
     [{ nama: 'Budi', tugas: [], uts: 75, uas: 85 }],
     [{ nama: 'Budi', tugas: 'abc', uts: 75, uas: 85 }],
     [{ nama: 'Budi', tugas: [80, 'x'], uts: 75, uas: 85 }],
     [{ nama: 'Budi', tugas: [80, 101], uts: 75, uas: 85 }],
     [{ nama: 'Budi', tugas: [80], uts: -1, uas: 85 }],
     [{ nama: 'Budi', tugas: [80], uts: '75', uas: 85 }],
     [{ nama: 'Budi', tugas: [80], uts: 75, uas: 101 }],
     [{ nama: 'Budi', tugas: [80], uts: 75 }],
   ])('body %j harus ditolak', (body) => {
     expect(() => service.hitung(body)).toThrow(BadRequestException);
   });
});
