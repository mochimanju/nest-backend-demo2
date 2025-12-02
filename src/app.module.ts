import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ทำให้ใช้ได้ทุก module
    }),
    KafkaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
