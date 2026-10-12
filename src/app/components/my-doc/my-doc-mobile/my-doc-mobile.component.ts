import { Component, inject, signal } from '@angular/core';
import { MyDocService } from '../../../services/my-doc.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../frame2/components/loading/loading.component';
import { MyDocFindingsComponent } from '../my-doc-findings/my-doc-findings.component';

@Component({
  selector: 'app-my-doc-mobile',
  imports: [CommonModule, LoadingComponent, MyDocFindingsComponent],
  templateUrl: './my-doc-mobile.component.html',
  styleUrl: './my-doc-mobile.component.scss',
})
export class MyDocMobileComponent {

  loading = signal(false);            // Загрузка

  public MyDocS = inject(MyDocService);

}
