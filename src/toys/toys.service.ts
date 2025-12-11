import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ToysService {
  constructor(private prisma: PrismaService) {}

  create(createToyDto: CreateToyDto) {
    return this.prisma.toy.create({
      data: createToyDto,
    });
  }

  findAll() {
    return this.prisma.toy.findMany();
  }

  async findOne(id: number) {
    const toy = await this.prisma.toy.findUnique({ where: { id } });
    if(!toy) throw new NotFoundException('Toy not found');
    return toy;
  }

  async update(id: number, updateToyDto: UpdateToyDto) {
    const toy = await this.prisma.toy.findUnique({ where: { id } });
    if(!toy) throw new NotFoundException('Toy not found');
    return this.prisma.toy.update({
      where: { id },
      data: updateToyDto,
    });
  }

  async remove(id: number) {
    const toy = await this.prisma.toy.findUnique({ where: { id } });
    if(!toy) throw new NotFoundException('Toy not found');
    return this.prisma.toy.delete({
      where: { id },
    });
  }
}

