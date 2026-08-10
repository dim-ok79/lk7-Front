import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RnumbService } from '../../services/rnumb.service';
import { CommonModule } from '@angular/common';
import { ITalonInfo } from '../../interfaces/record.interface';
import {getNameDay, strToDate, getTekDay} from "../../utils/global.function";
import { ConfigService } from '../../services/application/config.service';
import moment from 'moment';
import { MatIconModule } from '@angular/material/icon';
import { BtnComponent } from '../../components/common/btn/btn.component';

@Component({
  selector: 'app-talon',
  imports: [CommonModule, MatIconModule, BtnComponent],
  templateUrl: './talon.component.html',
  styleUrl: './talon.component.scss',
})
export class TalonComponent implements OnInit{
  @Input() rnumbID: number = 0;
  @Input() typeTalon: number = 0;  // 0 - информация
  activeModal = inject(NgbActiveModal);

  private talonDef: ITalonInfo = {
    rnumb_id: 0,
    dat_bgn: '',  // дата и время начала приема;
    dat_end: '',   // дата и время окончания приема
    cab: null, // номер кабинета
    spec: '',    //  специальность врача
    srv_text: null,      // наименование услуги
    doctor_id: 0,
    lastname: '',   //  фамилия врача;
    firstname: '',  // имя врача
    secondname: '', // отчество врача;
    depname: null,       // название филиала
    addr: null,          // адрес филиала;
    phone: null,            //  телефон филиала
    paystatus: null,        // платный талон (0 - бесплатный, 1 - платный)
    calc_sum: null,            // предварительная стоимость приема.
    is_telemed: null,         // Флаг телемед
    url_telemed: null        // Ссылка на теле-конференцию
  }
  talon = signal<ITalonInfo>(this.talonDef);

  constructor(private rnumbS: RnumbService,
              private configS: ConfigService){
    console.log('rnumbID=', this.rnumbID);
  }

  ngOnInit(): void {
    console.log('init rnumbID=', this.rnumbID);
    this.getInfo(this.rnumbID);
  }

  getInfo(id: number){
    this.rnumbS.getRnumbInfo(id)
      .subscribe(res => {
          console.log('talon info=', res);
          res[0].beginDate = strToDate(res[0].dat_bgn);
          res[0].endDate = strToDate(res[0].dat_end);

          this.talon.update( val => res[0]);
/*
          if (res && res[0]){
            this.talon = res[0];
            this.talon.beginDate = strToDate(this.talon.dat_bgn);
            this.talon.endDate = strToDate(this.talon.dat_end);
            this.initFiles();
            this.getDocInfo(this.talon.doctor_id);

            if (this.params && !this.params.srv) {
              this.rnumbS.getRnumbSrv(rnumbID)
                .subscribe(resS => {
                    this.loadingTalonNum ++ ;
                    if (resS && this.params) {
                      this.params.srv = resS;
                    }
                  },
                  errS => {
                    console.error('getRnumbSrv ERRROr=', errS);
                  })
            } else {
              this.loadingTalonNum ++ ;
            }
          }
*/
        },
        err => {
//          this.loadingTalonNum ++ ;
          console.error('getRnumbInfo ERRROr=', err);
        })
  }

  getImgSrcDoc(id: number | null | undefined): string {
    return `${this.configS.getValue('hostBackend')}/img/doc/${id}.png`;
  }

  /**
   * В случае если изображение на сервере не найдено то грузим локальное изображение
   * @param event
   */
  public errorHandlerIMG(event: any, type: string): void {
    event.target.src = `${this.configS.getValue('hostBackend')}/img/${type}/not.png`;
  }

  /* День и время*/
  getTalonDateTime(dt: Date |  undefined ): string{
    if (dt){
      return moment(dt).format('DD MMMM') + ' в ' + moment(dt).format('HH:mm');
    } else {
      return  '';
    }
  }

  /* День недели*/
  getNameDay(dt: Date |  undefined): string {
    if (dt){
      return getNameDay(dt);
    } else {
      return '';
    }
  }

  getFIODoc(talon: ITalonInfo | null): string{
    let s = '';
    if (talon) {
      if (talon.lastname && talon.lastname.length>0){
        s = talon.lastname;
      }
      if (talon.firstname && talon.firstname.length>0){
        s = s + ' ' + talon.firstname[0] + '.';
      }
      if (talon.secondname && talon.secondname.length>0){
        s = s + ' ' + talon.secondname[0] + '.';
      }
    }
    return s;
  }

}
