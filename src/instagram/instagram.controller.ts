import { Controller, Get } from '@nestjs/common';
import { InstagramService } from './instagram.service';

@Controller('instagram')
export class InstagramController {
  constructor(private instagramService: InstagramService) {}

  @Get()
  async getPosts() {
    const data = await this.instagramService.getLatestPosts();
    return { data };
  }
}
