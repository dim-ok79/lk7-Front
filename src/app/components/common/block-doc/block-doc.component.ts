import { Component, EventEmitter, inject, Input, Output, ViewEncapsulation } from '@angular/core';
import { IBlockDoc } from '../../../interfaces/block-doc.interface';
import { UtilsService } from '../../../services/application/utils.service';
import { MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-block-doc',
  imports: [MatIconModule],
  templateUrl: './block-doc.component.html',
  styleUrl: './block-doc.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class BlockDocComponent {
//  @Input() messageDate: IBlockDoc | null = null;
  @Input() infoName: string = ''; // Название
  @Input() infoDate: Date = new Date();   // Дата
  @Input() infoDocId: number = 0;  // id документа
//  @Input() infoUrl: string;  // url перехода
//  @Input() semd_id: number = -1;  // СЭМД ID для перехида
  @Output() onClickPDF = new EventEmitter<IBlockDoc>(); // выбрана Дата формат YYYY-MM-DD


  public UtilsS = inject(UtilsService);


  onClick(){
    const doc: IBlockDoc = {infoName: this.infoName, infoDate: this.infoDate, infoDocId: this.infoDocId}
    this.onClickPDF.emit(doc)
  }
}
