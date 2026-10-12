import { afterNextRender, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { LoadingComponent } from '../../frame2/components/loading/loading.component';
import { BtnComponent } from '../../common/btn/btn.component';
import { CommonModule } from '@angular/common';
import { MyDocPcLabComponent } from '../my-doc-pc-lab/my-doc-pc-lab.component';
import { MyDocFindingsComponent } from '../my-doc-findings/my-doc-findings.component';
import { MyDocMydocComponent } from '../my-doc-mydoc/my-doc-mydoc.component';
import { MyDocExaminationsComponent } from '../my-doc-examinations/my-doc-examinations.component';
import { MyDocService } from '../../../services/my-doc.service';

@Component({
  selector: 'app-my-doc-pc',
  imports: [CommonModule, LoadingComponent, BtnComponent,
    MyDocFindingsComponent,
    MyDocPcLabComponent,
    MyDocMydocComponent,
    MyDocExaminationsComponent,
    ],
  templateUrl: './my-doc-pc.component.html',
  styleUrl: './my-doc-pc.component.scss',
})
export class MyDocPcComponent {
  @ViewChild('ContentBlockLog') ContentBlocklogEL: ElementRef|undefined;
  p_testHeightBlock = signal(100);

  public MyDocS = inject(MyDocService);


  loading = signal(false);            // Загрузка

  constructor(
  ) {
    // Вызывается после отрисовки DOM
    afterNextRender(() => {
      this.calcTableH();
    });
  }

  /* расчет высоты блока относительно */
  private calcTableH(){
    const resH = this.ContentBlocklogEL?.nativeElement.offsetHeight-72;
    this.p_testHeightBlock.update(curr => curr = resH);
  }

/*
  onClickType(id: number) {
    this.typeDoc.update(list =>
      list.map(item =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      )
    );
*/

/*
    if (this.getCurrentTypeMyRec().id == 1){ // Предстоящие
      this.getRnumbList();
    } else { // Завершенные
      this.changePeriod({begin: this.dtBegin, end:this.dtEnd})
    }
*/

//  };

  /* Текущий тип */
/*
  getCurrentTypeDoc(): IBtnMyRec{
    return this.typeDoc().filter(item => item.active)[0];
  }
*/

}
