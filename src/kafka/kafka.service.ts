import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { CatMessageService } from '../cat-message/cat-message.service';
import { StoreCatEvent } from '../cat-message/dto/store-cat-event';

@Injectable()
export class KafkaService implements OnModuleInit {
  private consumer: Consumer;

  constructor(private readonly catMessageService: CatMessageService) {
    const kafka = new Kafka({
      clientId: 'cat-message-consumer',
      brokers: ['localhost:29092'],
    });

    this.consumer = kafka.consumer({ groupId: 'cat-message-group' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    console.log('[cat-message] Kafka Consumer connected');

    await this.consumer.subscribe({
      topic: 'message.send',
      fromBeginning: false,
    });

    this.consumer.run({
      eachMessage: async ({ message }) => {
        if (!message.value) return;

        const raw = JSON.parse(message.value.toString());

        console.log('\n [Consumer] Received Message:');
        console.log(raw);

        const event: StoreCatEvent = {
          eventName: raw.eventName,
          payload: raw.payload,
          timestamp: raw.timestamp,
        };

        this.catMessageService.storeMessage(event);
      },
    });
  }
}
