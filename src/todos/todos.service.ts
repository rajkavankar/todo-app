import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateTodoDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Todos as Todo } from '@prisma/client';
import { SuccessResponse } from 'src/common/types';



@Injectable()
export class TodosService {

    private readonly logger = new Logger(TodosService.name, { timestamp: true });

  constructor(private  prismaService: PrismaService){}

  async create(createTodoDto: CreateTodoDto): Promise<SuccessResponse<Todo>> {
    try {
      const todo =  await this.prismaService.todos.create({
        data : createTodoDto
      })

      this.logger.log("Todo created successfully")

      return {success: true, data: {todo}}
    } catch (error) {
      this.logger.error(error.stack)
      throw new InternalServerErrorException()
    }
  }

  async findAll(): Promise<SuccessResponse<Todo[]>> {
    try {
      const todos =  await this.prismaService.todos.findMany()

      this.logger.log("Todos fetched successfully")

      return {success: true, data: {todos}}
    } catch (error) {
      this.logger.error(error.stack)
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: string) : Promise<SuccessResponse<Todo | null> |null>  {

      const todo =  await this.prismaService.todos.findUnique({
        where : {id}
      })

      if(todo){
        this.logger.log(`Todo ${todo.id} fetched successfully`)

        return {success: true, data: {todo}}
      }else {

        this.logger.error(`Todo ${id} not found`)

       return null
      }
  }

  async update(id: string, updateTodoDto: CreateTodoDto): Promise<SuccessResponse<Todo | null>> {
    try {
      const todo =  await this.prismaService.todos.update({
        where : {id},
        data: updateTodoDto
      })

      this.logger.log(`Todo ${todo.id} updated successfully`)

      return {success: true, data: {todo}}
    } catch (error) {
      this.logger.error(error.stack)
      throw new InternalServerErrorException()
    }
  }

  async remove(id: string) {
    try {
      const todo =  await this.prismaService.todos.delete({
        where : {id},      
      })

      this.logger.log(`Todo ${todo.id} deleted successfully`)

      return {success: true, data: {message: "todo deleted successfully"}}

    } catch (error) {
      this.logger.error(error.stack)
      throw new InternalServerErrorException()
    }
  }
}
