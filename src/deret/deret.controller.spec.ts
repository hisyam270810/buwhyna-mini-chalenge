import { Test, TestingModule } from '@nestjs/testing';
import { DeretController } from './deret.controller.js';
import { DeretService } from './deret.service.js';

describe('DeretController', () => {
  let controller: DeretController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeretController],
      providers: [DeretService],
    }).compile();

    controller = module.get<DeretController>(DeretController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return deret ganjil 5', () => {
    expect(controller.generate('ganjil', '5')).toEqual({
      jenis: 'ganjil',
      data: [1, 3, 5, 7, 9],
      total: 25,
    });
  });
});
