import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { log } from 'console';
import { firstValueFrom } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class LetterService {
    constructor(private readonly http: HttpService, @Inject(REQUEST) private readonly req: any) {}

    async fetchLetterByName(name: string) {
        log('Fetching letters from the API');

        const authHeader = this.req.headers['authorization'];

        const baseUrl = process.env.MS_LEARNING;
        const url = `${baseUrl}/api/v1/letters/${name}`;
        
        try {
            const { data: response } = await firstValueFrom(this.http.get(url, { headers: { Authorization: authHeader } }));

            log(`Success fetch with total data ${response.data.length}`);
            return response.data;
        } catch (error) {
            throw new HttpException(`Failed to fetch ${name} letters`, 500);
        }
    }
}
