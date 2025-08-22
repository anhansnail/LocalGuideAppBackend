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
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/role.entity';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ToursController } from './tours/tours.controller';
import { ToursService } from './tours/tours.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '27051998', // đổi theo mật khẩu PostgreSQL của bạn
    database: 'tours',
    entities: [User, Tour, Booking, Role], // 👈 quan trọng
    synchronize: true,// tự tạo bảng
    }),
    TypeOrmModule.forFeature([Booking, Tour, User, Role]), // thêm dòng này nếu bạn inject repo ngoài module
    UsersModule,
    AuthModule,
    ToursModule,
    BookingsModule,
    RolesModule,
  ],
  controllers: [AppController, BookingsController, UsersController, ToursController,RolesController],
  providers: [AppService, BookingsService,UsersService, ToursService, RolesService],
})
export class AppModule {}
