/**
 * Thrown when an invalid character is encountered.
 */
export class InvalidCharacterError extends Error {
  constructor(char: string) {
    super(`Invalid character: ${char}`);
  }
}

/**
 * Thrown when the padding is invalid.
 */
export class InvalidPaddingError extends Error {
  constructor() {
    super('Invalid padding');
  }
}
