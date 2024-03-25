import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import {  PokemonResult } from '../../interface/pokemon.interface';
import { PokemonImageService } from '../../service/pokemonImg.service';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
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


  constructor(
    private apiPokemon: PokemonService,
    private pokemonImageService: PokemonImageService,
    private pokemonFilterService: PokemonFilterService,
    private router: Router,
    public dialog: MatDialog,

  ){

  }
  pokemonList: PokemonResult[] = [];

  ngOnInit(): void {
    this.loadAllPokemon();
    this.subscribeToTypeChanges();
        
  }
  

  loadAllPokemon() {
    this.apiPokemon.getAllPokemon().subscribe(
      (pokemonData: any[]) => {
        this.pokemonData = pokemonData;
        
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
  img:boolean = false;
  openDialog(idSel:number): void {
    this.img = true;
    const dialogRef = this.dialog.open(PokemonDialog, {
      width: '500px', 
      data: {idSel}, 
    });
  
   
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo ha sido cerrado', result);
    });
  }
  paginateData() {
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = 0;
    this.paginator.page.next({
      pageIndex: 1,
      pageSize: this.pageSize,
      length: this.pokemonData.length
    });
  }
  getPaginate(index:any){
    this.apiPokemon.prueba(index.pageSize
      ).subscribe(
      data => {
        this.pokemonData = data;
        
      }
    )
  }
  idIMG?: any
  pokemonImg(event:any){
    this.idIMG = event;
    
  }
  
  }

