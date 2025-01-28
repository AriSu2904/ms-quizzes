import { Module } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tracker } from './entities/tracker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tracker])],
  providers: [TrackerService],
  exports: [TrackerService]
})
export class TrackerModule {}
