import { InvalidPaddingError } from './errors';
import type { Base32DecodeOptions, Base32EncodeOptions, Encodable } from './typings';
import { base32Chars, base32Codes, decodeWithCodes, toUint8Array } from './utils';

export class Base32 {
  public static encode(data: Encodable, options?: Base32EncodeOptions): string {
    const { padding = true } = options || {};

    const view = toUint8Array(data);

    let result = '';
    let bits = 0;
    let value = 0;

    for (let i = 0; i < view.length; i++) {
      value = (value << 8) | view[i]!;
      bits += 8;

      while (bits >= 5) {
        result += base32Chars[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }

    if (bits > 0) {
      result += base32Chars[(value << (5 - bits)) & 31];
    }

    if (padding) {
      while (result.length % 8 !== 0) {
        result += '=';
      }
    }

    return result;
  }

  public static decode(data: string, options?: Base32DecodeOptions): ArrayBuffer {
    const { padding = true, loose = false } = options || {};

    if (padding && !loose && data.length % 8 !== 0) {
      throw new InvalidPaddingError();
    }

    let str = data.toUpperCase().replace(/=+$/, '');
    if (loose) {
      str = str.replace(/0/g, 'O').replace(/1/g, 'L').replace(/8/g, 'B');
    }

    return decodeWithCodes(str, base32Codes);
  }
}

export const { encode, decode } = Base32;
