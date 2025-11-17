import { Controller, Get } from '@nestjs/common';
import { InstagramService } from './instagram.service';

@Controller('instagram')
export class InstagramController {
  constructor(private instagramService: InstagramService) {}

  @Get()
  async getPosts() {
    const response = await this.instagramService.getLatestPosts();

    return { data: response.data };
  }
}
