import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonService } from '../../service/pokemon.service';
import { catchError, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemonImg',
  templateUrl: './pokemonImg.component.html',
  styleUrls: ['./pokemonImg.component.css']
})
export class PokemonImgComponent implements OnInit {
  @Input() public data?:number

  pokemonData:any = []
  constructor(
    private apiPokemon: PokemonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
   
  }

}
