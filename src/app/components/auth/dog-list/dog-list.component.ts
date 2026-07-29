import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation, signal } from '@angular/core';
import { IDogList, IPatient, ITokenAndPatientId } from '../../../interfaces/patient.interface';
import { ConfigService } from '../../../services/application/config.service';
import { AuthService } from '../../../services/auth.service';
import { PatientService } from '../../../services/patient.service';
import { MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dog-list',
  imports: [MatIconModule, CommonModule],
  templateUrl: './dog-list.component.html',
  styleUrl: './dog-list.component.scss',
  providers: [ PatientService],
  encapsulation: ViewEncapsulation.None

})
export class DogListComponent implements OnInit{

  @Output() onAuth = new EventEmitter<ITokenAndPatientId | null>();   // Событие Авторизация
  @Output() onError = new EventEmitter<string>();   // Ошибка
  @Input() dogPREVIEW_REQUIRED: boolean = false; // Обязательность предпросмотра


  @Input() tmpToken: ITokenAndPatientId | null = null; //токен

//  loading = false;      // Загрузка
//  public loading = signal<boolean>( false); //Текущий пациент
  loading = signal(false);      // Загрузка

  public dogList: IDogList[] = []; // Список договоров
//  public dogList = signal<IDogList[]> ([]); // Список договоров
  public dogHoverId: number = 0;  // Наведенный договор, если нет то = 0
  public error = '';
//  public patient: IPatient | null = null; //Текущий пациент
  public patient = signal<IPatient | null>( null); //Текущий пациент

  constructor(
    private configS: ConfigService,
    private auth: AuthService,
    private ps: PatientService,
    )
  {
  }

  ngOnInit(): void {
    this.dogHoverId = 0;
    if (this.tmpToken) {
      this.loginDoc();
    }
  }

/*
  trackByFn(index: number, item: IDogList): number {
    return item.id // Возвращаем уникальный ключ элемента
  }
*/

  private loginDoc(): void {
    this.loading.update(val => val = true);
    this.dogList = [];
    this.auth.getContractList(this.tmpToken!)
      .subscribe(
        response => {
console.log('getContractList response=', response);
          if (response && response.length == 0) {  // Договоров на подписание нет, работаем
            this.loginOK();
          }

          if (response && response.length > 0) {
            // Получаем информацию о пациенте
            this.ps.getServerPatientInfo$(this.tmpToken!.token)
              .subscribe(
                info => {
                  this.patient.update(curr => curr = info);
                }, err => {
                  this.patient.update(curr => curr = null);
                }
              );

            response.forEach(item => {
console.log(' item=', item);
              this.dogList = [...this.dogList,
                {
                  id: item.template_id,
                  text: item.template_name,
                  Сh: false,
                  Url: `/contract/preview?patientId=${this.tmpToken!.patientId}&contractId=${item.template_id}`
                }
              ];

            });
console.log('loginDoc this.dogList=', this.dogList);
            this.error = '';
          } else { // Если нет договоров то продолжаем
            this.loginOK();
          }
          this.loading.update(val => val = false);
        },
        error => {
          this.loading.update(val => val = false);
          console.error('error=', error);
        },
      );
  }

  public disableDog(id: number): boolean {
      let f = false;
      if (this.dogPREVIEW_REQUIRED) {
        this.dogList.forEach(item => {
          if (item.id === id) {
            // @ts-ignore
            f = item.Сh;
          }
        });
      } else {
        f = true;
      }
      return f;
    }

    /* Подписание договора */
  public goSignature(templateId: number): void {
    this.loading.update(val => val = true);
    this.auth.postContract(this.tmpToken!, templateId)
      .subscribe(
        result => {
          this.loading.update(val => val = false);
          if (result && result.id) {
            let i: number | null = null;
            this.dogList.forEach((item, index ) => {
              if (item.id === templateId) {
                i = index;
              }
            });

            // @ts-ignore
            if (i => 0 ) {
              // @ts-ignore
              this.dogList.splice(i, 1);
            }
          } else {
            if (result.err_text) {
              this.error = 'Что то пошло не так';
            } else {
              this.error = result.err_text;
            }
            this.onError.emit(this.error);

          };
          if (!this.dogList || (this.dogList && this.dogList.length === 0)) {
            this.loginOK();
          }
        },
        error => {
          console.error('SIG ERR=', error);
//          if (error.error && error.error.data && error.error.data.errorMsg) {
          if (error) {
            this.error = error;
          } else {
            this.error = 'Что то пошло не так при подписании!';
          };

          this.onError.emit(this.error);
          this.loading.update(val => val = false);
        }
      );
  }

  public onHoverDog(id: number){ // on-mouseover
      this.dogHoverId = id;
    }

  public onMouseout(id: number){  // on-mouseleave on-mouseout (одинаково работают)
      this.dogHoverId = 0;
    }

    /* просмотр договора */
  public clickDog(id: number): void {
      let url = '';
    this.dogList.forEach(item => {
      if (item.id === id ) {
        item.Сh =  true;
        url = item.Url!;
      }
    });
    window.open(`${this.configS.getValue('hostBackend')}${url}`, '_blank');
  }

  public loginOK(): void {
    this.onAuth.emit(this.tmpToken);
  }

  logout(){

  }


}
