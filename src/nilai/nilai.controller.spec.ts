import { Test, TestingModule } from '@nestjs/testing';
import { NilaiController } from './nilai.controller.js';
import { NilaiService } from './nilai.service.js';

describe('NilaiController', () => {
  let controller: NilaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NilaiController],
      providers: [NilaiService],
    }).compile();

    controller = module.get<NilaiController>(NilaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

   it('should calculate nilai akhir Budi', () => {
     const result = controller.hitung({
       nama: 'Budi',
       tugas: [80, 90, 70],
       uts: 75,
       uas: 85,
     });
     expect(result.nilaiAkhir).toBe(80.5);
     expect(result.predikat).toBe('B');
   });
});
