import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { log } from 'console';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LetterService {
    constructor(private readonly http: HttpService) {}

    async fetchLetterByName(name: string) {
        log('Fetching letters from the API');

        const headers = {
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMjA0MDEwMTAwMjkiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpZCI6IjIyMDQwMTAxMDAyOSIsImlzcyI6ImNvbS5zZXJ2aWNlLmF1dGhvcml6YXRpb24iLCJpYXQiOjE3MzY1NzY1MzgsImV4cCI6MTczNjY2MjkzOH0.SluNeYNHK28Ko_PuPolJoHMYK5-JdxP_WxNTbi3F134p42F09GUhLwzEMo592XPSvXTDi6-UhuUOEvIs75k822p1LCurX_Je3FJRK9Em2TWSeSXFJ6oJWwEf3JZqRDOeEvVjeQxDj1bMVa20nsqxos8JYkdzZRrjnK2DmQPxFe98cFGMzEUJ0Q2PusjxrwCzVCTTF4B3GfwJvyBUjxlOFg8sVe49j2Z9mQKf2g0aECBtRhQtgBQ-TBPdGYmcqRywZuB6lkP6uiIhEct1lldiwQKTgbtL8Im5U5LrHUPXbYjSgLMD7r83PRyzad02RBHKt40UyHveuek_R-gDuWF4Tg',
        }

        const url = `http://localhost:8080/api/v1/letters/${name}`;
        
        try {
            const { data: response } = await firstValueFrom(this.http.get(url, { headers }));

            log(`Success fetch with total data ${response.data.length}`);
            return response.data;
        } catch (error) {
            throw new HttpException(`Failed to fetch ${name} letters`, error.response.status);
        }
    }
}
