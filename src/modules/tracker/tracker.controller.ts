import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { CreateTracker } from './dto/createTracker';

@Controller('tracker')
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Post()
  create(@Body() createTrackerDto: CreateTracker) {
    return this.trackerService.create(createTrackerDto);
  }

  @Get()
  findAll() {
    return this.trackerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackerService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackerService.remove(+id);
  }
}
