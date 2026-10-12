import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { IBlockDoc } from '../../../interfaces/block-doc.interface';
import { UtilsService } from '../../../services/application/utils.service';
import { SemdService } from '../../../services/semd.service';
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
//  @Input() infoUrl: string;  // url перехода
  @Input() semd_id: number = -1;  // СЭМД ID для перехида


  public UtilsS = inject(UtilsService);
  public SemdS = inject(SemdService);


  onClickUrl(semd_id: number){
    if (semd_id > 0){
      this.SemdS.onClickSEMDVisit(semd_id)
    }

  }
}
