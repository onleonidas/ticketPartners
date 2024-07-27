import { PartialType } from '@nestjs/mapped-types';
import { CreateEventRequest } from './create-event.request';

export class UpdateEventRequest extends PartialType(CreateEventRequest) {
  name?: string;
  description?: string;
  date?: Date;
  price?: number;
}
