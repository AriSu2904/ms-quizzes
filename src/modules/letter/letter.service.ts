import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { log } from 'console';
import { firstValueFrom } from 'rxjs';
import { RedisService } from '../redis/redis.service';

@Injectable({ scope: Scope.REQUEST })
export class LetterService {
    constructor(private readonly http: HttpService, @Inject(REQUEST) private readonly req: any, private cache: RedisService) {}

    async fetchLetterByName(name: string, level: number) {
        log(`Fetching ${name} letters`);
        try {
            // let data = [];
            // for(let i = 1; i <= 4; i++) {
            //     const cacheData = await this.cache.getCache(`${name}-letters-${i}`);
            //     if (!cacheData) {
            //         log('Cache not found, loop stopped at level', i);
            //         break;
            //     }
            //     data = [...data, ...cacheData];
            // }

            let data = await this.cache.getCache(`${name}-letters-${level}`);

            if (!data) {
                data = await this._fetchFromApi(name);

                const groupedData = data.reduce((acc, letter) => {
                    const level = letter.level;
                    if (!acc[level]) {
                        acc[level] = [];
                    }
                    acc[level].push(letter);
                    return acc;
                }, {});

                for (const level in groupedData) {
                    await this.cache.setCache(`${name}-letters-${level}`, groupedData[level]);
                }
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
}
