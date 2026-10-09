import { BadRequestException, Injectable } from '@nestjs/common';
import { CheckOutDto } from './dto/kasir.dto.js';


const DISKON_MEMBER: Record<string, number> = {
  reguler: 0,
  silver: 5,
  gold: 10,
};

const METODE = ['tunai', 'qris'];


@Injectable()
export class KasirService {
  checkout(
    memberParam: string,
    metodeQuery: string | undefined,
    dto: CheckOutDto,
  ) {
    // 1. member (params): tidak peka huruf besar/kecil
    const member = (memberParam ?? '').toLowerCase();
    if (!(member in DISKON_MEMBER)) {
      throw new BadRequestException(
        'member harus salah satu dari: reguler, silver, gold',
      );
    }

    if (metodeQuery === undefined || metodeQuery.trim() === '') {
      throw new BadRequestException('metode wajib diisi');
    }
    const metode = metodeQuery.toLowerCase();
    if (!METODE.includes(metode)) {
      throw new BadRequestException(
        'metode harus salah satu dari: tunai, qris',
      );
    }

    const items = dto?.items;
    if (!Array.isArray(items) || items.length < 1 || items.length > 10) {
      throw new BadRequestException(
        'items harus array berisi minimal 1 dan maksimal 10 item',
      );
    }

    const rincian = items.map((item: any, index: number) => {
      const ke = index + 1;

      if (typeof item?.nama !== 'string' || item.nama.trim() === '') {
        throw new BadRequestException(
          `Item ke-${ke}: nama harus string dan tidak boleh kosong`,
        );
      }
      if (
        typeof item.harga !== 'number' ||
        Number.isNaN(item.harga) ||
        item.harga <= 0
      ) {
        throw new BadRequestException(
          `Item ke-${ke}: harga harus angka lebih dari 0`,
        );
      }
      if (
        typeof item.qty !== 'number' ||
        !Number.isInteger(item.qty) ||
        item.qty <= 0
      ) {
        throw new BadRequestException(
          `Item ke-${ke}: qty harus bilangan bulat lebih dari 0`,
        );
      }

      return {
        nama: item.nama.trim(),
        harga: item.harga,
        qty: item.qty,
        subtotal: item.harga * item.qty,
      };
    });

    const totalItem = rincian.reduce((total, r) => total + r.qty, 0);
    const subtotal = rincian.reduce((total, r) => total + r.subtotal, 0);
    const diskon = (subtotal * DISKON_MEMBER[member]) / 100;
    const biayaAdmin = metode === 'qris' ? ((subtotal - diskon) * 1) / 100 : 0;
    const total = subtotal - diskon + biayaAdmin;

    return {
      member,
      metode,
      rincian,
      totalItem,
      subtotal,
      diskon,
      biayaAdmin,
      total,
    };
  }
}
