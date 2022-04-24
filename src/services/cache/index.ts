import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * @description Get data from Redis memory cache.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @remarks The purpose is to minimize the dependency with third-party libraries in the project.
   * @param key The key value to be searched.
   * @returns The Promise typed object based on the type parameter informed.
   */
  async get<T>(key: string) {
    return await this.cacheManager.get<T>(key);
  }

  /**
   * @description Add data to Redis memory cache.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @remarks The purpose is to minimize the dependency with third-party libraries in the project.
   * @param key The key value to be added.
   * @param data The typed data to be added.
   */
  async add<T>(key: string, data: T) {
    this.cacheManager.set(key, data);
  }

  /**
   * @description Remove data from Redis memory cache.
   * @author Fabio Leite <fabioleitedev@gmail.com>
   * @remarks The purpose is to minimize the dependency with third-party libraries in the project.
   * @param key The key value to be added.
   */
  async remove(key: string) {
    this.cacheManager.del(key);
  }
}
