import { afterNextRender, Component, ElementRef, inject, OnInit, signal, viewChild, ViewChild } from '@angular/core';
import { LoadingComponent } from '../../frame2/components/loading/loading.component';
import { BtnComponent } from '../../common/btn/btn.component';
import { CommonModule } from '@angular/common';
import { MyDocPcLabComponent } from '../my-doc-pc-lab/my-doc-pc-lab.component';
import { MyDocFindingsComponent } from '../my-doc-findings/my-doc-findings.component';
import { MyDocMydocComponent } from '../my-doc-mydoc/my-doc-mydoc.component';
import { MyDocExaminationsComponent } from '../my-doc-examinations/my-doc-examinations.component';
import { MyDocService } from '../../../services/my-doc.service';
import { DateRangeComponent } from '../../common/date-range/date-range.component';
import { IPeriod } from '../../../interfaces/period.interface';

@Component({
  selector: 'app-my-doc-pc',
  imports: [CommonModule, LoadingComponent, BtnComponent,
    MyDocFindingsComponent,
    MyDocPcLabComponent,
    MyDocMydocComponent,
    MyDocExaminationsComponent,
    DateRangeComponent,
    ],
  templateUrl: './my-doc-pc.component.html',
  styleUrl: './my-doc-pc.component.scss',
})
export class MyDocPcComponent {
  @ViewChild('ContentBlockLog') ContentBlocklogEL: ElementRef|undefined;
  p_testHeightBlock = signal(100);

  public MyDocS = inject(MyDocService);

  loading = signal(false);            // Загрузка

  periodDate: IPeriod = {begin: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), end: new Date};

/*
  dtBegin: Date = new Date();    // Дата начала
  dtEnd: Date = new Date();    // Дата ококнчания
*/

  MyDocMydocRef = viewChild(MyDocMydocComponent);


  constructor(
  ) {
    this.onChangedPeriod(this.periodDate);

    // Вызывается после отрисовки DOM
    afterNextRender(() => {
      this.calcTableH();
    });
  }

  /* расчет высоты блока относительно */
  private calcTableH(){
//    const resH = this.ContentBlocklogEL?.nativeElement.offsetHeight-72;
    const resH = this.ContentBlocklogEL?.nativeElement.offsetHeight-152;
    this.p_testHeightBlock.update(curr => curr = resH);
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
