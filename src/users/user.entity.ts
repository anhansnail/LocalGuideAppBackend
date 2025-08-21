import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from '../bookings/booking.entity';

// Cập nhật Users (ẩn mật khẩu, thêm findByEmail)
@Entity()
export class User {
@PrimaryGeneratedColumn()
id: number;


@Column({ unique: true })
email: string;


  // lưu hash bcrypt, KHÔNG trả về cho client
@Column({ select: false })
password: string;

  // Thêm dòng này:
  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}