export interface Contact {
  handle?: string;
  name?: string;
  email?: string;
  organization?: string;
  country?: string;
}

export interface Registrar {
  id?: string;
  name?: string;
  email?: string;
  url?: string;
  phone?: string;
}

export interface WhoisResponse {
  server?: string;
  name: string;
  idnName?: string;
  status?: string[];
  nameserver?: string[];
  ips?: string;
  created?: string;
  changed?: string;
  expires?: string;
  registered: boolean;
  dnssec?: string;
  whoisserver?: string;
  contacts?: {
    owner?: Contact[];
    admin?: Contact[];
    tech?: Contact[];
  };
  registrar?: Registrar;
}

export interface NSLookupResponse {
  domain: string;
  records: {
    a?: string[];
    aaaa?: string[];
    mx?: {
      priority: number;
      exchange: string;
    }[];
    ns?: string[];
    txt?: string[];
    soa?: {
      mname: string;
      rname: string;
      serial: number;
      refresh: number;
      retry: number;
      expire: number;
      minimum: number;
    };
  };
}

export interface SSLCertificateResponse {
  domain: string;
  valid: boolean;
  issuer: {
    organization?: string;
    commonName: string;
    countryName?: string;
  };
  subject: {
    organization?: string;
    commonName: string;
    countryName?: string;
  };
  validFrom: string;
  validTo: string;
  serialNumber: string;
  version: number;
  signatureAlgorithm: string;
  subjectAlternativeNames?: string[];
}

export interface WhoisJsonConfig {
  apiKey: string;
  baseUrl?: string;
} 