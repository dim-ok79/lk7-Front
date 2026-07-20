import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AuthComponent } from './page/login/auth.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  /**
   * Аунтификация в приложении
   */
  {
    title: 'ЛК Авторизация',
    path: 'login',
    component: AuthComponent,
  },


];
