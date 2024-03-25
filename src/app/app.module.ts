import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { ContainerModule } from './container/container.module';
import { PokemonDialog } from './dialog/pokemon/pokemon.dialog.component';
import { MatCardModule } from '@angular/material/card';
import { PokemonImgComponent } from './container/pokemonImg/pokemonImg.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonDialog,
    // PokemonImgComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ContainerModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
