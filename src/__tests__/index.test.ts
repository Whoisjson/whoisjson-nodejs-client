import { WhoisJson } from '../index';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WhoisJson', () => {
  const apiKey = 'test-api-key';
  let whoisJson: WhoisJson;

  beforeEach(() => {
    whoisJson = new WhoisJson({ apiKey });
    mockedAxios.create.mockReturnValue(mockedAxios);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('lookup', () => {
    const mockResponse = {
      data: {
        name: 'example.com',
        registered: true,
        created: '2020-01-01',
        expires: '2025-01-01'
      }
    };

    it('should make a GET request to the correct endpoint', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await whoisJson.lookup('example.com');

      expect(mockedAxios.get).toHaveBeenCalledWith('/whois', {
        params: { domain: 'example.com' }
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when the API request fails', async () => {
      const errorMessage = 'API Error';
      mockedAxios.get.mockRejectedValueOnce({
        isAxiosError: true,
        message: errorMessage,
        response: { data: { message: 'API Error' } }
      });

      await expect(whoisJson.lookup('example.com')).rejects.toThrow(
        `WhoisJson API Error: ${errorMessage}`
      );
    });
  });

  describe('nslookup', () => {
    const mockResponse = {
      data: {
        domain: 'example.com',
        records: {
          a: ['93.184.216.34'],
          ns: ['ns1.example.com', 'ns2.example.com'],
          mx: [{ priority: 10, exchange: 'mail.example.com' }]
        }
      }
    };

    it('should make a GET request to the correct endpoint', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await whoisJson.nslookup('example.com');

      expect(mockedAxios.get).toHaveBeenCalledWith('/nslookup', {
        params: { domain: 'example.com' }
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when the API request fails', async () => {
      const errorMessage = 'API Error';
      mockedAxios.get.mockRejectedValueOnce({
        isAxiosError: true,
        message: errorMessage,
        response: { data: { message: 'API Error' } }
      });

      await expect(whoisJson.nslookup('example.com')).rejects.toThrow(
        `WhoisJson API Error: ${errorMessage}`
      );
    });
  });

  describe('ssl', () => {
    const mockResponse = {
      data: {
        domain: 'example.com',
        valid: true,
        issuer: {
          organization: 'Let\'s Encrypt',
          commonName: 'R3',
          countryName: 'US'
        },
        subject: {
          commonName: 'example.com'
        },
        validFrom: '2024-01-01T00:00:00Z',
        validTo: '2024-04-01T00:00:00Z',
        serialNumber: '123456789',
        version: 3,
        signatureAlgorithm: 'SHA256withRSA'
      }
    };

    it('should make a GET request to the correct endpoint', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await whoisJson.ssl('example.com');

      expect(mockedAxios.get).toHaveBeenCalledWith('/ssl', {
        params: { domain: 'example.com' }
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error when the API request fails', async () => {
      const errorMessage = 'API Error';
      mockedAxios.get.mockRejectedValueOnce({
        isAxiosError: true,
        message: errorMessage,
        response: { data: { message: 'API Error' } }
      });

      await expect(whoisJson.ssl('example.com')).rejects.toThrow(
        `WhoisJson API Error: ${errorMessage}`
      );
    });
  });
}); 