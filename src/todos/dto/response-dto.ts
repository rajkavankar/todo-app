import { ApiProperty } from '@nestjs/swagger';

export class TodoType {
    @ApiProperty({type: "string", format: "uuid"})
    id: string  

    @ApiProperty()
    todo: string

    @ApiProperty({default: false})
    isCompleted: boolean

    @ApiProperty({ type: () => Date })
    createdAt: Date

    @ApiProperty({ type: () => Date })
    updatedAt: Date 
}

export class TodoWhithData {
    @ApiProperty({ type: () => TodoType })
    todo: TodoType;
  }

  export class TodosWithData {
    @ApiProperty({ type: () => TodoType, isArray: true })
    todos: TodoType[];
  }

  export class TodoWithMessage {
    @ApiProperty()
    message: string;
  }

export class SingleTodoResponseDto {
    @ApiProperty()
    success: boolean;
  
    @ApiProperty({ type: () => TodoWhithData })
    data:TodoWhithData
  }

  export class TodoResponseDto {
    @ApiProperty()
    success: boolean;
  
    @ApiProperty({ type: () => TodosWithData})
    data: TodosWithData
  }

  export class TodoMessageResponseDto {
    @ApiProperty()
    success: boolean;
  
    @ApiProperty({ type: () => TodoWithMessage})
    data: TodoWithMessage
  }