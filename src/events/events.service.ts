import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ReserveSpotDto } from './dto/reserve-spot.dto';

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
    const date = new Date(updateEventDto.date);
    return this.prismaService.event.update({
      where: { id },
      data: {
        name: updateEventDto.name,
        description: updateEventDto.description,
        date: date,
        price: updateEventDto.price,
      },
    });
  }

  async remove(id: string) {
    return this.prismaService.event.delete({
      where: { id },
    });
  }

  async reserveSpot(reserveSpotDto: ReserveSpotDto & { event: string }) {
    const spots = await this.prismaService.spot.findMany({
      where: {
        eventId: reserveSpotDto.event,
        name: {
          in: reserveSpotDto.spots,
        },
      },
    });

    console.log(spots);

    // Verify if all spots were found
    if (spots.length !== reserveSpotDto.spots.length) {
      const spotsFoundName = spots.map((spot) => spot.name);
      const notFoundSpots = reserveSpotDto.spots.filter(
        (spot) => !spotsFoundName.includes(spot),
      );
      throw new Error(
        `Algumas vagas não estão disponíveis: ${notFoundSpots.join(', ')}`,
      );
    }

    try {
      const tickets = await this.prismaService.$transaction(async (prisma) => {
        // Create reservation history
        await prisma.reservationHistory.createMany({
          data: spots.map((spot) => ({
            spotId: spot.id,
            ticketKind: reserveSpotDto.ticket_kind,
            email: reserveSpotDto.email,
            status: 'CONFIRMED',
          })),
        });

        // Update spot status
        await prisma.spot.updateMany({
          where: {
            id: {
              in: spots.map((spot) => spot.id),
            },
          },
          data: {
            status: 'RESERVED',
          },
        });

        // Create ticket
        const tickets = await Promise.all(
          spots.map((spot) =>
            prisma.ticket.create({
              data: {
                spotId: spot.id,
                ticketKind: reserveSpotDto.ticket_kind,
                email: reserveSpotDto.email,
              },
            }),
          ),
        );

        return tickets;
      });

      return tickets;
    } catch (e) {
      console.error(e);
      throw new Error('Falha ao reservar as vagas');
    }
  }
}
