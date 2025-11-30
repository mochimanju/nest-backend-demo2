import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka.consumer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [KafkaConsumerService],
})
export class KafkaModule {}
