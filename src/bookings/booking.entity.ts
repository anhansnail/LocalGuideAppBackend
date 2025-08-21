import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Tour } from '../tours/tour.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @ManyToOne(() => Tour, (tour) => tour.bookings)
  tour: Tour;

  @Column()
  guests: number;

  @Column()
  date: string; // YYYY-MM-DD

  @CreateDateColumn()
  createdAt: Date;
}
