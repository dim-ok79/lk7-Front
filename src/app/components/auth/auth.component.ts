import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
 import { Size } from '../../services/size';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [Size],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit, AfterViewInit {
  @ViewChild('ContentBlocAuth') contentBlocAuthEL: ElementRef|undefined;

  AuthFormText = 'Личный кабинет';  //

    constructor(private size: Size
    ){}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
      // Установка типа девайса
        this.size.setW(this.contentBlocAuthEL?.nativeElement.offsetWidth);
  };

}
