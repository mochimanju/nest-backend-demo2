import { Resolver, Query } from '@nestjs/graphql';
import { CatMessageService } from './cat-message.service';

@Resolver('CatMessage')
export class CatMessageResolver {
  constructor(private readonly catMessageService: CatMessageService) {}

  @Query('getCatMessages')
  getCatMessages() {
    return this.catMessageService.getMessages();
  }
}
