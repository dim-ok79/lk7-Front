import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AuthComponent } from './page/login/auth.component';
import { AccountComponent } from './components/account/account.component';
import { IndexPcComponent } from './components/home/home-pc/index-pc/index-pc.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: IndexPcComponent
      },

      /**
       * Личные данные
       */
      {
        path: 'account',
        component: AccountComponent
      }
    ]
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
