import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MenuMobileComponent } from '../../menu/menu-mobile/menu-mobile.component';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-home-mobile',
  imports: [NgbModule, CommonModule, MenuMobileComponent, MatIconModule, RouterModule],
  templateUrl: './home-mobile.component.html',
  styleUrl: './home-mobile.component.scss',
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class HomeMobileComponent {
  isMenuCollapsed = true;
  constructor(
    private router: Router
  ){
  }

  goHome(){
    this.router.navigate(['/home']);
  }

}
