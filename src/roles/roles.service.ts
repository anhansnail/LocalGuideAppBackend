import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async create(name: string): Promise<Role> {
    const role = this.roleRepository.create({ name: name as 'admin' | 'guide' | 'customer' });
    return this.roleRepository.save(role);
  }

    async remove(id: number): Promise<boolean> {
    const result = await this.roleRepository.delete(id);
    return (result.affected ?? 0) > 0;
    }

}
