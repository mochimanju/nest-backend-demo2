import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatMessageModule } from './cat-message/cat-message.module';

@Module({
  imports: [CatMessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
