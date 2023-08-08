import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  { path: "menu", component: MainMenuComponent },
  { path: "game", component: GameComponent },
  { path: "", redirectTo: "/menu", pathMatch: "full" },
  { path: '**', redirectTo: '/menu', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
