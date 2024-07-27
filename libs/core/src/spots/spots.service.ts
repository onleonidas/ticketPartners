import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { SpotStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EventsService } from '../events/events.service';

@Injectable()
export class SpotsService {
  constructor(
    private prismaService: PrismaService,
    private eventsService: EventsService,
  ) {}

  async create(createSpotDto: CreateSpotDto & { eventId: string }) {
    const event = await this.eventsService.findOne(createSpotDto.eventId);

    if (!event) {
      throw new Error('Event not found');
    }

    return await this.prismaService.spot.create({
      data: {
        ...createSpotDto,
        status: SpotStatus.AVAILABLE,
        eventId: event.id,
      },
    });
  }

  async findAll(event: string) {
    return await this.prismaService.spot.findMany({
      where: {
        eventId: event,
      },
    });
  }

  async findOne(id: string, event: string) {
    return await this.prismaService.spot.findUnique({
      where: {
        id: id,
        eventId: event,
      },
    });
  }
}
