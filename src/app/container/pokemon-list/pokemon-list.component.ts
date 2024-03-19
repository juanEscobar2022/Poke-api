import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { PokemonResult } from '../../interface/pokemon.interface';
import { CommonModule } from '@angular/common';
import { catchError, of, tap } from 'rxjs';
import { PokemonImageService } from '../../service/pokemonImg.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PokemonFilterService } from '../../service/pokemonFilter.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { PokemonDialog } from '../../dialog/pokemon/pokemon.dialog.component';
// import { PokemonDialog } from '../../dialog/pokemon/pokemon.dialog.component';

@Component({
  selector: 'app-pokemon-list',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit{
  [x: string]: any;
  displayedColumns: any = [];
  dataSource: any = [];
  datauser:any = [];

  pokemonData: any[] = [];
  filteredPokemon: any[] = [];
  showFilteredPokemon: boolean = false;

  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  constructor(
    private apiPokemon: PokemonService,
    private pokemonImageService: PokemonImageService,
    private pokemonFilterService: PokemonFilterService,
    public dialog: MatDialog
  ){
  }
  // pokemon?: Pokemon;
  pokemonList: PokemonResult[] = [];

  ngOnInit(): void {
    this.loadAllPokemon();
    this.subscribeToTypeChanges();
  }
  

  loadAllPokemon() {
    this.apiPokemon.getAllPokemon().subscribe(
      (pokemonData: any[]) => {
        this.pokemonData = pokemonData;
      },
      (error) => {
        console.error('Error al obtener los Pokémon:', error);
      }
    );
  }

  width = {
    "width": "200%"
  }
  stylePk:boolean = false
  subscribeToTypeChanges() {
    this.pokemonFilterService.typeSelected$.subscribe((type: string) => {
      
      if (type === 'all') {
        this.showFilteredPokemon = false;

        this.filteredPokemon = [];
      } else {
        this.showFilteredPokemon = true;
        this.apiPokemon.getPokemonByType(type).subscribe(
          (filteredPokemon: any[]) => {
            this.filteredPokemon = filteredPokemon;
            if(this.filteredPokemon.length <= 3){
                this.width;
                this.stylePk = true;
            }else{
              this.stylePk = false;

            }
          },
          (error) => {
            console.error('Error al obtener los Pokémon por tipo:', error);
          }
        );
      }
    });
  }
  openDialog(idSel:number): void {
    const dialogRef = this.dialog.open(PokemonDialog, {
      width: '500px', // Especifica el ancho del diálogo
      data: {idSel}, // Puedes pasar datos al diálogo si es necesario
      // cargo: {this.cargo}
    });
  
    // Puedes suscribirte a eventos del diálogo si lo necesitas
    dialogRef.afterClosed().subscribe(result => {
      // this.sendRequest();
      console.log('El diálogo ha sido cerrado', result);
    });
  }
    
  }

