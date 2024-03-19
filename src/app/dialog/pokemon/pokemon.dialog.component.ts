import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PokemonService } from '../../service/pokemon.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-pokemon-dialog',
  templateUrl: './pokemon.dialog.component.html',
  styleUrls: ['./pokemon.dialog.component.css']
})
export class PokemonDialog implements OnInit {
  pokemonData: any = [];
  pokemonInfo: any = [];

  constructor(
    public dialogRef: MatDialogRef<PokemonDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiPokemon: PokemonService,
  ) { }

  ngOnInit() {
    
    this.loadPokemonData();
    this.loadPokemonInfo();
  }
  closeDialog() {
    this.dialogRef.close();
  }
   loadPokemonData() {
    this.apiPokemon.getPokemonId(this.data.idSel).pipe(
      catchError(error => {
        console.error('Error loading Pokémon data:', error);
        return throwError(error);
      })
    ).subscribe(
      data => {
        this.pokemonData = data;
      }
    );
  }

   loadPokemonInfo() {
    this.apiPokemon.getPokemonInfo(this.data.idSel).pipe(
      catchError(error => {
        console.error('Error loading Pokémon data:', error);
        return throwError(error);
      })
    ).subscribe(
      data => {
        this.pokemonInfo = data;
        
      }
    );
  }
}
