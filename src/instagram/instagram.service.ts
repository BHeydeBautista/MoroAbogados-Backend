import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class InstagramService {
  constructor(private config: ConfigService) {}

  async getLatestPosts() {
    const userId = this.config.get<string>('INSTAGRAM_USER_ID');
    const token = this.config.get<string>('INSTAGRAM_ACCESS_TOKEN');
    const ttl = this.config.get<number>('INSTAGRAM_CACHE_TTL') ?? 60;

    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink&access_token=${token}`;

    const res = await axios.get(url);

    return res.data;
  }
}
