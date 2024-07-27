import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateSpotRequest } from './request/create-spot.request';
import { SpotsService } from '@app/core';

@Controller('events/:eventId/spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  create(
    @Param('eventId') eventId: string,
    @Body() createSpotDto: CreateSpotRequest,
  ) {
    return this.spotsService.create({ ...createSpotDto, eventId });
  }

  @Get()
  findAll(@Param('eventId') eventId: string) {
    return this.spotsService.findAll(eventId);
  }

  @Get(':id')
  findOne(@Param('eventId') eventId: string, @Param('id') id: string) {
    return this.spotsService.findOne(id, eventId);
  }
}
