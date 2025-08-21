import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './create-booking.dto';
import { User } from '../users/user.entity';
import { Tour } from '../tours/tour.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private repo: Repository<Booking>,
    @InjectRepository(Tour) private tourRepo: Repository<Tour>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(userId: number, dto: CreateBookingDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const tour = await this.tourRepo.findOne({ where: { id: dto.tourId } });
    if (!user || !tour) throw new Error('User or Tour not found');

    const booking = this.repo.create({
      user,
      tour,
      guests: dto.guests,
      date: dto.date,
    });
    return this.repo.save(booking);
  }

  findAllByUser(userId: number) {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['tour'],
      order: { createdAt: 'DESC' },
    });
  }

  findAll() {
    return this.repo.find({ relations: ['tour', 'user'], order: { createdAt: 'DESC' } });
  }
}
