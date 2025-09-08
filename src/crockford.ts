import { InvalidCharacterError, InvalidPaddingError } from './errors';
import type { Base32DecodeOptions, Base32EncodeOptions, Encodable } from './typings';
import { crockfordBase32Chars, crockfordBase32Codes, decodeWithCodes, toUint8Array } from './utils';

export class CrockfordBase32 {
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
        result += crockfordBase32Chars[(value >>> (bits - 5)) & 31]!;
        bits -= 5;
      }
    }

    if (bits > 0) {
      result += crockfordBase32Chars[(value << (5 - bits)) & 31]!;
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

    // Preliminary character validation
    const upperData = data.toUpperCase();
    for (let i = 0; i < upperData.length; i++) {
      const char = upperData[i]!;
      if (char === '=') continue;

      let code = crockfordBase32Codes[char];
      if (code === undefined && loose) {
        if (char === 'O') code = crockfordBase32Codes['0'];
        else if (char === 'I' || char === 'L') code = crockfordBase32Codes['1'];
      }

      if (code === undefined) {
        throw new InvalidCharacterError(data[i]!);
      }
    }

    if (padding && !loose && data.length % 8 !== 0) {
      throw new InvalidPaddingError();
    }

    let str = upperData.replace(/=+$/, '');
    if (loose) {
      str = str.replace(/O/g, '0').replace(/[IL]/g, '1');
    }

    return decodeWithCodes(str, crockfordBase32Codes);
  }
}

export const { encode: crockfordEncode, decode: crockfordDecode } = CrockfordBase32;
