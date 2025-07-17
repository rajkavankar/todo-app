import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto, SingleTodoResponseDto, TodoMessageResponseDto, TodoResponseDto } from './dto';
import { TodoNotFoundPipe } from './pipes';



@Controller('todos')
@ApiTags("Todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}


  @ApiOperation({
    summary: 'Create TODO item',
    description: 'Creates TODO and stored it to the database.',
  })
  @ApiCreatedResponse({
    description: 'Successfully created todo',
    type:SingleTodoResponseDto,
  })
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @ApiOperation({
    summary: 'Get all TODO items',
    description: 'Returns a list of all TODO items currently stored in the database.',
  })
  @ApiOkResponse({
    description: 'Successfully fetched todos',
    type:TodoResponseDto,
  })
  @Get()
  findAll() {
    return this.todosService.findAll();
  }


  @ApiOperation({
    summary: 'Get a single TODO item',
    description: 'Returns a TODO item currently stored in the database.',
  })
  @ApiOkResponse({
    description: 'Successfully fetched a todo',
    type: TodoResponseDto,
  })
  @Get(':id')
  findOne(@Param("id", TodoNotFoundPipe) id: string) {
    return this.todosService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a single TODO item',
    description: 'Returns a TODO item currently updated in the database.',
  })
  @ApiOkResponse({
    description: 'Successfully updated todo',
    type: TodoResponseDto,
  })
  @Put(':id')
  update(@Param("id", TodoNotFoundPipe)  id: string, @Body() updateTodoDto: CreateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }


  @ApiOperation({
    summary: 'Delete a single TODO item',
    description: 'Deletes a TODO item in the database.',
  })
  @ApiOkResponse({
    description: 'Successfully deleted todo',
    type: TodoMessageResponseDto,
  })
  @Delete(':id')
  remove(@Param("id", TodoNotFoundPipe) id: string) {
    return this.todosService.remove(id);
  }
}
