import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class PokemonImageService {

  constructor() { }

  getPokemonImageUrl(url: string): string {
    const id = this.getPokemonIdFromUrl(url);
    return `${API_CONFIG.img}${id}.png`;
  }

  private getPokemonIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }
}
