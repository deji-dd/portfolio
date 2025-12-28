import { LRUCache } from "lru-cache";

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export default function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        // Fixed Window Counter strategy
        // This ensures the count resets after the interval passes
        const interval = options?.interval || 60000;
        const windowStart = Math.floor(Date.now() / interval);
        const key = `${token}:${windowStart}`;

        const tokenCount = (tokenCache.get(key) as number) || 0;
        const currentUsage = tokenCount + 1;
        tokenCache.set(key, currentUsage);

        if (currentUsage > limit) {
          reject();
        } else {
          resolve();
        }
      }),
  };
}
