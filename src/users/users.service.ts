import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {
constructor(@InjectRepository(User) private repo: Repository<User>) {}


// create(email: string, password: string) {
// const user = this.repo.create({ email, password });
// return this.repo.save(user);
// }

// findAll() {
// return this.repo.find();
// }

    // Tạo user với password đã được hash sẵn
    async create(email: string, passwordHash: string) {
    const user = this.repo.create({ email, password: passwordHash });
    const saved = await this.repo.save(user);
    // trả về thông tin an toàn
    return { id: saved.id, email: saved.email };
    }

    // Lấy danh sách user (ẩn password)
    findAll() {
        return this.repo.find({ select: ['id', 'email'] });
    }

    // Tìm user kèm password (để so sánh bcrypt) → phải bật select: true
    findByEmail(email: string) {
        return this.repo
        .createQueryBuilder('user')
        .addSelect('user.password') // vì cột password select: false
        .where('user.email = :email', { email })
        .getOne();
    }



}