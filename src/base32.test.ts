import { describe, expect, test } from 'vitest';

import { Base32, decode, encode } from './base32';
import { InvalidCharacterError } from './errors';

describe('base32', () => {
  describe('RFC 4648 Test Vectors', () => {
    const testVectors: [string, string][] = [
      ['', ''],
      ['f', 'MY======'],
      ['fo', 'MZXQ===='],
      ['foo', 'MZXW6==='],
      ['foob', 'MZXW6YQ='],
      ['fooba', 'MZXW6YTB'],
      ['foobar', 'MZXW6YTBOI======'],
    ];

    test.each(testVectors)('encode("%s")', (input, expected) => {
      expect(encode(input)).toBe(expected);
    });

    test.each(testVectors)('decode("%s")', (expected, input) => {
      const decoded = decode(input);
      expect(new TextDecoder().decode(decoded)).toBe(expected);
    });
  });

  describe('encode', () => {
    test('should encode a string', () => {
      expect(encode('hello world')).toBe('NBSWY3DPEB3W64TMMQ======');
    });

    test('should encode a buffer', () => {
      const buffer = new TextEncoder().encode('hello world');
      expect(encode(buffer)).toBe('NBSWY3DPEB3W64TMMQ======');
    });

    test('should encode without padding', () => {
      expect(encode('hello world', { padding: false })).toBe('NBSWY3DPEB3W64TMMQ');
    });
  });

  describe('decode', () => {
    test('should decode a string', () => {
      const buffer = decode('NBSWY3DPEB3W64TMMQ======');
      expect(new TextDecoder().decode(buffer)).toBe('hello world');
    });

    test('should decode a string without padding', () => {
      const buffer = decode('NBSWY3DPEB3W64TMMQ', { padding: false });
      expect(new TextDecoder().decode(buffer)).toBe('hello world');
    });

    describe('loose mode', () => {
      test('should handle character substitutions for 0 and O', () => {
        const decoded = decode('MZXW6YTB0I======', { loose: true });
        expect(new TextDecoder().decode(decoded)).toBe('foobar');
      });

      test('should handle character substitutions for 1 and L', () => {
        const decoded = decode('1U======', { loose: true });
        expect(new TextDecoder().decode(decoded)).toBe(']');
      });

      test('should handle character substitutions for 8 and B', () => {
        const decoded = decode('8A======', { loose: true });
        expect(new TextDecoder().decode(decoded)).toBe('\b');
      });

      test('should handle mixed case', () => {
        const decoded = decode('mzxw6ytb0i======', { loose: true });
        expect(new TextDecoder().decode(decoded)).toBe('foobar');
      });

      test('should throw error for invalid characters not in loose map', () => {
        expect(() => decode('!@#$%^&*', { loose: true })).toThrow(new InvalidCharacterError('!'));
      });

      test('should handle incorrect padding', () => {
        const buffer = decode('NBSWY3DPEB3W64TMMQ', { loose: true });
        expect(new TextDecoder().decode(buffer)).toBe('hello world');
        const buffer2 = decode('NBSWY3DPEB3W64TMMQ======', { loose: true });
        expect(new TextDecoder().decode(buffer2)).toBe('hello world');
      });
    });
  });

  describe('Base32 class', () => {
    test('should encode using static method', () => {
      expect(Base32.encode('hello world')).toBe('NBSWY3DPEB3W64TMMQ======');
    });

    test('should decode using static method', () => {
      const buffer = Base32.decode('NBSWY3DPEB3W64TMMQ======');
      expect(new TextDecoder().decode(buffer)).toBe('hello world');
    });
  });
});
