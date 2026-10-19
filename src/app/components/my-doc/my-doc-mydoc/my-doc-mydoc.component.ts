import { Component, inject, Input, signal } from '@angular/core';
import { FileUploadService } from '../../../services/file-upload.service';
import { IDocuments } from '../../../interfaces/document.interface';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../../services/application/utils.service';
import { PanelTablePaginationComponent } from '../../common/panel-table-pagination/panel-table-pagination.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadComponent } from '../../../modals/file-upload/file-upload.component';
import { MatIconModule} from '@angular/material/icon';
import { LoadingComponent } from '../../frame2/components/loading/loading.component';
import { IPeriod } from '../../../interfaces/period.interface';
import { BlockDocComponent } from '../../common/block-doc/block-doc.component';

// Мои документы
@Component({
  selector: 'app-my-doc-mydoc',
  imports: [CommonModule,
    PanelTablePaginationComponent,
    MatIconModule,
    LoadingComponent,
    BlockDocComponent],
  templateUrl: './my-doc-mydoc.component.html',
  styleUrl: './my-doc-mydoc.component.scss',
})
export class MyDocMydocComponent {
  _testHeightBlock = signal<number>(100);
  @Input() isMobile = false;

  @Input()
  set testHeightBlock(value: number) {
    this._testHeightBlock.set(value);
  }

  get testHeightBlock():number {
    return this._testHeightBlock();
  }

  documentList = signal<IDocuments[]>([]);
  documentCountRectoPage = 10;     // Количетсво записей на странице
  documentCountRec = signal(0);            // Всего записей

  private fileUploadS = inject(FileUploadService);
  public  UtilsS = inject(UtilsService);
  private modalService = inject(NgbModal);
  loading = signal<boolean>(false);

  /* Устанока даты  */
  _periodDate: IPeriod = {begin: new Date, end: new Date};
  @Input()
  set v_periodDate(value: IPeriod) {
    this._periodDate = value
//    this.getfindingSize();
    this.getDocumentList(1, this.documentCountRectoPage)
  }

  get v_periodDate(): IPeriod {
    return this._periodDate;
  }

  constructor(){
    this.changedPage(1)

/*
    this.fileUploadS.getDocTypeList()
      .subscribe(
        result => {
          console.log('getDocTypeList result=', result);
        },
        err => {
          console.log('getDocTypeList err=', err);
        })
*/
  }

  getDocumentList(pStart: number, pEnd: number){
    this.loading.set(true);
    this.fileUploadS.getDocList()
      .subscribe(
        result => {
          this.documentList.update(val => val = result);
          this.documentCountRec.set(result.length);
          this.loading.set(false);
        },
        err => {
          this.loading.set(false);
          console.log('getDocList err=', err);
        })
  }

  /* Событие выбора страницы */
  changedPage(page: any) {
    if (page == 1) {
      this.getDocumentList(1, this.documentCountRectoPage);
    } else {
      this.getDocumentList(page*this.documentCountRectoPage-this.documentCountRectoPage , page*this.documentCountRectoPage);
    }
  }

  public addDoc(){
    const modalRef = this.modalService.open(FileUploadComponent);
//    modalRef.componentInstance.visitID = visitID;

    modalRef.result.then(
      (result) => {
        // Действие при закрытии (close)
        console.log(`Закрыто с результатом: ${result}`);
        this.changedPage(1);
      },
      (reason) => {
        // Действие при отмене/закрытии крестиком (dismiss)
        console.log(`Отклонено по причине: ${reason}`);
      }
    );

  }

  openDoc(doc_id: number){
    this.fileUploadS.openDoc(doc_id);
  }

}
