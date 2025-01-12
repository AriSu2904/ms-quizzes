import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { log } from 'console';

@Injectable()
export class RedisService {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async getCache(name: string) {
        log(`Fetching ${name} from redis`);

        const data = await this.cacheManager.get(name);
        log(`Success fetch data ${name} from redis`);
        return data;
    }

    async setCache(name: string, data: any) {
        await this.cacheManager.set(name, data);
        log(`Success set to redis ${name}`);
    }
}
