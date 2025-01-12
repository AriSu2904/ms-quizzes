import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { log } from 'console';
import { firstValueFrom } from 'rxjs';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class MaterialService {
    constructor(private readonly http: HttpService, @Inject(REQUEST) private readonly req: any, private cache: RedisService) {}

    async fetchMaterials(name: string) {
        log(`Fetching ${name} material`);
        try {
            
            let data = await this.cache.getCache(name);

            if (!data) {
                data = await this._fetchFromApi(name);
                await this.cache.setCache(name, data);
            }

            return data;
        } catch (error) {
            log(`Failed to fetch ${name} letters ${error}`);

            throw new HttpException(`Failed to fetch ${name} letters`, 500);
        }
    }

    private async _fetchFromApi(name: string) {
        log(`Fetching ${name} material from API`);

        const authHeader = this.req.headers['authorization'];
        const baseUrl = process.env.MS_LEARNING;

        const url = `${baseUrl}/api/v1/materials/${name}`;
        const { data: response } = await firstValueFrom(this.http.get(url, { headers: { Authorization: authHeader } }));

        log(`Success fetch with total data ${response.data.length}`);
        return response.data;
    }
}