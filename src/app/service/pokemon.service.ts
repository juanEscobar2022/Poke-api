import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
// import { Pokemon } from '../interface/pokemon.interface';
// import { Pokemon } from '../../interface/pokemon.interface';

import { Observable, Subject, catchError, forkJoin, map, of, throwError } from 'rxjs';
import {  PokemonApiResponse, PokemonResult } from '../interface/pokemon.interface';
// import { Pokemon } from 

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemonClicked: Subject<number> = new Subject<number>();

  constructor(
    private http: HttpClient
  ) { }

  
  getPokemon():Observable<PokemonApiResponse> {
    return this.http.get<PokemonApiResponse>(API_CONFIG.baseUrl + 'pokemon/?limit=150');
  }
  
prueba(numero:number){
  // return this.http.get(API_CONFIG.baseUrl+`pokemon/?limit=${numero}`)
  const requests = [];
  for (let i = 1; i <= numero; i++) {
      requests.push(this.http.get(API_CONFIG.baseUrl+`pokemon/${i}`));
    }
    return forkJoin(requests);

}
  getAllPokemon(): Observable<any> {
    const requests = [];
    for (let i = 1; i <= 151; i++) {
      requests.push(this.http.get(API_CONFIG.baseUrl+`pokemon/${i}`));
    }
    return forkJoin(requests);
  }

  // getAllPokemon(page: number): Observable<any> {
  //   // Calcular el rango de Pokémon para la página solicitada
  //   const start = (page - 1) * 20 + 1;
  //   const end = page * 20;

  //   // Crear solicitudes HTTP para los Pokémon dentro del rango
  //   const requests = [];
  //   for (let i = start; i <= end; i++) {
  //     requests.push(this.http.get(API_CONFIG.baseUrl + `pokemon/${i}`));
  //   }

  //   // Combinar todas las solicitudes en una sola
  //   return forkJoin(requests);
  // }

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
    return this.http.get(API_CONFIG.baseUrl + `pokemon/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching Pokemon by ID:', error);
        return throwError('Could not fetch Pokemon by ID. Please try again later.');
      })
    );
  }
  getPokemonInfo(id: number) {
    return this.http.get(API_CONFIG.info + `${id}`).pipe(
      catchError(error => {
        console.error('Error fetching Pokemon by ID:', error);
        return throwError('Could not fetch Pokemon by ID. Please try again later.');
      })
    );
  }
  emitPokemonClicked(pokemonId: number): void {
    this.pokemonClicked.next(pokemonId);
  }
}
