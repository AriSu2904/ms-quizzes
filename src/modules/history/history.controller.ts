import { Controller, Get, Inject, Param } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryResponse } from './dto/historyResponse';
import { REQUEST } from '@nestjs/core';
import { extractUserId } from 'src/utils/authDecoder';

@Controller('history')
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
    @Inject(REQUEST) private readonly req: any
  ) {}

  @Get()
  findAll(): Promise<HistoryResponse[]> {
    const authHeader = this.req.headers['authorization'];
    const credentials = extractUserId(authHeader);

    return this.historyService.findAll(credentials);
  }

  @Get(':id')
  findOne(@Param() id: string): Promise<HistoryResponse> {
    const authHeader = this.req.headers['authorization'];
    const credentials = extractUserId(authHeader);

    return this.historyService.findOne(id, credentials);
  }
}
