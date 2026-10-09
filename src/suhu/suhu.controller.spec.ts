import { Test, TestingModule } from '@nestjs/testing';
import { SuhuController } from './suhu.controller.js';
import { SuhuService } from './suhu.service.js';

describe('SuhuController', () => {
  let controller: SuhuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuhuController],
      providers: [SuhuService],
    }).compile();

    controller = module.get<SuhuController>(SuhuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should convert 100 celsius to fahrenheit', () => {
    expect(controller.konversi('100', 'celsius', 'fahrenheit').hasil).toBe(212);
  });
});
