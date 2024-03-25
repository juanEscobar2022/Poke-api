import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { PokemonImgComponent } from './container/pokemonImg/pokemonImg.component';



const routes: Routes = [
  {
    path: "",
    redirectTo: "Pokemon",
    pathMatch: "full",
  },
  {
    path: "pokemon",
    component: ContainerComponent,
    data: {
      title: "Login Page",
    },
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
