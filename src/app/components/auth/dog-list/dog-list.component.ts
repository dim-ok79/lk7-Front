import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IDogList, IPatient, ITokenAndPatientId } from '../../../interfaces/patient.interface';
import { ConfigService } from '../../../services/application/config.service';
import { AuthService } from '../../../services/auth.service';
import { PatientService } from '../../../services/patient.service';
import { MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dog-list',
  imports: [MatIconModule, CommonModule],
  templateUrl: './dog-list.component.html',
  styleUrl: './dog-list.component.scss',
  providers: [ConfigService, AuthService, PatientService]
})
export class DogListComponent implements OnInit{

  @Output() onError = new EventEmitter<string>();   // Ошибка
  @Output() onEvent = new EventEmitter<string>();   // События
  @Input() dogPREVIEW_REQUIRED: boolean = false; // Обязательность предпросмотра


  @Input() tmpToken: ITokenAndPatientId | null = null; //токен

  loading = false;      // Загрузка
  public dogList!: IDogList[]; // Список договоров
  public dogHoverId: number = 0;  // Наведенный договор, если нет то = 0
  public error = '';
  public patient: IPatient | null = null; //Текущий пациент

  constructor(
    private configS: ConfigService,
    private auth: AuthService,
    private ps: PatientService,
    private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer
    )
  {
    this.iconRegistry.addSvgIcon('arrow_right', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/auth/arrow_right.svg'));
    this.iconRegistry.addSvgIcon('arrow_left', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/auth/arrow_left.svg'));
  }

  ngOnInit(): void {
    this.dogHoverId = 0;
    if (this.tmpToken) {
      this.loginDoc(this.tmpToken.token);
    }
  }

  private loginDoc(token: string): void {
    this.loading = true;
    this.dogList = [];
    this.auth.getContractList(this.tmpToken!)
      .subscribe(
        response => {
//                  this.dogList = response;
console.log('getContractList response=', response);
          if (response && response.length > 0) {
            response.forEach(item => {
              // Получаем информацию о пациенте
/*
              this.ps.getServerPatientInfo$(token)
                .subscribe(
                  info => {
                    this.patient = info;
                    this.patient.birthdate = null;
                  }, err => {
                    this.patient = null;
                  }
                );
*/

              this.dogList.push({
                id: item.template_id,
                text: item.template_name,
                Сh: false,
                Url: `/contract/preview?patientId=${this.tmpToken!.patientId}&contractId=${item.template_id}`
              });
            });

            this.error = '';
//                        this.showDoglist = true;
          } else { // Если нет договоров то продолжаем
            this.loginOK();
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
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
// console.log('->goSignature -', templateId);
      this.loading = true;
    this.auth.postContract(this.tmpToken!, templateId)
      .subscribe(
        result => {
//                    console.log('result=', result);
          this.loading = false;
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

          this.loading = false;
        }
      );


  }

  public onHoverDog(id: number){ // on-mouseover
//        console.log('HOVER=', id);
      this.dogHoverId = id;
    }

  public onMouseout(id: number){  // on-mouseleave on-mouseout (одинаково работают)
//        console.log('onMouseout=', id);
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
      this.onEvent.emit('LOGINOK');
  }

  logout(){

  }


}
