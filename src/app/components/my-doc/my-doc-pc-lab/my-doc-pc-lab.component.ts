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


  public LabServiceS = inject(LabService);
  public UtilsS = inject(UtilsService);

  private AuthS = inject(AuthService);
  private configS = inject(ConfigService);

  dtBegin: Date = new Date();    // Дата начала
  dtEnd: Date = new Date();    // Дата ококнчания
  labCountRectoPage = 10;     // Количетсво записей на странице
  labCountRec = signal(0);            // Всего записей
  labList = signal<ILabsList[]>([]);

  constructor() {
    this.dtBegin = new Date();
    this.dtBegin.setDate(this.dtBegin.getDate()-365);
    this.dtEnd = new Date();
    this.getLabSize();
    this.getLab(1, this.labCountRectoPage)

  }


/*
  test(){
    this.LabServiceS.getLaboratoryOrderSize(this.dtBegin, this.dtEnd)
      .subscribe(res => {
          console.log('res=', res);

/!*
          if (res.size) {
            this.orderListLength = res.size;
            this.getOrders(1, this.countRectoPage);
          } else {
            this.orderListLength = 0;
            this.loading = false;
          }
*!/
        },
        err => {
          console.error('ERRROr=', err);
/!*
          this.loading = false;
*!/
        })

    this.LabServiceS.getLaboratoryOrderList(this.dtBegin, this.dtEnd,1, 40)
      .subscribe(res => {
          console.log('getLaboratoryOrderList res=', res);
        },
        err => {
          console.error('getLaboratoryOrderList ERRROr=', err);
        })

//+    this.LabServiceS.getLaboratoryResearchHtml(5687642)
    this.LabServiceS.getLaboratoryResearch(5687642)
      .subscribe(res => {
          console.log('getLaboratoryResearch res=', res);
        },
        err => {
          console.error('getLaboratoryResearch ERRROr=', err);
        })



  }
*/

  /* выбор даты */
  changePeriod(dt: IPeriod) {
    console.log('changePeriod=', dt);
    this.dtBegin = dt.begin ? dt.begin : new Date();
    this.dtEnd = dt.end ? dt.end : new Date();
    this.getLabSize();
    this.getLab(1, this.labCountRectoPage);
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
//    this.LabServiceS.getLaboratoryOrderList(this.dtBegin, this.dtEnd,pStart, pEnd)
    this.LabServiceS.getlabsList(this.dtBegin, this.dtEnd,pStart, pEnd)
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
    this.LabServiceS.getlabsListSize(this.dtBegin, this.dtEnd)
      .subscribe(
        info => {
          this.labCountRec.update(val => info.size);
        }, err => {
          console.log('ERR=', err);
        }
      );
  }

  onClickOrder(p_research_id: number){
/*
    this.AuthS.getTmpTokenID()
      .subscribe(res => {
          console.log('getTmpTokenID res=', res);
        },
        err => {
          console.error('getTmpTokenID ERRROr=', err);
        })
*/

    this.LabServiceS.getLaboratoryResearch(p_research_id)
      .subscribe(res => {
          console.log('getLaboratoryResearch res=', res);
        },
        err => {
          console.error('getLaboratoryResearch ERRROr=', err);
        })

  }
}
