import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { IContract } from '../../../interfaces/patient.interface';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../../services/application/config.service';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'app-documents',
  imports: [CommonModule, MatIconModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class DocumentsComponent implements OnInit{

  public contracts = signal<IContract[]  | null >( null);
  private fileUploadS = inject(FileUploadService);
  private auth = inject(AuthService);
  private configS = inject(ConfigService);

  constructor(
  )
  {  }

  ngOnInit(): void {
    this.auth.getContractListToPatient()
      .subscribe(
        info => {
          this.contracts.set(info);
        }, err => {
          this.contracts.set(null);
        }
      );

  }

  /* открыть контракт */
  openContract(contractId: number) {
    this.fileUploadS.openDoc(contractId);
  }



}
