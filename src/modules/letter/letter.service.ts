import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { log } from 'console';
import { firstValueFrom } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class LetterService {
    constructor(private readonly http: HttpService, @Inject(REQUEST) private readonly req: any, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async fetchLetterByName(name: string) {
        log(`Fetching ${name} letters`);
        try {
            
            let data = await this._fetchFromRedis(name);

            if (!data) {
                data = await this._fetchFromApi(name);
                await this._setToRedis(name, data);
            }

            return data;
        } catch (error) {
            log(`Failed to fetch ${name} letters ${error}`);

            throw new HttpException(`Failed to fetch ${name} letters`, 500);
        }
    }

    private async _fetchFromApi(name: string) {
        log(`Fetching ${name} letters from API`);

        const authHeader = this.req.headers['authorization'];
        const baseUrl = process.env.MS_LEARNING;

        const url = `${baseUrl}/api/v1/letters/${name}`;
        const { data: response } = await firstValueFrom(this.http.get(url, { headers: { Authorization: authHeader } }));

        log(`Success fetch with total data ${response.data.length}`);
        return response.data;
    }

    private async _fetchFromRedis(name: string) {
        log(`Fetching ${name} letters from redis`);

        const data = await this.cacheManager.get(name);
        log(`Success fetch data ${name} from redis`);
        return data;
    }

    private async _setToRedis(name: string, data: any) {
        await this.cacheManager.set(name, data);
        log(`Success set to redis with total data ${data.length}`);
    }
}
