import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { PokemonFilterService } from '../service/pokemonFilter.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  allPokemon: any[] = [];
  filteredPokemon: any[] = [];
  constructor(
    private apiPokemon: PokemonService,
    private pokemonFilterService: PokemonFilterService

  ) { }

  ngOnInit() {
  }

  searchByType(type: string) {
    this.apiPokemon.getPokemonByType(type).subscribe(
      (filteredPokemon: any[]) => {
        this.filteredPokemon = filteredPokemon;        
      },
      (error) => {
        console.error('Error al obtener los Pokémon por tipo:', error);
      }
    );
  }
  filterByType(type: string) {
    this.pokemonFilterService.setTypeSelected(type);
  }
}
