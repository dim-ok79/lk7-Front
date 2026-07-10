import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
 import { Size } from '../../services/size';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { EsiaComponent } from './esia/esia.component';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, LoginComponent, EsiaComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [Size],
  encapsulation: ViewEncapsulation.None
})

//export class AuthComponent extends BaseComponet implements OnInit, AfterViewInit {
export class AuthComponent implements OnInit, AfterViewInit {
  @ViewChild('ContentBlocAuth') contentBlocAuthEL: ElementRef|undefined;

  AuthFormText = 'Личный кабинет';  //

    constructor(private size: Size
    ){
//      super();
    }

  ngOnInit(): void {
      console.log('Auth INIT =');
  }

  ngAfterViewInit() {
      // Установка типа девайса
        this.size.setW(this.contentBlocAuthEL?.nativeElement.offsetWidth);
  };

}
