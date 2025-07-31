import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [TodosModule, PrismaModule, HealthcheckModule],
})
export class AppModule {}
