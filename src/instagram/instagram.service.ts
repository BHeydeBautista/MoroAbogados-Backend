import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';

@Injectable()
export class InstagramService {
  constructor(private config: ConfigService) {}

  async getLatestPosts() {
    const userId = this.config.get<string>('INSTAGRAM_USER_ID');
    const token = this.config.get<string>('INSTAGRAM_ACCESS_TOKEN');

    const fields = [
      'id',
      'caption',
      'media_url',
      'thumbnail_url',
      'media_type',
      'permalink',
      'timestamp'
    ].join(',');

    const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=25&access_token=${token}`;

    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const instagramError = error.response?.data?.error;
        console.error('Instagram API Error:', {
          message: instagramError?.message,
          code: instagramError?.code,
          status: error.response?.status
        });
        
        throw new InternalServerErrorException(
          `Instagram API Error: ${instagramError?.message || 'Unknown error'}`
        );
      }
      throw new InternalServerErrorException('Failed to fetch Instagram posts');
    }
  }
}
