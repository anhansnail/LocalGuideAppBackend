import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './tour.entity';

@Injectable()
export class ToursService {
  constructor(@InjectRepository(Tour) private repo: Repository<Tour>) {}

  findAll() {
    return this.repo.find(); // chắc chắn trả về mảng []
  }
  
  create(dto: { title: string; description: string; price: number; location: string }) {
    const tour = this.repo.create(dto);
    return this.repo.save(tour);
  }

  async update(id: number, dto: { title: string; description: string; price: number; location: string }) {
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const tour = await this.repo.findOne({ where: { id } });
    if (!tour) return null;
    await this.repo.remove(tour);
    return { deleted: true };
  }
}
