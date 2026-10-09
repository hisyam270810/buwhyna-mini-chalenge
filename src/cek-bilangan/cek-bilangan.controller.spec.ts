import { Test, TestingModule } from '@nestjs/testing';
import { CekBilanganController } from './cek-bilangan.controller.js';
import { CekBilanganService } from './cek-bilangan.service.js';

describe('CekBilanganController', () => {
  let controller: CekBilanganController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CekBilanganController],
      providers: [CekBilanganService],
    }).compile();

    controller = module.get<CekBilanganController>(CekBilanganController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

   it('should return result for 12', () => {
     expect(controller.cekBilangan('12')).toEqual({
       angka: 12,
       jenis: 'genap',
       kuadrat: 144,
       kelipatanLima: false,
     });
   });
});
