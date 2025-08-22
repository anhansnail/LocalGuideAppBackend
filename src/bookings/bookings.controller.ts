import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBooking(@Body() dto: CreateBookingDto, @Req() req) {
    const userId = req.user.userId; // từ JWT payload
    return this.bookingsService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async myBookings(@Req() req) {
    const userId = req.user.userId;
    return this.bookingsService.findAllByUser(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async allBookings() {
    return this.bookingsService.findAll();
  }
}
