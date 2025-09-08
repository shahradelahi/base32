/**
 * The options for encoding.
 */
export interface Base32EncodeOptions {
  /**
   * Whether to use padding.
   *
   * @default true
   */
  padding?: boolean;
}

/**
 * The options for decoding.
 */
export interface Base32DecodeOptions extends Base32EncodeOptions {
  /**
   * Whether to use loose decoding.
   * This will replace some characters with their valid counterparts.
   * e.g. 0 -> O, 1 -> L, 8 -> B
   * @default false
   */
  loose?: boolean;
}

/**
 * The data that can be encoded.
 */
export type Encodable = string | ArrayBuffer | Uint8Array;
