import { Test, TestingModule } from '@nestjs/testing';
import { KasirService } from './kasir.service.js';
import { BadRequestException } from '@nestjs/common';

describe('KasirService', () => {
  let service: KasirService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KasirService],
    }).compile();

    service = module.get<KasirService>(KasirService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
  it('contoh soal: gold + qris = 59085', () => {
    expect(service.checkout('gold', 'qris', { items: itemsContoh })).toEqual({
      member: 'gold',
      metode: 'qris',
      rincian: [
        { nama: 'Buku Tulis', harga: 5000, qty: 10, subtotal: 50000 },
        { nama: 'Pulpen', harga: 3000, qty: 5, subtotal: 15000 },
      ],
      totalItem: 15,
      subtotal: 65000,
      diskon: 6500,
      biayaAdmin: 585,
      total: 59085,
    });
  });

  it('member tidak peka huruf besar/kecil', () => {
    expect(service.checkout('GOLD', 'QRIS', { items: itemsContoh }).total).toBe(
      59085,
    );
  });

  it('reguler + tunai: tanpa diskon dan tanpa biaya admin', () => {
    const result = service.checkout('reguler', 'tunai', { items: itemsContoh });
    expect(result.diskon).toBe(0);
    expect(result.biayaAdmin).toBe(0);
    expect(result.total).toBe(65000);
  });

  it('silver + tunai: diskon 5%', () => {
    const result = service.checkout('silver', 'tunai', { items: itemsContoh });
    expect(result.diskon).toBe(3250);
    expect(result.total).toBe(61750);
  });

  it('pesan error menyebut urutan item', () => {
    const items = [
      { nama: 'Buku', harga: 5000, qty: 2 },
      { nama: 'Pulpen', harga: 3000, qty: 0 },
    ];
    expect(() => service.checkout('gold', 'qris', { items })).toThrow(
      'Item ke-2: qty harus bilangan bulat lebih dari 0',
    );
  });

  it.each([
    ['vip', 'qris', { items: itemsContoh }],
    ['gold', undefined, { items: itemsContoh }],
    ['gold', 'kartu', { items: itemsContoh }],
    ['gold', 'qris', { items: [] }],
    ['gold', 'qris', { items: 'abc' }],
    ['gold', 'qris', {}],
    [
      'gold',
      'qris',
      { items: Array(11).fill({ nama: 'A', harga: 1000, qty: 1 }) },
    ],
    ['gold', 'qris', { items: [{ nama: '', harga: 1000, qty: 1 }] }],
    ['gold', 'qris', { items: [{ nama: 'A', harga: 0, qty: 1 }] }],
    ['gold', 'qris', { items: [{ nama: 'A', harga: '1000', qty: 1 }] }],
    ['gold', 'qris', { items: [{ nama: 'A', harga: 1000, qty: 1.5 }] }],
  ])('input (%s, %s, %j) harus ditolak', (member, metode, body) => {
    expect(() => service.checkout(member, metode, body)).toThrow(
      BadRequestException,
    );
  });
});
