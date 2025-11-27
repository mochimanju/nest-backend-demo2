import { Injectable } from '@nestjs/common';
import { CreateCatMessageInput } from './dto/create-cat-message.input';
import { UpdateCatMessageInput } from './dto/update-cat-message.input';

@Injectable()
export class CatMessageService {
  create(createCatMessageInput: CreateCatMessageInput) {
    return 'This action adds a new catMessage';
  }

  findAll() {
    return `This action returns all catMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catMessage`;
  }

  update(id: number, updateCatMessageInput: UpdateCatMessageInput) {
    return `This action updates a #${id} catMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} catMessage`;
  }
}
