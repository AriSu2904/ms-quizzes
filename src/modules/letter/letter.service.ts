import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { log } from 'console';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LetterService {
    constructor(private readonly http: HttpService) {}

    async fetchLetterByName(name: string, token: string) {
        log('Fetching letters from the API');

        const headers = {
            'Authorization': token,
        }

        const baseUrl = process.env.MS_LEARNING;
        const url = `${baseUrl}/api/v1/letters/${name}`;
        
        try {
            const { data: response } = await firstValueFrom(this.http.get(url, { headers }));

            log(`Success fetch with total data ${response.data.length}`);
            return response.data;
        } catch (error) {
            throw new HttpException(`Failed to fetch ${name} letters`, 500);
        }
    }
}
