import { Component, inject, Input, signal, ViewEncapsulation } from '@angular/core';
import { LabService } from '../../../services/lab.service';
import { IPeriod } from '../../../interfaces/period.interface';
import { ConfigService } from '../../../services/application/config.service';
import { PanelTablePaginationComponent } from '../../common/panel-table-pagination/panel-table-pagination.component';
import { MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ILabsList } from '../../../interfaces/laboratory-services.interface';
import { UtilsService } from '../../../services/application/utils.service';
import { ILabOrder } from '../../../interfaces/lab.interface';

@Component({
  selector: 'app-my-doc-pc-lab',
  imports: [CommonModule, PanelTablePaginationComponent, MatIconModule],
  templateUrl: './my-doc-pc-lab.component.html',
  styleUrl: './my-doc-pc-lab.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class MyDocPcLabComponent {
  _testHeightBlock = signal<number>(100);

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
    this.getLabSize();
    this.getLab(1, this.labCountRectoPage)
  }

  get v_periodDate(): IPeriod {
    return this._periodDate;
  }

  public LabServiceS = inject(LabService);
  public UtilsS = inject(UtilsService);


  labCountRectoPage = 10;     // Количетсво записей на странице
  labCountRec = signal(0);            // Всего записей
  labList = signal<ILabOrder[]>([]);

  constructor() {
  }




  /* Событие выбора страницы */
  changedPage(page: any) {
    console.log('!!! page=', page);

    if (page == 1) {
      this.getLab(1, this.labCountRectoPage);
    } else {
      this.getLab(page*this.labCountRectoPage-this.labCountRectoPage , page*this.labCountRectoPage);
    }
  }

  /* Получить Лаб */
  getLab(pStart: number, pEnd: number){
    this.labList.update(val=> val = []);
    // По умолчанию
    this.LabServiceS.getLaboratoryOrderList(this.v_periodDate.begin, this.v_periodDate.end, pStart, pEnd, 'desc')
      .subscribe(
        info => {
          this.labList.update((items) => info);
        }, err => {
          console.log('ERR=', err);
        }
      );
  }

  getLabSize(){
    this.labCountRec.update(val => 0);
    this.LabServiceS.getLaboratoryOrderSize(this.v_periodDate.begin, this.v_periodDate.end)
      .subscribe(
        info => {
          this.labCountRec.update(val => info.size);
        }, err => {
          console.log('ERR=', err);
        }
      );
  }

/*
  test(p_research_id: number){
    this.LabServiceS.getResearchFileList(p_research_id)
      .subscribe(
        info => {
          console.log('res=', info);
        }, err => {
          console.log('ERR=', err);
        }
      );

  }
*/

}
