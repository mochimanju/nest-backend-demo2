import { Injectable } from '@nestjs/common';
import { CatMessageEntity } from './entities/cat-message.entity';
import { StoreCatEvent } from './dto/store-cat-event';

@Injectable()
export class CatMessageService {
  // messages เป็น array เริ่มต้นเป็น array ว่าง ๆ
  private messages: CatMessageEntity[] = [];

  // เก็บ event ใหม่
  // แปลง input เป็น CatMessageEntity ให้เป็นรูปมาตรฐานก่อนเก็บ
  storeMessage(input: StoreCatEvent) {
    const message: CatMessageEntity = {
      id: String(Date.now()),
      eventName: input.eventName,
      payload: input.payload,
      timestamp: input.timestamp, 
    };

    // เพิ่ม message อันใหม่เข้าไปใน array messages
    this.messages.push(message);
    return message;
  }

  // ดึง messages ทั้งหมด ที่เคยเก็บไว้
  getMessages() {
    return this.messages;
  }
}
