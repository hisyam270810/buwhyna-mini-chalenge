import { Test, TestingModule } from '@nestjs/testing';
import { DeretService } from './deret.service.js';
import { BadRequestException } from '@nestjs/common';

describe('DeretService', () => {
  let service: DeretService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeretService],
    }).compile();

    service = module.get<DeretService>(DeretService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

   it('deret ganjil 5', () => {
     expect(service.generate('ganjil', '5')).toEqual({
       jenis: 'ganjil',
       data: [1, 3, 5, 7, 9],
       total: 25,
     });
   });

   it('deret genap 3', () => {
     expect(service.generate('genap', '3')).toEqual({
       jenis: 'genap',
       data: [2, 4, 6],
       total: 12,
     });
   });

   it('deret kuadrat 4', () => {
     expect(service.generate('kuadrat', '4')).toEqual({
       jenis: 'kuadrat',
       data: [1, 4, 9, 16],
       total: 30,
     });
   });

   it('tantangan: urutan desc membalik data', () => {
     expect(service.generate('genap', '3', 'desc').data).toEqual([6, 4, 2]);
   });

   it('tantangan: urutan asc sama dengan default', () => {
     expect(service.generate('genap', '3', 'asc').data).toEqual([2, 4, 6]);
   });

   it('batas jumlah 1 dan 20 valid', () => {
     expect(service.generate('ganjil', '1').data).toEqual([1]);
     expect(service.generate('ganjil', '20').data).toHaveLength(20);
   });

   it.each([
     ['prima', '5', undefined],
     ['ganjil', undefined, undefined],
     ['ganjil', 'abc', undefined],
     ['ganjil', '0', undefined],
     ['ganjil', '21', undefined],
     ['ganjil', '3.5', undefined],
     ['ganjil', '5', 'naik'],
   ])('input (%s, %s, %s) harus ditolak', (jenis, jumlah, urutan) => {
     expect(() => service.generate(jenis, jumlah, urutan)).toThrow(
       BadRequestException,
     );
   });
});
