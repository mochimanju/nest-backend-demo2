import { Module } from '@nestjs/common';
import { CatMessageService } from './cat-message.service';
import { CatMessageResolver } from './cat-message.resolver';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [CatMessageService, CatMessageResolver],
})
export class CatMessageModule {}

