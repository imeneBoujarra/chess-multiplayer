
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login-component/login-component';
import { RegisterComponent } from './pages/register/register';
import { LobbyComponent } from './pages/lobby-component/lobby-component';
import { GameComponent } from './pages/game-component/game-component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'game/:id', component: GameComponent },
];
