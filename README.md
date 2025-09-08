# @se-oss/base32

[![CI](https://github.com/shahradelahi/base32/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/shahradelahi/base32/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/@se-oss/base32.svg)](https://www.npmjs.com/package/@se-oss/base32)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](/LICENSE)
[![Install Size](https://packagephobia.com/badge?p=@se-oss/base32)](https://packagephobia.com/result?p=@se-oss/base32)

A simple base32 encoder and decoder supporting both RFC 4648 and Crockford variants.

---

- [Installation](#-installation)
- [Usage](#-usage)
  - [RFC 4648](#rfc-4648)
  - [Crockford](#crockford)
- [Documentation](#-documentation)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#license)

## 📦 Installation

```bash
pnpm add @se-oss/base32
```

## 📖 Usage

### RFC 4648

```typescript
import { decode, encode } from '@se-oss/base32';

const encoded = encode('hello world');
console.log(encoded); // NBSWY3DPEB3W64TMMQ======

const decoded = decode(encoded);
console.log(new TextDecoder().decode(decoded)); // hello world
```

### Crockford

```typescript
import { crockfordDecode, crockfordEncode } from '@se-oss/base32';

const encoded = crockfordEncode('hello world');
console.log(encoded); // D1JPRV3F41VPYWKCCG======

const decoded = crockfordDecode(encoded);
console.log(new TextDecoder().decode(decoded)); // hello world
```

## 📚 Documentation

For all configuration options, please see [the API docs](https://www.jsdocs.io/package/@se-oss/base32).

## 🚀 Future Enhancements

- [ ] Implement Crockford's checksum feature.

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/base32)

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/base32/graphs/contributors).
