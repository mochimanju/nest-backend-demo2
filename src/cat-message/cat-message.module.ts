import { Module } from '@nestjs/common';
import { CatMessageService } from './cat-message.service';
import { CatMessageResolver } from './cat-message.resolver';

@Module({
  providers: [CatMessageResolver, CatMessageService],
})
export class CatMessageModule {}
