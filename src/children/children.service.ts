import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ChildrenService {
  constructor(private prisma: PrismaService) {}

  create(createChildDto: CreateChildDto) {
    return this.prisma.child.create({
      data: createChildDto,
    });
  }

  findAll() {
    return this.prisma.child.findMany({
      include: { toy: true },
    });
  }

  async findOne(id: number) {
    const child = await this.prisma.child.findUnique({ where: { id }, include: { toy: true } });
    if (!child) throw new NotFoundException('Child not found');
    return child;
  }

  async update(id: number, updateChildDto: UpdateChildDto) {
    const child = await this.prisma.child.findUnique({ where: { id } });
    if (!child) throw new NotFoundException('Child not found');
    if (updateChildDto.wasGood === false) {
       return this.prisma.child.update({
         where: { id },
         data: {
           ...updateChildDto,
           toyId: null,
         },
       });
    }
    return this.prisma.child.update({
      where: { id },
      data: updateChildDto,
    });
  }

  async remove(id: number) {
    const child = await this.prisma.child.findUnique({ where: { id } });
    if (!child) throw new NotFoundException('Child not found');
    return this.prisma.child.delete({
      where: { id },
    });
  }

  async addToy(childId: number, toyId: number) {
    const child = await this.prisma.child.findUnique({ where: { id: childId } });
    if (!child) throw new NotFoundException('Child not found');
    if (!child.wasGood) {
      throw new ConflictException('Child was not good');
    }
    
    return this.prisma.child.update({
      where: { id: childId },
      data: { toyId },
    });
  }

  async removeToy(childId: number, toyId: number) {
      const child = await this.prisma.child.findUnique({ where: { id: childId } });
      if (!child) throw new NotFoundException('Child not found');
      if (child.toyId !== toyId) {
          throw new NotFoundException('No toy assigned to child');
      }
      return this.prisma.child.update({
          where: { id: childId },
          data: { toyId: null },
      });
  }
}

