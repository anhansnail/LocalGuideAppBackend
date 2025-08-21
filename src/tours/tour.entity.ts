import { Entity, PrimaryGeneratedColumn, Column, OneToMany  } from 'typeorm';
import { Booking } from '../bookings/booking.entity';

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  location: string;

  // Thêm dòng này:
  @OneToMany(() => Booking, (booking) => booking.tour)
  bookings: Booking[];
}
