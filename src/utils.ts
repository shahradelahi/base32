import { InvalidCharacterError } from './errors';

export const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
export const base32Codes: Record<string, number> = {};

for (let i = 0; i < base32Chars.length; i++) {
  base32Codes[base32Chars[i]!] = i;
}

export const crockfordBase32Chars = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
export const crockfordBase32Codes: Record<string, number> = {};

for (let i = 0; i < crockfordBase32Chars.length; i++) {
  crockfordBase32Codes[crockfordBase32Chars[i]!] = i;
}

export function toUint8Array(data: string | ArrayBuffer | Uint8Array): Uint8Array {
  if (typeof data === 'string') {
    return new TextEncoder().encode(data);
  }
  if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  }
  return data;
}

export function decodeWithCodes(str: string, codes: Record<string, number>): ArrayBuffer {
  const result = new Uint8Array(((str.length * 5) / 8) | 0);
  let bits = 0;
  let value = 0;
  let index = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i]!;
    const code = codes[char];

    if (code === undefined) {
      throw new InvalidCharacterError(char);
    }

    value = (value << 5) | code;
    bits += 5;

    if (bits >= 8) {
      result[index++] = (value >>> (bits - 8)) & 255;
      bits -= 8;
    }
  }

  return result.buffer;
}
