import { Injectable, InternalServerErrorException } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class InstagramService {
  async getMedia() {
    const USER_ID = process.env.INSTAGRAM_USER_ID;
    const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!USER_ID || !ACCESS_TOKEN) {
      throw new InternalServerErrorException(
        'Falta INSTAGRAM_USER_ID o INSTAGRAM_ACCESS_TOKEN',
      );
    }

    const url = `https://graph.instagram.com/${USER_ID}/media?fields=id,caption,media_url,media_type,permalink,timestamp,thumbnail_url&limit=9&access_token=${ACCESS_TOKEN}`;

    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      console.error('Instagram Error:', text);
      throw new InternalServerErrorException('Error al obtener publicaciones');
    }

    return await res.json();
  }
}
