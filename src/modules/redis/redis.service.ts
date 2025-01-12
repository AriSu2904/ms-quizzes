import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { log } from 'console';

@Injectable()
export class RedisService {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async getCache(name: string): Promise<any[] | null> {
        log(`Fetching ${name} from redis`);

        const data = await this.cacheManager.get(name) as any[] | null;
        log(`Success fetch data ${name} from redis with length ${data?.length}`);
        return data;
    }

    async setCache(name: string, data: any) {
        await this.cacheManager.set(name, data);
        log(`Success set to redis ${name}`);
    }
}
