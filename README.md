# WhoisJson NPM Package

A Node.js wrapper for the [WhoisJSON API](https://whoisjson.com) - Get WHOIS, DNS, and SSL certificate information in JSON format.

Free accounts include 500 requests per month. [Check out our full documentation](https://whoisjson.com/documentation) for more details about our API.

## Installation

```bash
npm i @whoisjson/whoisjson
```

## Usage

First, [sign up for a free API key](https://whoisjson.com/signup) to get started with 500 monthly requests.

```typescript
import { WhoisJson } from '@whoisjson/whoisjson';

// Initialize the client
const whois = new WhoisJson({
  apiKey: 'YOUR_API_KEY'
});

// Get WHOIS information for a domain
async function getDomainInfo() {
  try {
    // WHOIS lookup
    const whoisInfo = await whois.lookup('example.com');
    console.log('WHOIS Info:', whoisInfo);

    // DNS lookup
    const dnsInfo = await whois.nslookup('example.com');
    console.log('DNS Info:', dnsInfo);

    // SSL certificate info
    const sslInfo = await whois.ssl('example.com');
    console.log('SSL Info:', sslInfo);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Response Examples

### WHOIS Lookup Response
```typescript
{
  server: "gamma",
  name: "example.com",
  idnName: "example.com",
  status: [
    "clientDeleteProhibited",
    "clientTransferProhibited"
  ],
  nameserver: [
    "dns1.example.com",
    "dns2.example.com"
  ],
  ips: "93.184.216.34",
  created: "1995-08-14T04:00:00Z",
  changed: "2024-02-14T08:00:00Z",
  expires: "2025-08-13T04:00:00Z",
  registered: true,
  dnssec: "signedDelegation",
  whoisserver: "whois.example.com",
  contacts: {
    owner: [{
      handle: "REDACTED FOR PRIVACY",
      name: "REDACTED FOR PRIVACY",
      email: "REDACTED FOR PRIVACY",
      country: "US"
    }]
  },
  registrar: {
    id: "123",
    name: "Example Registrar, Inc.",
    email: "support@example.com",
    url: "https://example.com",
    phone: "+1.2345678900"
  }
}
```

### NSLookup Response
```typescript
{
  domain: "example.com",
  records: {
    a: ["93.184.216.34"],
    aaaa: ["2606:2800:220:1:248:1893:25c8:1946"],
    mx: [
      {
        priority: 10,
        exchange: "mail.example.com"
      }
    ],
    ns: [
      "ns1.example.com",
      "ns2.example.com"
    ],
    txt: ["v=spf1 include:_spf.example.com ~all"],
    soa: {
      mname: "ns1.example.com",
      rname: "hostmaster.example.com",
      serial: 2024021401,
      refresh: 7200,
      retry: 3600,
      expire: 1209600,
      minimum: 3600
    }
  }
}
```

### SSL Certificate Response
```typescript
{
  domain: "example.com",
  valid: true,
  issuer: {
    organization: "Let's Encrypt",
    commonName: "R3",
    countryName: "US"
  },
  subject: {
    commonName: "example.com"
  },
  validFrom: "2024-01-01T00:00:00Z",
  validTo: "2024-04-01T00:00:00Z",
  serialNumber: "123456789",
  version: 3,
  signatureAlgorithm: "SHA256withRSA",
  subjectAlternativeNames: [
    "example.com",
    "www.example.com"
  ]
}
```

## API Reference

### `new WhoisJson(config)`

Creates a new WhoisJson client instance.

#### Parameters

- `config` (Object):
  - `apiKey` (string): Your WhoisJSON API key
  - `baseUrl` (string, optional): Custom API base URL

### `lookup(domain)`

Get WHOIS information for a domain.

#### Parameters

- `domain` (string): The domain name to lookup

#### Returns

Promise that resolves with the WHOIS information.

### `nslookup(domain)`

Get DNS records for a domain.

#### Parameters

- `domain` (string): The domain name to lookup

#### Returns

Promise that resolves with the DNS records information.

### `ssl(domain)`

Get SSL certificate information for a domain.

#### Parameters

- `domain` (string): The domain name to check

#### Returns

Promise that resolves with the SSL certificate information.

## Error Handling

The package throws errors in the following cases:
- Invalid API key
- Invalid domain name
- API rate limit exceeded
- Network errors
- Other API errors

## License

MIT 