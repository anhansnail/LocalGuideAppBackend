import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './booking.entity';
import { User } from '../users/user.entity';
import { Tour } from '../tours/tour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Tour])],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService], // nếu muốn import ra ngoài
})
export class BookingsModule {}
