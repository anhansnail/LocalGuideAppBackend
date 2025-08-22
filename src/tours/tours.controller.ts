import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ToursService } from './tours.service';
import { Tour } from './tour.entity';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('guide', 'admin')
  @Post()
  create(@Body() dto: CreateTourDto) {
    return this.toursService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('guide', 'admin')
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateTourDto) {
    return this.toursService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('guide', 'admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.toursService.remove(id);
  }
}
