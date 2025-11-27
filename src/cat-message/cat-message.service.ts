import { Injectable } from '@nestjs/common';
import { CatMessageEntity } from './entities/cat-message.entity';
import { StoreCatEvent } from './dto/store-cat-event';

@Injectable()
export class CatMessageService {
  private messages: CatMessageEntity[] = [];

  storeMessage(input: StoreCatEvent) {
    const message: CatMessageEntity = {
      id: String(Date.now()),
      eventName: input.eventName,
      payload: input.payload,
      timestamp: input.timestamp,
    };

    this.messages.push(message);
    return message;
  }

  getMessages() {
    return this.messages;
  }
}
