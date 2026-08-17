import { Component, inject, signal } from '@angular/core';
import { IDoc, IDocAll, Ilpu } from '../../interfaces/frame2/lpu.interface';
import { ActivatedRoute } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
import { NgbdToastGlobal } from '../../utils/toast/toast-global.component';
import { Subscription } from 'rxjs';
import { LpuService } from '../../services/lpu.service';
import { Ioption } from '../../interfaces/frame2/select.interface';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './components/select/select.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import {MatDialogModule} from "@angular/material/dialog";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-frame2',
  imports: [CommonModule, SelectComponent, LoadingComponent, DoctorsComponent, MatDialogModule, NgbdToastGlobal, NgSelectModule, FormsModule],
  templateUrl: './frame2.component.html',
  styleUrl: './frame2.component.scss',
})
export class Frame2Component {
  public SelectSpecList: Ioption[] = [];
  public SelectedSpec: Ioption | null = null;
  public SelectTypeSrvList = signal<Ioption[]>([]);

  public loadingDate = signal<boolean>(false);
  public loadingDocList = signal<boolean>(false);
  private defSpecid= 874; // По умолчанию специальность

  public doctorList : IDoc[] | null = [];
  public tmp_doctorList : IDoc[] | null = [];

  public name: string = '';

  public SelectedLpu : Ioption | null = null;
  public SelectLpuList = signal<Ioption[]>([]);
  public lpu_list = signal<Ilpu[]>([]);

  public doctorListAll: IDocAll[] = [];
  public doctorListSelect: IDocAll[] = [];

  selectedDoc: IDocAll | null = null;

  private lpuS = inject(LpuService);
  private lpySub!: Subscription;
  /*
    private subscription!: Subscription;
  */

  constructor(
    private activateRoute: ActivatedRoute,
//    public dialog: MatDialog,
    private toast: NgbdToastGlobal,
  ){}

  ngOnInit(): void {
    // Список ЛПУ
    this.lpu_list.update(val => val = []);
    this.lpuS.getLpuList$()
      .subscribe(
        res => {
          if (res && res.length>0){
            this.lpu_list.set(res);

            // Добавляем неизвестного
            this.lpu_list.update(val => [...val, {id: 0, city_id: 0, addres: 'Неизвестен', name: 'Неизвестен', orderby: 0, ispatient: 0}])
          }
        },
        err => {
          console.error('getLpuList$ err=', err);
        }
      );

    this.loadingDate.set(true);

    this.SelectTypeSrvList.set([]);
    this.SelectTypeSrvList.update(val => [...val, {text: "Платные", valueNum:1}])
    this.SelectTypeSrvList.update(val => [...val, {text: "По прикреплению (ОМС)", valueNum:0}])
    this.SelectTypeSrvList.update(val => [...val, {text: "По направлению (форма №057-у)", valueNum:2}])

    this.onSelectedDEFLpu();
// Подписываемся на добавление ЛПУ из талонов
//    console.log('LpuOnAdd$().subscribe');
    this.lpySub = this.lpuS.LpuOnAdd$().subscribe(value=> {
//      console.log('!!! LpuOnAdd$ n=', value);
      if (this.SelectLpuList().filter(item => item.valueNum == value.id).length == 0) {
        // @ts-ignore
        this.SelectLpuList.update(val => [...val, {text: value.name, valueNum: value.id, infoStr: value.addres}])
      }
//      console.log('2 SelectLpuList=', Object.assign({}, this.SelectLpuList));
    })

    this.refreshListSpec();
    this.loadingDate.set(false);
  }

  refreshListSpec(){
    this.SelectedSpec = null;
    this.SelectSpecList = [];
    this.loadingDate.set(true);
    this.lpuS.getSpecList$()
      .subscribe(
        res => {
          res.forEach(item => {
            this.SelectSpecList.push({valueNum: item.keyid, text: item.text})
          })
          // Выбрать Хорургия код 874
          const tmp = this.SelectSpecList.filter((item) => item.valueNum == this.defSpecid)[0];
          if (tmp) {
            this.onSelectedSpec(tmp);
          }
          // Список докторов
          this.doctorListAll = [];
          this.lpuS.getDocAll$()
            .subscribe(
              res => {
                if (res && res.length>0){
                  this.doctorListAll = res;
// console.log('!!! doctorListAll=', this.doctorListAll);
// Фильтруем список врачей от специальности
                  this.SelectSpecList.forEach(itemSpec => {
//                      this.doctorListSelect.push(...this.doctorListAll.filter(itemDoc => itemDoc.specid == itemSpec.valueNum));
                    this.doctorListAll.filter(itemDoc => itemDoc.specid == itemSpec.valueNum).forEach(itemDoc2 => {
                      this.doctorListSelect = [...this.doctorListSelect,
                        {
                          doctorid: itemDoc2.doctorid,
                          l_name: itemDoc2.l_name,
                          f_name: itemDoc2.f_name,
                          s_name: itemDoc2.s_name,
                          specid: itemDoc2.specid,
                          fio: `${itemDoc2.l_name} ${itemDoc2.s_name} ${itemDoc2.f_name}`,
                          specName: itemSpec.text
                        }
                      ];
                    })
                  })
                }
// console.log('!!! doctorListSelect=', this.doctorListSelect);
              },
              err => {
                console.error('getDocAll$ err=', err);
              }
            );

          this.loadingDate.set(false);
          if (res && res.length == 0){
            this.toast.info('Специальностей нет по вашему фильтру.');
          }
        },
        err => {
          console.error('refreshListSpec err=', err);
          this.loadingDate.set(false);
        }
      );
  }

  onSelectedLpu(ev: any) {
    console.log('onSelectedLpu=', ev)
    this.SelectedLpu  = ev;
  }

  onSelectedDEFLpu() {
    this.SelectLpuList.set([])
    this.SelectLpuList.update(val => [...val, {text: 'Все', valueNum: 0}])
    this.onSelectedLpu(this.SelectLpuList()[0]);
  }

  onSelectedSpec(ev: any){
    console.log('onSelectedSpec=', ev)
    this.onSelectedDEFLpu();

    this.SelectedSpec = ev;


    this.tmp_doctorList = null;
    this.doctorList = null;
    this.loadingDocList.set(true);
    if (this.SelectedSpec){

      this.lpuS.getDocList$( this.SelectedSpec!.valueNum)
        .subscribe(
          res => {
            console.log('doc RES=', res);
            this.tmp_doctorList = res;
// 111           this.loadingDate.set(true);

            this.loadingDocList.set(false);
// Проверка на фильт по врачу
            if (this.selectedDoc && this.selectedDoc.doctorid){
              this.tmp_doctorList.forEach(itemDoc => {
                // @ts-ignore
                itemDoc.isFilter = this.selectedDoc.doctorid == itemDoc.doctorid ? 1 : 0;
              });
              // Сортируем
              this.tmp_doctorList = this.tmp_doctorList.sort((a, b) => {
                if (a.isFilter < b.isFilter) {
                  return 1;
                }
                if (a.isFilter > b.isFilter) {
                  return -1;
                }
                return 0
              });
            }

// console.log('!!! this.tmp_doctorList=', this.tmp_doctorList);
            this.doctorList = this.tmp_doctorList;
          },
          err => {
            this.tmp_doctorList = null;
            console.error('refreshListSpec err=', err);
            this.loadingDocList.set(false);
          }
        );

    } else {
      this.loadingDocList.set(false);
    }
  }

  onSelectedDoc(ev: any){
    console.log('onSelectedDoc=', this.selectedDoc)
    if (this.selectedDoc && this.selectedDoc.specid) {
      // выбор специальности
// @ts-ignore
      const tmpSpec = this.SelectSpecList.filter((item) => item.valueNum == this.selectedDoc.specid)[0];
      if (tmpSpec) {
        this.onSelectedSpec(tmpSpec);
      }

    }
  }

  isShowBlocInfo(doc: IDoc, i: number): boolean{
    // this.doctorList
    // Доктор в фильтре
    if (doc.isFilter) {
      return true
    } else {
      return false
    }

  }

  ngOnDestroy(): void {
//    this.lpySub.unsubscribe();
  }

}
