import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatMessageService } from './cat-message.service';
import { CreateCatMessageInput } from './dto/create-cat-message.input';
import { UpdateCatMessageInput } from './dto/update-cat-message.input';

@Resolver('CatMessage')
export class CatMessageResolver {
  constructor(private readonly catMessageService: CatMessageService) {}

  @Mutation('createCatMessage')
  create(@Args('createCatMessageInput') createCatMessageInput: CreateCatMessageInput) {
    return this.catMessageService.create(createCatMessageInput);
  }

  @Query('catMessage')
  findAll() {
    return this.catMessageService.findAll();
  }

  @Query('catMessage')
  findOne(@Args('id') id: number) {
    return this.catMessageService.findOne(id);
  }

  @Mutation('updateCatMessage')
  update(@Args('updateCatMessageInput') updateCatMessageInput: UpdateCatMessageInput) {
    return this.catMessageService.update(updateCatMessageInput.id, updateCatMessageInput);
  }

  @Mutation('removeCatMessage')
  remove(@Args('id') id: number) {
    return this.catMessageService.remove(id);
  }
}
