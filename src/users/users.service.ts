import { Injectable , NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../roles/role.entity';
import { RoleName } from '../roles/role.enum';


@Injectable()
export class UsersService {
constructor(@InjectRepository(User) private repo: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
) {}


// create(email: string, password: string) {
// const user = this.repo.create({ email, password });
// return this.repo.save(user);
// }

// findAll() {
// return this.repo.find();
// }

    // Tạo user với password đã được hash sẵn
    async create(email: string, passwordHash: string, role?: Role) {
    const user = this.repo.create({ email, password: passwordHash, role });
    const saved = await this.repo.save(user);
    // trả về thông tin an toàn
    return { id: saved.id, email: saved.email, role: saved.role?.name };
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
        .leftJoinAndSelect('user.role', 'role')
        .where('user.email = :email', { email })
        .getOne();
    }

   // users.service.ts

async setRole(id: number, roleName: RoleName) {
  const role = await this.roleRepository.findOne({ where: { name: roleName } });
  if (!role) throw new NotFoundException(`Role ${roleName} not found`);

  const user = await this.repo.findOne({ where: { id }, relations: ['role'] });
  if (!user) throw new NotFoundException(`User with id ${id} not found`);

  user.role = role;
  const updated = await this.repo.save(user);

  return {
    id: updated.id,
    email: updated.email,
    role: updated.role ? updated.role.name : null,
  };
}




}