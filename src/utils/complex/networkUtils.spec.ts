import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NetworkUtils } from './networkUtils';

vi.stubGlobal('fetch', vi.fn());

const fetchMock = vi.mocked(global.fetch);

describe('NetworkUtils', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    NetworkUtils['cache'].clear();
    NetworkUtils['pendingRequests'].clear();
  });

  describe('fetchWithCache', () => {
    it('should return cached data if available and not expired', async () => {
      const url = 'https://api.example.com/data';
      const data = { foo: 'bar' };
      NetworkUtils['cache'].set('GET-https://api.example.com/data-', { data, timestamp: Date.now() });

      const result = await NetworkUtils.fetchWithCache(url);

      expect(result).toEqual(data);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it('should fetch data if cache is expired', async () => {
      const url = 'https://api.example.com/data';
      const data = { foo: 'bar' };
      NetworkUtils['cache'].set('GET-https://api.example.com/data-', { data, timestamp: Date.now() - 10000 });

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => data,
      });

      const result = await NetworkUtils.fetchWithCache(url);

      expect(result).toEqual(data);
      expect(fetchMock).toHaveBeenCalledWith(url, expect.any(Object));
    });

    it('should force refresh data if forceRefresh is true', async () => {
      const url = 'https://api.example.com/data';
      const data = { foo: 'bar' };

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => data,
      });

      const result = await NetworkUtils.fetchWithCache(url, { forceRefresh: true });

      expect(result).toEqual(data);
      expect(fetchMock).toHaveBeenCalledWith(url, expect.any(Object));
    });

    it('should handle fetch error and not cache the result', async () => {
      const url = 'https://api.example.com/data';

      fetchMock.mockRejectedValue(new Error('Network error'));

      await expect(NetworkUtils.fetchWithCache(url)).rejects.toThrow('Network error');
      expect(NetworkUtils['cache'].has('GET-https://api.example.com/data-')).toBe(false);
    });
  });

  describe('fetchWithRetry', () => {
    it('should retry on failure and succeed', async () => {
      const url = 'https://api.example.com/data';
      const data = { foo: 'bar' };

      fetchMock
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValue({
          ok: true,
          json: async () => data,
        });

      const result = await NetworkUtils.fetchWithRetry(url, { retryCount: 3 });

      expect(result).toEqual(data);
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('should fail after exceeding retry attempts', async () => {
      const url = 'https://api.example.com/data';

      fetchMock.mockRejectedValue(new Error('Network error'));

      await expect(NetworkUtils.fetchWithRetry(url, { retryCount: 2 })).rejects.toThrow('Network error');
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    it('should call onRetry callback on each retry', async () => {
      const url = 'https://api.example.com/data';
      const onRetry = vi.fn();

      fetchMock.mockRejectedValue(new Error('Network error'));

      await expect(NetworkUtils.fetchWithRetry(url, { retryCount: 2, onRetry })).rejects.toThrow('Network error');
      expect(onRetry).toHaveBeenCalledTimes(2);
    });
  });
});
