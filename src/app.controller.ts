import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { randomUUID } from 'crypto';
import { CreateNotification } from './create-notification-body';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getHello() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() createNot: CreateNotification) {
    const { recipientId, content, category } = createNot;

    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        recipientId,
        content,
        category,
      },
    });
  }
}
