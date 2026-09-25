import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { IBtnMyRec } from '../../../interfaces/recmy.interface';
import { LoadingComponent } from '../../frame2/components/loading/loading.component';
import { BtnComponent } from '../../common/btn/btn.component';
import { CommonModule } from '@angular/common';
import { MyDocPcLabComponent } from '../my-doc-pc-lab/my-doc-pc-lab.component';
import { MyDocFindingsComponent } from '../my-doc-findings/my-doc-findings.component';

@Component({
  selector: 'app-my-doc-pc',
  imports: [CommonModule, LoadingComponent, BtnComponent, MyDocFindingsComponent, MyDocPcLabComponent],
  templateUrl: './my-doc-pc.component.html',
  styleUrl: './my-doc-pc.component.scss',
})
export class MyDocPcComponent implements OnInit{
  @ViewChild('ContentBlockLog') ContentBlocklogEL: ElementRef|undefined;
  p_testHeightBlock = signal(100);

  loading     = signal(false);            // Загрузка
  typeDoc   = signal<IBtnMyRec[]>([
    {id: 1, name: 'Заключения', active: true},
    {id: 2, name: 'Анализы', active: false},
    {id: 3, name: 'Исследования', active: false},
    {id: 4, name: 'Профосмотры', active: false},
    {id: 5, name: 'Мои документы', active: false}
    ]);

  constructor(
  ) {
//    this.onClickType(2);
  }

  ngOnInit(): void {
    this.calcTableH();
  }

  /* расчет высоты блока относительно */
  private calcTableH(){
    console.log('0 calcTableH this.ContentBlocklogEL=', this.ContentBlocklogEL?.nativeElement.offsetHeight );
    const resH = this.ContentBlocklogEL?.nativeElement.offsetHeight-152;
    console.log('0 calcTableH resH=', resH);
    this.p_testHeightBlock.update(curr => curr = resH);
  }

  onClickType(id: number) {
    this.typeDoc.update(list =>
      list.map(item =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      )
    );

/*
    if (this.getCurrentTypeMyRec().id == 1){ // Предстоящие
      this.getRnumbList();
    } else { // Завершенные
      this.changePeriod({begin: this.dtBegin, end:this.dtEnd})
    }
*/

  };

  /* Текущий тип */
  getCurrentTypeDoc(): IBtnMyRec{
    return this.typeDoc().filter(item => item.active)[0];
  }

}
