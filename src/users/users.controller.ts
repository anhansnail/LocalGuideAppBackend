import { Controller, Get, Post, Body,
  Patch,
  Param, 
  UseGuards,BadRequestException,} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesService } from '../roles/roles.service';
import type { RoleName } from '../roles/role.enum';

// (giữ GET, bỏ POST để tránh trùng register)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
    private readonly rolesService: RolesService,) {}


    // @Post()
    // create(@Body() body: { email: string; password: string }) {
    // return this.usersService.create(body.email, body.password);
    // }


    @Get()
    findAll() {
    return this.usersService.findAll();
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Patch(':id/role')
    async setRole(
    @Param('id') id: string,
    @Body('role') roleName: RoleName, // 'admin' | 'guide' | 'customer'     
    ) {
    if (!['admin', 'guide', 'customer'].includes(roleName)) {
        throw new BadRequestException('Invalid role');
    }
    return this.usersService.setRole(+id, roleName);
    }

}