import { Component, inject, signal, viewChild } from '@angular/core';
import { MyDocService } from '../../../services/my-doc.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../frame2/components/loading/loading.component';
import { MyDocFindingsComponent } from '../my-doc-findings/my-doc-findings.component';
import { IPeriod } from '../../../interfaces/period.interface';
import { DateRangeComponent } from '../../common/date-range/date-range.component';
import { MyDocPcLabComponent } from '../my-doc-pc-lab/my-doc-pc-lab.component';
import { MyDocExaminationsComponent } from '../my-doc-examinations/my-doc-examinations.component';
import { MyDocMydocComponent } from '../my-doc-mydoc/my-doc-mydoc.component';
import { BtnComponent } from '../../common/btn/btn.component';

@Component({
  selector: 'app-my-doc-mobile',
  imports: [CommonModule, LoadingComponent, BtnComponent,
    MyDocFindingsComponent,
    DateRangeComponent,
    MyDocPcLabComponent,
    MyDocExaminationsComponent,
    MyDocMydocComponent],
  templateUrl: './my-doc-mobile.component.html',
  styleUrl: './my-doc-mobile.component.scss',
})
export class MyDocMobileComponent {

  loading = signal(false);            // Загрузка
/*
  dtBegin: Date = new Date();    // Дата начала
  dtEnd: Date = new Date();    // Дата ококнчания
*/
  periodDate: IPeriod = {begin: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), end: new Date};

  public MyDocS = inject(MyDocService);
  MyDocMydocRef = viewChild(MyDocMydocComponent);
  constructor(
  ) {
    this.onChangedPeriod(this.periodDate);
  }

  onChangedPeriod(dt: IPeriod) {
    console.log('dt=', dt);
    const cdtBegin = dt.begin ? dt.begin : new Date();
    const cdtEnd = dt.end ? dt.end : new Date();
    this.periodDate = {begin: cdtBegin, end: cdtEnd};
  }

  addDoc(){
    const child = this.MyDocMydocRef();
    if (child) {
      // Вызываем метод дочернего компонента напрямую и передаем аргументы
      child.addDoc();
    }
  }

}
