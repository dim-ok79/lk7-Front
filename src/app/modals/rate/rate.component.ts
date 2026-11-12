import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BtnComponent } from '../../components/common/btn/btn.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IRateResult } from '../../interfaces/rate.interface';

@Component({
  selector: 'app-rate',
  imports: [MatIconModule, BtnComponent, MatInputModule, FormsModule],
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class RateComponent {
/*
  @Input() keyid: number = 0;
  @Input() doctorid: number = 0;
  @Input() specid: number = 0;
*/

  rateText: string = ''; // Текст
  rateCount: number = 1; // Количество звезд
  activeModal = inject(NgbActiveModal);


  getNameIconRate(n: number): string{
   if (n<=this.rateCount) {
     return 'star';
   } else {
     return 'star_empty';
   }

 }
  rateDoctor(){
    this.closeModal(true,  {count: this.rateCount, text: this.rateText});
  }

  closeModal(success: boolean, res: IRateResult){
    if (success){
      this.activeModal.close(res); // Закрываем
    } else {
      this.activeModal.dismiss(res);
    }
  }

}
