import { Component, inject, Input, signal } from '@angular/core';
import { SemdService } from '../../../services/semd.service';
import { ISemd } from '../../../interfaces/semd.interface';
import { CommonModule } from '@angular/common';
import { PanelTablePaginationComponent } from '../../common/panel-table-pagination/panel-table-pagination.component';
import { MatIconModule} from '@angular/material/icon';
import { IPeriod } from '../../../interfaces/period.interface';
import { UtilsService } from '../../../services/application/utils.service';
import { BlockDocComponent } from '../../common/block-doc/block-doc.component';
import { IBlockDoc } from '../../../interfaces/block-doc.interface';

// Заключения / Профосмотры
@Component({
  selector: 'app-my-doc-findings',
  imports: [CommonModule, PanelTablePaginationComponent, MatIconModule, BlockDocComponent],
  templateUrl: './my-doc-findings.component.html',
  styleUrl: './my-doc-findings.component.scss',
})
export class MyDocFindingsComponent {
  _testHeightBlock = signal<number>(100);
  @Input() isMobile = false;

  @Input()
  set testHeightBlock(value: number) {
    console.log('_testHeightBlock value=', value);
    this._testHeightBlock.set(value);
    console.log('_testHeightBlock=', this._testHeightBlock());
  }

  get testHeightBlock():number {
    return this._testHeightBlock();
  }

  _p_type = signal<number>(0);

  @Input()
  set p_type(value: number) {
    this._p_type.set(value);

    this.getfindingSize();
    this.getfinding(1, this.findingCountRectoPage)
  }

  get p_type():number {
    return this._p_type();
  }

  /* Устанока даты  */
  _periodDate: IPeriod = {begin: new Date, end: new Date};
  @Input()
  set v_periodDate(value: IPeriod) {
    this._periodDate = value
console.log('111 set v_periodDate=', value);
    this.getfindingSize();
    this.getfinding(1, this.findingCountRectoPage)
  }

  get v_periodDate(): IPeriod {
    return this._periodDate;
  }

/* */

  mobileDate = signal<IBlockDoc[]>([]);


  public UtilsS = inject(UtilsService);
  public SemdS = inject(SemdService);

  findingCountRectoPage = 10;     // Количетсво записей на странице
  findingCountRec = signal(0);            // Всего записей
  findingList = signal<ISemd[]>([]);

  constructor() {
  }

  getfindingSize(){
    this.findingCountRec.update(val => 0);
    this.SemdS.getSemdPatientListSize(this.v_periodDate.begin, this.v_periodDate.end, this.p_type)
      .subscribe(
        info => {
          this.findingCountRec.update(val => info.size);
        }, err => {
          console.log('ERR=', err);
        }
      );
  }

  /* Получить СЕМДы заключения */
  getfinding(pStart: number, pEnd: number){
    this.findingList.update(val=> val = []);
    // По умолчанию
    this.SemdS.getSemdPatientList(this.v_periodDate.begin, this.v_periodDate.end, pStart, pEnd, this.p_type)
      .subscribe(
        info => {
          this.findingList.update((items) => info);
          console.log('===', this.findingList());
          this.findingList().forEach(item => {
//            this.mobileDate.
          })
//          mobileDate

        }, err => {
          console.log('ERR=', err);
        }
      );
  }

  /* Событие выбора страницы */
  changedPage(page: any) {
    if (page == 1) {
      this.getfinding(1, this.findingCountRectoPage);
    } else {
      this.getfinding(page*this.findingCountRectoPage-this.findingCountRectoPage , page*this.findingCountRectoPage);
    }
  }

}
