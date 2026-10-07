import { Component, inject, signal } from '@angular/core';
import { LoadingComponent } from '../../components/frame2/components/loading/loading.component';
import { FileUploadService } from '../../services/file-upload.service';
import { IdocType } from '../../interfaces/document.interface';
import {MatSelectModule} from "@angular/material/select";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BtnComponent } from '../../components/common/btn/btn.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-file-upload',
  imports: [CommonModule, FormsModule, LoadingComponent, MatSelectModule, ReactiveFormsModule, BtnComponent, MatIconModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  loading = signal<boolean>(false);
  docTypeList = signal<IdocType[]>([]);

  // Сигналы для отслеживания состояния в Angular 22
  isOver = signal(false);
  fileInfo = signal<string>('Файл не выбран');

  private fileUploadS = inject(FileUploadService);
  private activeModal = inject(NgbActiveModal);

//  selectCurrentDocType = signal<IdocType | null>(null);
//  selectCurrentDocType: IdocType | null = null;
  selectedFiles?: FileList;
  public frm!: FormGroup;


  constructor() {
    this.getTypeDocList();
    this.initialize();
  }

  /* Инициализация при создании компанента */
  private initialize(): void {
    this.frm = new FormGroup({
      'selectType': new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      'file': new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }


  getTypeDocList(){
        this.fileUploadS.getDocTypeList()
          .subscribe(
            result => {
              this.docTypeList.set(result);
//              console.log('getDocTypeList result=', result);
            },
            err => {
              console.log('getDocTypeList err=', err);
            })
  }

  onSelectedDocType(ev  : any){
    console.log('selectCurrentDocType=', ev);
  }

/*
  selectEventFiles(event: any): void {
    this.selectFiles(event.target.files);
  }
*/

  selectFiles(p_files: FileList): void {
    this.selectedFiles = p_files;
    console.log('!! this.selectedFiles=', this.selectedFiles);
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
//          console.log(e.target.result);
//          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
//    console.log('this.selectedFiles=', this.selectedFiles);
  }

  onAddDoc() {
    this.loading.set(true);
    if (this.selectedFiles && this.selectedFiles[0] && this.frm.controls['selectType'] && this.frm.controls['selectType'].value) {
      const file = this.selectedFiles[0];
      this.fileUploadS.upload(file, this.frm.controls['selectType'].value)
        .subscribe({
          next: (event: any) => {
            this.loading.set(false);
            this.closeModal({success: true, msg: null}); // Закрываем
          },
          error: (err: any) => {
            const msg = 'Не могу открыть файл: ' + file.name;
            console.error('err msg=', msg);
            this.loading.set(false);
            this.closeModal({success: false, msg: 'Ошибка добавления документа.'}); // Закрываем
          }});

    } else {
      this.loading.set(false);
    }
  }


  closeModal(res: any){
    this.activeModal.close(res); // Закрываем
  }


  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isOver.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.handleFiles(files);
    }
  }

  private handleFiles(files: FileList) {
    this.selectFiles(files);
    if (files.length === 1) {
      this.fileInfo.set(`Выбран файл: ${files[0].name}`);
    } else {
      this.fileInfo.set(`Выбрано файлов: ${files.length}`);
    }
  }


}
