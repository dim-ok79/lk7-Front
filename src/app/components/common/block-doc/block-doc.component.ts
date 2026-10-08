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
  @Input() messageDate: IBlockDoc | null = null;

  public UtilsS = inject(UtilsService);
  public SemdS = inject(SemdService);


  onClickUrl(pUrl: string | undefined){

  }
}
