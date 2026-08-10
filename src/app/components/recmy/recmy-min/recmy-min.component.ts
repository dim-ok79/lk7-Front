import { Component, inject, OnInit, signal } from '@angular/core';
import { IRnumbList } from '../../../interfaces/rnumb.interface';
import { RnumbService } from '../../../services/rnumb.service';
import { CommonModule } from '@angular/common';
import {getTekDay, getNameDay, getTime} from "../../../utils/global.function";
import { TalonComponent } from '../../../modals/talon/talon.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recmy-min',
  imports: [CommonModule],
  templateUrl: './recmy-min.component.html',
  styleUrl: './recmy-min.component.scss',
})
export class RecmyMinComponent implements OnInit{
  rnumbList   = signal<IRnumbList[]>([]);
  private modalService = inject(NgbModal);

  constructor(
    private rnumbS: RnumbService,
  ){
  }

  ngOnInit(): void {
    this.getRnumbList();
  }

  /* Получить предстоящие*/
  getRnumbList(){
    this.rnumbList.update(val=> val = []);
    this.rnumbS.getRnumbList()
      .subscribe(
        info => {
          this.rnumbList.update((items) => info);
        }, err => {
        }
      );
  }

  getTekDay(dt: Date): string {
    return getTekDay(dt);
  }

  getNameDay(dt: Date): string {
    return getNameDay(dt);
  }

  getTime(dt: Date): string {
    return getTime(dt);
  }

  openTalon(rnumb: IRnumbList){
    console.log('open rnumb=', rnumb);
    const modalRef = this.modalService.open(TalonComponent);
    modalRef.componentInstance.rnumbID = rnumb.rnumb_id;
    modalRef.componentInstance.typeTalon = 0;

    modalRef.result.then(
      (result) => {
        // Действие при закрытии (close)
        console.log(`Закрыто с результатом: ${result}`);
      },
      (reason) => {
        // Действие при отмене/закрытии крестиком (dismiss)
        console.log(`Отклонено по причине: ${reason}`);
      }
    );
  }

}
