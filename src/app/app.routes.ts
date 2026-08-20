import { Route, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AuthComponent } from './page/login/auth.component';
import { AccountComponent } from './components/account/account.component';
import { IndexPcComponent } from './components/home/home-pc/index-pc/index-pc.component';
import { RecmyComponent } from './components/recmy/recmy.component';
import { PaymentsComponent } from './page/payments/payments.component';
import { RecordComponent } from './page/record/record.component';
import { HomeMobileComponent } from './components/home/home-mobile/home-mobile.component';
import { IndexMobileComponent } from './components/home/home-mobile/index-mobile/index-mobile.component';

const routesHomeChildren: Route[] = [
  /**
   * Личные данные
   */
  {
    path: 'account',
    component: AccountComponent
  },
  /**
   * Мои посещения
   */
  {
    path: 'recmy',
    component: RecmyComponent
  },
  /**
   * Финансы
   */
  {
    path: 'payments',
    component: PaymentsComponent
  },
  /**
   * Запись
   */
  {
    path: 'record',
    component: RecordComponent
  },
  ];

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
      ...routesHomeChildren
    ]
  },
  {
    path: 'home-mobile',
    component: HomeMobileComponent,
    children: [
      {
        path: '',
        component: IndexMobileComponent
      },
      ...routesHomeChildren
  ]},
      /**
   * Аунтификация в приложении
   */
  {
    title: 'ЛК Авторизация',
    path: 'login',
    component: AuthComponent,
  },

];
