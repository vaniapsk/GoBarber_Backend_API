export default interface ICacheProvider {
  /** Will save cache information */
  save(key: string, value: any): Promise<void>;

  /** Will get cache information. Can return an object, string, etc. */
  recover<T>(key: string): Promise<T | null>;

  /** Will invalidate cache. This will happen when infomation in db changes. */
  invalidate(key: string): Promise<void>;

  /** Will invalidate cache that key starts with a specific string. */
  invalidatePrefix(prefix: string): Promise<void>;
}
