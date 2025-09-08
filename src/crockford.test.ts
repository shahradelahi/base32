import { describe, expect, test } from 'vitest';

import { crockfordDecode, crockfordEncode } from './crockford';
import { InvalidCharacterError } from './errors';

describe('CrockfordBase32', () => {
  describe('encode', () => {
    test('should encode "hello world"', () => {
      expect(crockfordEncode('hello world')).toBe('D1JPRV3F41VPYWKCCG======');
    });

    test('can encode a multiple of 5 bits', () => {
      const buffer = new Uint8Array([0xa6, 0xe5, 0x63, 0x34, 0x5f]);
      expect(crockfordEncode(buffer)).toBe('MVJP6D2Z');
    });

    test('can encode a single byte', () => {
      const buffer = new Uint8Array([0x74]);
      expect(crockfordEncode(buffer)).toBe('EG======');
    });

    test('can encode two bytes', () => {
      const buffer = new Uint8Array([0x74, 0x74]);
      expect(crockfordEncode(buffer)).toBe('EHT0====');
    });

    test('does not strip off leading zeros', () => {
      const buffer = new Uint8Array([0, 0, 0xa9]);
      expect(crockfordEncode(buffer)).toBe('000AJ===');
    });
  });

  describe('decode', () => {
    test('should decode "hello world"', () => {
      const decoded = crockfordDecode('D1JPRV3F41VPYWKCCG======');
      expect(new TextDecoder().decode(decoded)).toBe('hello world');
    });

    test('can decode a multiple of 5 bits', () => {
      const decoded = crockfordDecode('MVJP6D2Z');
      expect(decoded).toEqual(new Uint8Array([0xa6, 0xe5, 0x63, 0x34, 0x5f]).buffer);
    });

    test('can decode a single byte', () => {
      const decoded = crockfordDecode('EG======');
      expect(new TextDecoder().decode(decoded)).toBe('t');
    });

    test('can decode two bytes', () => {
      const decoded = crockfordDecode('EHT0====');
      expect(new TextDecoder().decode(decoded)).toBe('tt');
    });

    test('keeps leading zeros when decoding', () => {
      const decoded = crockfordDecode('000AJ===');
      expect(decoded).toEqual(new Uint8Array([0, 0, 0xa9]).buffer);
    });

    test('rejects any invalid base 32 character', () => {
      expect(() => crockfordDecode('T&ZQ')).toThrowError(new InvalidCharacterError('&'));
    });
  });
});
