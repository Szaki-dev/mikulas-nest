import { PrismaClient } from '../generated/prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  prisma.$transaction(async (prisma) => {
    await prisma.child.deleteMany();
    await prisma.toy.deleteMany();
    
    await prisma.toy.create({
      data: {
        name: 'Toy1',
        material: 'wood',
        weight: 1.2,
      },
    });

    await prisma.toy.create({
      data: {
        name: 'Toy2',
        material: 'plastic',
        weight: 0.5,
      },
    });

    await prisma.toy.create({
      data: {
        name: 'Toy3',
        material: 'metal',
        weight: 0.8,
      },
    });
  
    await prisma.child.create({
      data: {
        name: 'Jó Kölök',
        address: 'Hungary, Budapest',
        wasGood: true,
      },
    });
  
    await prisma.child.create({
      data: {
        name: 'Rossz Kölök',
        address: 'Hungary, Debrecen',
        wasGood: false,
      },
    });
  
    await prisma.child.create({
      data: {
        name: 'János',
        address: 'Város, Utca 12',
        wasGood: true,
      },
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
