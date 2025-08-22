import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  NotFoundException 
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // 👉 Lấy tất cả roles
  @Get()
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  // 👉 Lấy role theo id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Role> {
    const role = await this.rolesService.findOne(+id);
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return role;
  }

  // 👉 Thêm role mới
  @Post()
  async create(@Body('name') name: string): Promise<Role> {
    return this.rolesService.create(name);
  }

  // 👉 Xóa role
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    const deleted = await this.rolesService.remove(+id);
    return { deleted };
  }
}
