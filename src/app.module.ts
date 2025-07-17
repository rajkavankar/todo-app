import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TodosModule, PrismaModule],
})
export class AppModule {}
