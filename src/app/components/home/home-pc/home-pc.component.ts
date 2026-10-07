import { Component, inject, ViewEncapsulation } from '@angular/core';
import { NgbdToastGlobal } from '../../../utils/toast/toast-global.component';
import { AuthService } from '../../../services/auth.service';
import { IMenu } from '../../../interfaces/menu.interface';
import { AppMenuService } from '../../../services/menu.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from '../../menu/menu.component';
import { NgbActiveModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-pc',
  imports: [RouterModule, CommonModule, MatIconModule, MenuComponent, NgbTooltipModule],
  templateUrl: './home-pc.component.html',
  styleUrl: './home-pc.component.scss',
  providers: [NgbdToastGlobal],
  encapsulation: ViewEncapsulation.None

})
export class HomePcComponent {
  menuList: IMenu[] = []; // Список меню
  private auth = inject(AuthService);

  constructor(
/*    private alert: NgbdToastGlobal,*/
    private menuS: AppMenuService,
    private router: Router
  ){
    this.menuList = this.menuS.getListMenu();
  }

  goToMenu(m: IMenu){
    this.menuS.goToMenu(m);
  }

  logout(){
    this.auth.logout();
  }

  goHome(){
    this.router.navigate(['/home']);
  }

}
