export interface PokemonSprites {
  front_default: string;
}

export interface PokemonResult {
  name: string;
  url: string;
  types:any;
  sprites: PokemonSprites; 
  front_default: string;
}

export interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}
