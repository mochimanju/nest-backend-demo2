import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  // Kafka consumer instance
  private consumer: Consumer;

  constructor(private readonly configService: ConfigService) {
    // ดึง brokers จาก config (.env)
    const brokers = this.configService.get<string>('KAFKA_BROKERS')?.split(',') ?? [
      'localhost:29092',
    ];

    // generate clientId อัตโนมัติ (กันซ้ำ)
    const clientId = `nestjs-consumer-${randomUUID()}`;

    /**
     * สร้าง Kafka instance
     * - clientId: ชื่อ client ที่ใช้เชื่อมต่อกับ Kafka broker
     * - brokers: รายการที่อยู่ของ Kafka broker(s)
     */
    const kafka = new Kafka({
      clientId,
      brokers,
    });

    /**
     * สร้าง consumer instance
     * - groupId: ชื่อกลุ่ม consumer (ใช้ร่วมกันหลาย instance ได้)
     */
    this.consumer = kafka.consumer({
      groupId: 'cat-message-group',
    });
  }

  /**
   * onModuleInit()
   * เมธอดนี้จะถูกเรียกอัตโนมัติเมื่อ NestJS โหลด module เสร็จ
   * ใช้สำหรับ:
   * - connect consumer
   * - subscribe topic
   * - เริ่ม run loop ฟัง Kafka message
   */
  async onModuleInit() {
    /** เชื่อมต่อ Kafka broker */
    await this.consumer.connect();
    console.log('[Kafka] Consumer connected');

    /**
     * สมัคร subscribe topic: cats.events
     * - fromBeginning: false → อ่านเฉพาะ message ใหม่
     */
    await this.consumer.subscribe({
      topic: 'cats.events',
      fromBeginning: false,
    });

    console.log('[Kafka] Listening on topic: cats.events');

    /**
     * เริ่มฟัง message 
     * eachMessage จะถูกเรียกทุกครั้งเมื่อมี message ใหม่เข้ามา
     */
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (!message.value) return;

        /**
         * message.value คือ Buffer → ต้องแปลงเป็น string → JSON object
         */
        const raw = JSON.parse(message.value.toString());

        /** log event ที่ได้รับ */
        console.log('\n[Consumer] Received Event:');
        console.log(raw);
      },
    });
  }
}
