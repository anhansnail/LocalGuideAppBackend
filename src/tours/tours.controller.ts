import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ToursService } from './tours.service';
import { Tour } from './tour.entity';


class CreateTourDto {
  title: string;
  description: string;
  price: number;
  location: string;
}

@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {}

  @Get()
  findAll() {
    return this.toursService.findAll();
  }

  @Post()
  create(@Body() dto: CreateTourDto) {
    return this.toursService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateTourDto) {
    return this.toursService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.toursService.remove(id);
  }
}
