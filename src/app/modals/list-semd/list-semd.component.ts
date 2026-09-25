import { Component, inject, Input, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { SemdService } from '../../services/semd.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ISemd } from '../../interfaces/semd.interface';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../../components/common/btn/btn.component';
import { LoadingComponent } from '../../components/frame2/components/loading/loading.component';
import { ConfigService } from '../../services/application/config.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-semd',
  imports: [CommonModule, BtnComponent, LoadingComponent],
  templateUrl: './list-semd.component.html',
  styleUrl: './list-semd.component.scss',
  encapsulation: ViewEncapsulation.None

})

export class ListSemdComponent implements OnInit{
  private semdOld: ISemd = {code: 'def', text: 'Общий документ', dat_str: '', dat_date: new Date(), status:1, semd_id: 0};

  @Input()
  set visitID(value: number) {
    this.visitIDTmp = value;
    this.semdOld.semd_id = value;
    this.loading.set(true);
    this.semdS.getSemdList(this.visitIDTmp)
      .subscribe(
        res => {
          console.log('getSemdList res=', res);
//          this.semdList.update(curr => ({...curr, birthdate : null}));
          this.semdList.set(res);
          this.semdList.update(curr => ([this.semdOld, ...curr]));

          this.loading.set(false);
        },
        err => {
          console.log('getSemdList err=', err);
          this.loading.set(false);
        }
      );

  }

  get visitID(): number {
    return this.visitIDTmp;
  }

  visitIDTmp: number = 0;

  semdList = signal<ISemd[]>([]);
  loading = signal<boolean>(false);

  private semdS = inject(SemdService);
  private activeModal = inject(NgbActiveModal);
  private configS = inject(ConfigService);
  private authS = inject(AuthService);


  constructor(){
  }

  ngOnInit(): void {
  }

  onClickSEMD(p_semd: ISemd) {
    console.log('Open semd=', p_semd);
    this.authS.getTmpTokenID()
      .subscribe(res => {
          if (res && res.id){
            if (p_semd.code == 'def') {
              window.open(`${this.configS.getValue('hostBackend')}/history/events/item/${res.id}/visit/${p_semd.semd_id}.pdf`, '_blank');
            } else {
              window.open(`${this.configS.getValue('hostBackend')}/semd/visit/${res.id}/${p_semd.semd_id}.pdf`, '_blank');
            }
          }
          this.closeModal(null);
        },
        err => {
          console.error('getTmpTokenID ERRROr=', err);
        })
  }

  closeModal(res: any){
      this.activeModal.close(res); // Закрываем
  }


}
