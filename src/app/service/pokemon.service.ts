import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
// import { Pokemon } from '../interface/pokemon.interface';
// import { Pokemon } from '../../interface/pokemon.interface';

import { Observable, catchError, forkJoin, map, of, throwError } from 'rxjs';
import {  PokemonApiResponse, PokemonResult } from '../interface/pokemon.interface';
// import { Pokemon } from 

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  
  getPokemon():Observable<PokemonApiResponse> {
    return this.http.get<PokemonApiResponse>(API_CONFIG.baseUrl + 'pokemon/?limit=150');
  }
  

  getAllPokemon(): Observable<any> {
    const requests = [];
    for (let i = 1; i <= 151; i++) {
      requests.push(this.http.get(API_CONFIG.baseUrl+`pokemon/${i}`));
    }
    return forkJoin(requests);
  }

  getPokemonByType(type: string): Observable<any[]> {
    return this.getAllPokemon().pipe(
      map((pokemonList: any[]) => {
        return pokemonList.filter((pokemon: any) => {
          return pokemon.types.some((pokemonType: any) => pokemonType.type.name === type);
        });
      })
    );
  }
  getPokemonId(id: number) {
    return this.http.get(API_CONFIG.baseUrl + `pokemon/${id+1}`).pipe(
      catchError(error => {
        console.error('Error fetching Pokemon by ID:', error);
        return throwError('Could not fetch Pokemon by ID. Please try again later.');
      })
    );
  }
  getPokemonInfo(id: number) {
    return this.http.get(API_CONFIG.info + `${id+1}`).pipe(
      catchError(error => {
        console.error('Error fetching Pokemon by ID:', error);
        return throwError('Could not fetch Pokemon by ID. Please try again later.');
      })
    );
  }
}
