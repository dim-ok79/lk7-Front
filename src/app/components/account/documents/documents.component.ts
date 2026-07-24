import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { IContract } from '../../../interfaces/patient.interface';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../../services/application/config.service';

@Component({
  selector: 'app-documents',
  imports: [CommonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class DocumentsComponent implements OnInit{

  public contracts = signal<IContract[]  | null >( null);

  constructor(
    private auth: AuthService,
    private configS: ConfigService,
  )
  {
  }

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
    const url = `${this.configS.getValue('hostBackend')}/contract/patient/docpdf?patientId=${this.auth.patientId}&contractId=${contractId}`;
    window.open(url, '_blank');
  }



}
