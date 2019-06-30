import { unicodeLookup } from '../unicode';
import { Chars } from '../chars';

export const enum CharFlags {
  None = 0,
  IdentifierStart       = 1 << 0,
  IdentifierPart        = 1 << 1,
  KeywordCandidate      = 1 << 6,
  LineTerminator        = 1 << 9, // ECMA-262 11.3 Line Terminators
  Decimal               = 1 << 10,
  Octal                 = 1 << 11,
  Hex                   = 1 << 12,
  Binary                = 1 << 13,
  Exponent              = 1 << 15,
  BackSlash             = 1 << 17,
  ImplicitOctalDigits   = 1 << 18,
  CarriageReturn        = 1 << 19,
  LineFeed              = 1 << 20,
  Underscore            = 1 << 21,
}

/**
 * Lookup table for mapping a codepoint to a set of flags
 */
export const CharTypes = [
  CharFlags.None /* 0x00   */,
  CharFlags.None /* 0x01   */,
  CharFlags.None /* 0x02   */,
  CharFlags.None /* 0x03   */,
  CharFlags.None /* 0x04   */,
  CharFlags.None /* 0x05   */,
  CharFlags.None /* 0x06   */,
  CharFlags.None /* 0x07   */,
  CharFlags.None /* 0x08   */,
  CharFlags.None /* 0x09   */,
  CharFlags.LineTerminator | CharFlags.CarriageReturn /* 0x0A   */,
  CharFlags.None /* 0x0B   */,
  CharFlags.None /* 0x0C   */,
  CharFlags.LineTerminator | CharFlags.LineFeed /* 0x0D   */,
  CharFlags.None /* 0x0E   */,
  CharFlags.None /* 0x0F   */,
  CharFlags.None /* 0x10   */,
  CharFlags.None /* 0x11   */,
  CharFlags.None /* 0x12   */,
  CharFlags.None /* 0x13   */,
  CharFlags.None /* 0x14   */,
  CharFlags.None /* 0x15   */,
  CharFlags.None /* 0x16   */,
  CharFlags.None /* 0x17   */,
  CharFlags.None /* 0x18   */,
  CharFlags.None /* 0x19   */,
  CharFlags.None /* 0x1A   */,
  CharFlags.None /* 0x1B   */,
  CharFlags.None /* 0x1C   */,
  CharFlags.None /* 0x1D   */,
  CharFlags.None /* 0x1E   */,
  CharFlags.None /* 0x1F   */,
  CharFlags.None /* 0x20   */,
  CharFlags.None /* 0x21 ! */,
  CharFlags.None /* 0x22   */,
  CharFlags.None /* 0x23 # */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x24 $ */,
  CharFlags.None /* 0x25 % */,
  CharFlags.None /* 0x26 & */,
  CharFlags.None /* 0x27   */,
  CharFlags.None /* 0x28   */,
  CharFlags.None /* 0x29   */,
  CharFlags.None /* 0x2A   */,
  CharFlags.Exponent /* 0x2B   */,
  CharFlags.None /* 0x2C   */,
  CharFlags.Exponent /* 0x2D   */,
  CharFlags.None /* 0x2E   */,
  CharFlags.None /* 0x2F   */,
  CharFlags.IdentifierPart | CharFlags.Decimal | CharFlags.Binary | CharFlags.Octal | CharFlags.Hex /* 0x30 0 */,
  CharFlags.IdentifierPart | CharFlags.Decimal | CharFlags.Binary | CharFlags.Octal | CharFlags.Hex /* 0x31 1 */,
  CharFlags.IdentifierPart | CharFlags.Decimal | CharFlags.Octal | CharFlags.Hex /* 0x32 2 */,
  CharFlags.IdentifierPart | CharFlags.Decimal | CharFlags.Octal | CharFlags.Hex /* 0x33 3 */,
  CharFlags.IdentifierPart | CharFlags.Decimal | CharFlags.Octal | CharFlags.Hex /* 0x34 4 */,
  CharFlags.IdentifierPart | CharFlags.Decimal | CharFlags.Octal | CharFlags.Hex /* 0x35 5 */,
  CharFlags.IdentifierPart | CharFlags.Decimal | CharFlags.Octal | CharFlags.Hex /* 0x36 6 */,
  CharFlags.IdentifierPart | CharFlags.Decimal | CharFlags.Octal | CharFlags.Hex /* 0x37 7 */,
  CharFlags.IdentifierPart | CharFlags.Decimal | CharFlags.ImplicitOctalDigits | CharFlags.Hex /* 0x38 8 */,
  CharFlags.IdentifierPart | CharFlags.Decimal | CharFlags.ImplicitOctalDigits | CharFlags.Hex /* 0x39 9 */,
  CharFlags.None /* 0x3A   */,
  CharFlags.None /* 0x3B   */,
  CharFlags.None /* 0x3C < */,
  CharFlags.None /* 0x3D = */,
  CharFlags.None /* 0x3E > */,
  CharFlags.None /* 0x3F   */,
  CharFlags.None /* 0x40 @ */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.Hex /* 0x41 A */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.Hex /* 0x42 B */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.Hex /* 0x43 C */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.Hex /* 0x44 D */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.Hex /* 0x45 E */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.Hex /* 0x46 F */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x47 G */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x48 H */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x49 I */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x4A J */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x4B K */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x4C L */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x4D M */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x4E N */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x4F O */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x50 P */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x51 Q */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x52 R */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x53 S */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x54 T */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x55 U */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x56 V */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x57 W */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x58 X */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x59 Y */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart /* 0x5A Z */,
  CharFlags.None /* 0x5B   */,
  CharFlags.BackSlash | CharFlags.IdentifierStart /* 0x5C   */,
  CharFlags.None /* 0x5D   */,
  CharFlags.None /* 0x5E   */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.Underscore/* 0x5F _ */,
  CharFlags.None /* 0x60   */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate | CharFlags.Hex /* 0x61 a */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate | CharFlags.Hex /* 0x62 b */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate | CharFlags.Hex /* 0x63 c */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate | CharFlags.Hex /* 0x64 d */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate | CharFlags.Hex /* 0x65 e */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate | CharFlags.Hex /* 0x66 f */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x67 g */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x68 h */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x69 i */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x6A j */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x6B k */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x6C l */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x6D m */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x6E n */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x6F o */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x70 p */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x71 q */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x72 r */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x73 s */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x74 t */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x75 u */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x76 v */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x77 w */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x78 x */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x79 y */,
  CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.KeywordCandidate /* 0x7A z */,
  CharFlags.None /* 0x7B   */,
  CharFlags.None /* 0x7C   */,
  CharFlags.None /* 0x7D   */,
  CharFlags.None /* 0x7E   */,
  CharFlags.None /* 0x7F   */
];

export function isIdentifierStart(code: number): number {
  /*
   * ES2020 11.6 IdentifierStart
   *  $ (dollar sign)
   *  _ (underscore)
   *  or any character with the Unicode property «ID_Start».
   *
   * We use a lookup table for small and thus common characters for speed.
   */
  return code <= 0x7F
    ? CharTypes[code] & CharFlags.IdentifierStart
    : (unicodeLookup[(code >>> 5) + 34816] >>> code) & 31 & 1;
}

export function isIdentifierPart(code: number): any {
  /*
   * ES2020 11.6 IdentifierPart
   *  $ (dollar sign)
   *  _ (underscore)
   *  <ZWNJ>
   *  <ZWJ>
   *  or any character with the Unicode property «ID_Continue».
   *
   * We use a lookup table for small and thus common characters for speed.
   */
  return code <= 0x7F
    ? CharTypes[code] & CharFlags.IdentifierPart
    : (unicodeLookup[(code >>> 5) + 0] >>> code) & 31 & 1 || (code === Chars.ZeroWidthJoiner || code === Chars.ZeroWidthNonJoiner);
}
