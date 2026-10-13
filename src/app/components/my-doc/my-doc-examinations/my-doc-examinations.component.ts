import { Component, inject, Input, signal } from '@angular/core';
import { BlockDocComponent } from '../../common/block-doc/block-doc.component';
import { IBlockDoc } from '../../../interfaces/block-doc.interface';
import { SemdService } from '../../../services/semd.service';
import { IExam, ISemd } from '../../../interfaces/semd.interface';
import { CommonModule } from '@angular/common';
import { PanelTablePaginationComponent } from '../../common/panel-table-pagination/panel-table-pagination.component';
import { MatIconModule} from '@angular/material/icon';
import { IPeriod } from '../../../interfaces/period.interface';
import { UtilsService } from '../../../services/application/utils.service';

// Исследования
@Component({
  selector: 'app-my-doc-examinations',
  imports: [CommonModule, PanelTablePaginationComponent, MatIconModule, BlockDocComponent],
  templateUrl: './my-doc-examinations.component.html',
  styleUrl: './my-doc-examinations.component.scss',
})
export class MyDocExaminationsComponent {
  _testHeightBlock = signal<number>(100);
  @Input() isMobile = false;

  @Input()
  set testHeightBlock(value: number) {
    this._testHeightBlock.set(value);
  }

  get testHeightBlock():number {
    return this._testHeightBlock();
  }

  /* Устанока даты  */
  _periodDate: IPeriod = {begin: new Date, end: new Date};
  @Input()
  set v_periodDate(value: IPeriod) {
    this._periodDate = value
    console.log('111 set v_periodDate=', value);
    this.getExamSize();
    this.getfinding(1, this.examCountRectoPage)
  }

  get v_periodDate(): IPeriod {
    return this._periodDate;
  }

//  mD: IBlockDoc = {infoName: 'sdfsdfdfgd', infoDate: new Date(), infoUrl: ''}

  examCountRectoPage = 10;     // Количетсво записей на странице
  examCountRec = signal(0);            // Всего записей
  examList = signal<IExam[]>([]);

  public UtilsS = inject(UtilsService);
  public SemdS = inject(SemdService);

  constructor() {
    }

  getExamSize(){
    this.examCountRec.update(val => 0);
    this.SemdS.getExamPatientSize(this.v_periodDate.begin, this.v_periodDate.end)
      .subscribe(
        info => {
          this.examCountRec.update(val => info.size);
        }, err => {
          console.log('ERR=', err);
        }
      );
  }

  /* Получить СЕМДы заключения */
  getfinding(pStart: number, pEnd: number){
    this.examList.update(val=> val = []);
    // По умолчанию
    this.SemdS.getExamPatientList(this.v_periodDate.begin, this.v_periodDate.end, pStart, pEnd)
      .subscribe(
        info => {
          this.examList.update((items) => info);
          console.log('===', this.examList());
/*
          this.findingList().forEach(item => {
//            this.mobileDate.
          })
//          mobileDate
*/

        }, err => {
          console.log('ERR=', err);
        }
      );
  }


  /* Событие выбора страницы */
  changedPage(page: any) {
    if (page == 1) {
      this.getfinding(1, this.examCountRectoPage);
    } else {
      this.getfinding(page*this.examCountRectoPage-this.examCountRectoPage , page*this.examCountRectoPage);
    }
  }

}
