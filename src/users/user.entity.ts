import { Entity, Column, PrimaryGeneratedColumn, OneToMany, 
  JoinColumn,
  ManyToOne,} from 'typeorm';
import { Booking } from '../bookings/booking.entity';
import { Role } from '../roles/role.entity';

// export type UserRole = 'admin' | 'guide' | 'user';

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

  @ManyToOne(() => Role, (role) => role.users, { eager: true, nullable: true })
  role: Role;


  // Thêm dòng này:
  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}