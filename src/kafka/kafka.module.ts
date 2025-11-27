import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { CatMessageService } from '../cat-message/cat-message.service';

@Module({
  providers: [KafkaService, CatMessageService],
})
export class KafkaModule {}
