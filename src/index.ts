import axios, { AxiosInstance } from 'axios';
import { WhoisJsonConfig, WhoisResponse, NSLookupResponse, SSLCertificateResponse } from './types';

export * from './types';

export class WhoisJson {
  private client: AxiosInstance;
  private static readonly DEFAULT_BASE_URL = 'https://whoisjson.com/api/v1';

  constructor(private config: WhoisJsonConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl || WhoisJson.DEFAULT_BASE_URL,
      headers: {
        'Authorization': `Token=${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Get WHOIS information for a domain
   * @param domain The domain name to lookup
   * @returns Promise with the WHOIS information
   */
  async lookup(domain: string): Promise<WhoisResponse> {
    try {
      const response = await this.client.get<WhoisResponse>('/whois', {
        params: { domain }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`WhoisJson API Error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get DNS records for a domain using NSLookup
   * @param domain The domain name to lookup
   * @returns Promise with the DNS records information
   */
  async nslookup(domain: string): Promise<NSLookupResponse> {
    try {
      const response = await this.client.get<NSLookupResponse>('/nslookup', {
        params: { domain }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`WhoisJson API Error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get SSL certificate information for a domain
   * @param domain The domain name to check
   * @returns Promise with the SSL certificate information
   */
  async ssl(domain: string): Promise<SSLCertificateResponse> {
    try {
      const response = await this.client.get<SSLCertificateResponse>('/ssl-cert-check', {
        params: { domain }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`WhoisJson API Error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }
} 