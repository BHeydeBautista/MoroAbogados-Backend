import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';

@Module({
  imports: [ConfigModule],
  controllers: [InstagramController],
  providers: [InstagramService],
})
export class InstagramModule {}
