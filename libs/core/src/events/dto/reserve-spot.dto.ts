import { TicketKind } from '@prisma/client';

export class ReserveSpotDto {
  spots: string[]; //nome dos lugares
  ticket_kind: TicketKind;
  email: string;
}
