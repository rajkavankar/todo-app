import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTodoDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Todos as Todo } from '@prisma/client';
import { SuccessResponse } from 'src/common/types';



@Injectable()
export class TodosService {
  constructor(private  prismaService: PrismaService){}
  async create(createTodoDto: CreateTodoDto): Promise<SuccessResponse<Todo>> {
    try {
      const todo =  await this.prismaService.todos.create({
        data : createTodoDto
      })
      return {success: true, data: {todo}}
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findAll(): Promise<SuccessResponse<Todo[]>> {
    try {
      const todos =  await this.prismaService.todos.findMany()
      return {success: true, data: {todos}}
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: string) : Promise<SuccessResponse<Todo | null> |null>  {
      const todo =  await this.prismaService.todos.findUnique({
        where : {id}
      })
      if(todo){
        return {success: true, data: {todo}}
      }else {
       return null
      }
  }

  async update(id: string, updateTodoDto: CreateTodoDto): Promise<SuccessResponse<Todo | null>> {
    try {
      const todo =  await this.prismaService.todos.update({
        where : {id},
        data: updateTodoDto
      })
      return {success: true, data: {todo}}
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async remove(id: string) {
    try {
      const todo =  await this.prismaService.todos.delete({
        where : {id},      
      })
      return {success: true, data: {message: "todo deleted successfully"}}
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
