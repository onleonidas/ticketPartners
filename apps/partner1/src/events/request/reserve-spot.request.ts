import { TicketKind } from '@prisma/client';

export class ReserveSpotRequest {
  spots: string[]; //nome dos lugares
  ticket_kind: TicketKind;
  email: string;
}
