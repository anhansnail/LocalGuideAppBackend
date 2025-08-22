import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from '../roles/roles.module';
import { Role } from 'src/roles/role.entity';

// (export UsersService để Auth dùng)
@Module({
imports: [TypeOrmModule.forFeature([User,Role]),RolesModule],
providers: [UsersService],
controllers: [UsersController],
  exports: [UsersService], // 👈 export để AuthModule dùng
})
export class UsersModule {

}