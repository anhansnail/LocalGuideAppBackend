import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ToursModule } from './tours/tours.module';
import { Tour } from './tours/tour.entity';
import { BookingsService } from './bookings/bookings.service';
import { BookingsController } from './bookings/bookings.controller';
import { BookingsModule } from './bookings/bookings.module';
import { Booking } from './bookings/booking.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '27051998', // đổi theo mật khẩu PostgreSQL của bạn
    database: 'tours',
    entities: [User, Tour, Booking], // 👈 quan trọng
    synchronize: true,// tự tạo bảng
    }),
    TypeOrmModule.forFeature([Booking, Tour, User]), // thêm dòng này nếu bạn inject repo ngoài module
    UsersModule,
    AuthModule,
    ToursModule,
    BookingsModule,
  ],
  controllers: [AppController, BookingsController],
  providers: [AppService, BookingsService],
})
export class AppModule {}
