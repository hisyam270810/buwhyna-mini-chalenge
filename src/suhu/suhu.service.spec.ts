import { Test, TestingModule } from '@nestjs/testing';
import { SuhuService } from './suhu.service.js';
import { BadRequestException } from '@nestjs/common';

describe('SuhuService', () => {
  let service: SuhuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuhuService],
    }).compile();

    service = module.get<SuhuService>(SuhuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

   it('100 celsius ke fahrenheit = 212', () => {
     expect(service.konversi('100', 'celsius', 'fahrenheit')).toEqual({
       nilaiAsal: 100,
       satuanAsal: 'celsius',
       hasil: 212,
       satuanHasil: 'fahrenheit',
     });
   });

   it('32 fahrenheit ke kelvin = 273.15', () => {
     expect(service.konversi('32', 'fahrenheit', 'kelvin').hasil).toBe(273.15);
   });

   it('300 kelvin ke celsius = 26.85', () => {
     expect(service.konversi('300', 'kelvin', 'celsius').hasil).toBe(26.85);
   });

   it('nilai negatif dan desimal diperbolehkan', () => {
     expect(service.konversi('-40', 'celsius', 'fahrenheit').hasil).toBe(-40);
     expect(service.konversi('36.6', 'celsius', 'kelvin').hasil).toBe(309.75);
   });

   it.each([
     [undefined, 'celsius', 'fahrenheit'],
     ['100', undefined, 'fahrenheit'],
     ['100', 'celsius', undefined],
     ['abc', 'celsius', 'fahrenheit'],
     ['100', 'rankine', 'celsius'],
     ['100', 'celsius', 'celsius'],
     ['-1', 'kelvin', 'celsius'],
   ])('input (%s, %s, %s) harus ditolak', (nilai, dari, ke) => {
     expect(() => service.konversi(nilai, dari, ke)).toThrow(
       BadRequestException,
     );
   });
});
