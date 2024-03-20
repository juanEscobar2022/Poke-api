import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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

  pageSize: number = 10;
  currentPage: number = 1;
  paginatedPokemonData: any[] = [];
  pageSizeOptions: number[] = [10,20, 50, 150];
  displayedPokemon:any = []

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  // @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  constructor(
    private apiPokemon: PokemonService,
    private pokemonImageService: PokemonImageService,
    private pokemonFilterService: PokemonFilterService,
    public dialog: MatDialog,

  ){

  }
  // pokemon?: Pokemon;
  pokemonList: PokemonResult[] = [];

  ngOnInit(): void {
    this.loadAllPokemon();
    this.subscribeToTypeChanges();
    
    // this.getPrueba(this.pageSize);
    // this.updatePaginatedPokemon()
    
    // this.paginator.pageSize = this.pageSize;
    
  }
  

  loadAllPokemon() {
    this.apiPokemon.getAllPokemon().subscribe(
      (pokemonData: any[]) => {
        this.pokemonData = pokemonData;
        console.log(this.pokemonData.length);
        
        this.paginateData();
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
      width: '500px', 
      data: {idSel}, 
    });
  
   
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo ha sido cerrado', result);
    });
  }
  // onPageChange(event: any) {
  //   // Calcula el índice inicial y final de los datos a mostrar en la página actual
  //   const startIndex = event.pageIndex * event.pageSize;
  //   const endIndex = startIndex + event.pageSize;
  //   // Asigna los datos a mostrar en la página actual
  //   this.displayedPokemon = this.pokemonData.slice(startIndex, endIndex);
  // }

  // updatePaginatedPokemon() {
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   const endIndex = Math.min(startIndex + this.pageSize, this.pokemonData.length);
  //   this.paginatedPokemonData = this.pokemonData.slice(startIndex, endIndex);
  // }
  paginateData() {
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = 0;
    this.paginator.page.next({
      pageIndex: 1,
      pageSize: this.pageSize,
      length: this.pokemonData.length
    });
  }
  getPrueba(index:any){
    console.log(index);
    // window.location.reload()
    this.apiPokemon.prueba(index.pageSize
      ).subscribe(
      data => {
        this.pokemonData = data;
        
        // console.log(data);
        
      }
    )
  }
  }

