import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { CatMessageService } from '../cat-message/cat-message.service';
import { StoreCatEvent } from '../cat-message/dto/store-cat-event';

@Injectable()
export class KafkaService implements OnModuleInit {
  private consumer: Consumer;

  // สร้าง Kafka consumer และ inject CatMessageService
  constructor(private readonly catMessageService: CatMessageService) {
    // สำหรับเชื่อมต่อ Kafka cluster
    const kafka = new Kafka({
      clientId: 'cat-message-consumer',
      brokers: ['localhost:29092'],
    });

    // สร้าง consumer ใหม่ และกำหนด groupId
    this.consumer = kafka.consumer({ groupId: 'cat-message-group' });
  }

  async onModuleInit() {
    // เชื่อมไปยัง Kafka broker
    await this.consumer.connect();
    console.log('[cat-message] Kafka Consumer connected');

    // บอกว่า consumer ตัวนี้จะฟัง topic ไหน
    await this.consumer.subscribe({
      // กำหนดให้ฟัง topic ชื่อ message.send
      topic: 'message.send',
      // ฟังเฉพาะ message ใหม่ที่เข้ามาหลังจากนี้
      fromBeginning: false,
    });

    // สั่งให้ consumer เริ่ม “วนฟัง” message ใหม่เรื่อย ๆ
    this.consumer.run({
      // เป็น callback ที่จะถูกเรียกทุกครั้งที่มี message ใหม่เข้ามา destructure เอาเฉพาะ { message }
      eachMessage: async ({ message }) => {
        // ถ้าไม่มี message.value ไม่ต้องทำอะไรออกเลย
        if (!message.value) return;

        // แปลง Buffer → string → object
        const raw = JSON.parse(message.value.toString());

        // consumer ได้ข้อมูลอะไรบ้าง
        console.log('\n [Consumer] Received Message:');
        console.log(raw);

        // map ข้อมูลเข้า DTO แล้วส่งไปเก็บใน service
        // object event
        const event: StoreCatEvent = {
          eventName: raw.eventName,
          payload: raw.payload,
          timestamp: raw.timestamp,
        };

        // ส่งให้ CatMessageService.storeMessage() เพื่อเก็บเป็น history/log ไว้ใน memory
        this.catMessageService.storeMessage(event);
      },
    });
  }
}
