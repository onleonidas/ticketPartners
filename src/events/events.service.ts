import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const date = new Date(createEventDto.date);

    return this.prismaService.event.create({
      data: {
        name: createEventDto.name,
        description: createEventDto.description,
        date: date,
        price: createEventDto.price,
      },
    });
  }

  async findAll() {
    return this.prismaService.event.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.event.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    return this.prismaService.event.update({
      where: { id },
      data: {
        name: updateEventDto.name,
        description: updateEventDto.description,
        date: updateEventDto.date,
        price: updateEventDto.price,
      },
    });
  }

  async remove(id: string) {
    return this.prismaService.event.delete({
      where: { id },
    });
  }
}
