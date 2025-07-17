import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { TodosService } from 'src/todos/todos.service';

@Injectable()
export class TodoNotFoundPipe implements PipeTransform {
  constructor(private readonly todoService: TodosService){}
  async transform(id: string, _metadata: ArgumentMetadata) {

    const isTodoPresent = await this.todoService.findOne(id)

    if(!isTodoPresent){
      throw new NotFoundException("Todo not found")
    }
    return id;
  }
}
