/**
 * 复杂网络请求工具类
 */
export class NetworkUtils {
    // Add cache size limit
    private static readonly MAX_CACHE_SIZE = 100;
    private static readonly DEFAULT_CACHE_DURATION = 5000;
    
    private static cache = new Map<string, { data: any; timestamp: number }>();
    private static pendingRequests = new Map<string, Promise<any>>();

    /**
     * Generate cache key with better performance
     */
    private static generateCacheKey(url: string, method: string, body?: any): string {
        const bodyHash = body ? this.hashCode(JSON.stringify(body)) : '';
        return `${method}-${url}-${bodyHash}`;
    }

    /**
     * Simple but effective string hash function
     */
    private static hashCode(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return hash;
    }

    /**
     * Clean expired cache entries
     */
    private static cleanCache(cacheDuration: number): void {
        const now = Date.now();
        for (const [key, value] of this.cache) {
            if (now - value.timestamp > cacheDuration) {
                this.cache.delete(key);
            }
        }
    }

    /**
     * 带缓存的请求
     */
    static async fetchWithCache<T>(
        url: string,
        options: {
            method?: string;
            headers?: Record<string, string>;
            body?: any;
            cacheDuration?: number;
            forceRefresh?: boolean;
        } = {}
    ): Promise<T> {
        const method = options.method || 'GET';
        const cacheDuration = options.cacheDuration || this.DEFAULT_CACHE_DURATION;
        
        // More efficient cache key generation
        const cacheKey = this.generateCacheKey(url, method, options.body);

        // Check and clean cache periodically
        if (this.cache.size > this.MAX_CACHE_SIZE) {
            this.cleanCache(cacheDuration);
        }

        const cached = this.cache.get(cacheKey);
        if (!options.forceRefresh && cached && Date.now() - cached.timestamp < cacheDuration) {
            return cached.data;
        }

        // Reuse pending request if exists
        const pendingRequest = this.pendingRequests.get(cacheKey);
        if (pendingRequest) {
            return pendingRequest;
        }

        // Stringify body once
        const bodyString = options.body ? JSON.stringify(options.body) : undefined;

        const promise = fetch(url, {
            method,
            headers: options.headers,
            body: bodyString
        })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            this.cache.set(cacheKey, { data, timestamp: Date.now() });
            this.pendingRequests.delete(cacheKey);
            return data as T;
        })
        .catch(error => {
            this.pendingRequests.delete(cacheKey);
            throw error;
        });

        this.pendingRequests.set(cacheKey, promise);
        return promise;
    }

    /**
     * 请求重试和超时处理
     */
    static async fetchWithRetry<T>(
        url: string,
        options: {
            retryCount?: number;
            timeout?: number;
            onRetry?: (error: Error, attempt: number) => void;
        } = {}
    ): Promise<T> {
        const { retryCount = 3, timeout = 5000, onRetry } = options;
        let attempts = 0;

        while (attempts <= retryCount) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeout);

                const response = await fetch(url, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                return data as T;
            } catch (error) {
                attempts++;
                if (attempts > retryCount) throw error;
                onRetry?.(error as Error, attempts);
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 100));
            }
        }

        throw new Error('Max retry attempts reached');
    }
} 